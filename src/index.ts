
/* IMPORT */

import {spawn} from 'node:child_process';
import process from 'node:process';
import whenExit from 'when-exit';
import {getPackage, mapParallel, mapSerial, resolveNpmRun, resolvePackage} from './utils';

/* MAIN */

const Scex = {

  /* API */

  runSingle: ( script: string, bypass: boolean = false ): Promise<number> => {

    return new Promise ( resolve => {

      let command = resolveNpmRun ( script );

      if ( bypass ) {

        command = resolvePackage ( script );

        const pkg = getPackage ();

        if ( pkg ) {

          const name = pkg.name || '???';
          const version = pkg.version || '???';

          console.log ( '' );
          console.log ( `> ${name}@${version} ${script}` );
          console.log ( `> ${command}` );
          console.log ( '' );

        }

      }

      const proc = spawn ( command, {
        shell: true,
        stdio: ['ignore', 'inherit', 'inherit']
      });

      whenExit ( () => {
        proc.kill ();
      });

      proc.on ( 'exit', code => {
        code ||= 0;
        if ( code > 0 ) {
          process.exit ( code );
        } else {
          resolve ( code );
        }
      });

    });

  },

  runMultiple: ( scripts: string[], parallel: boolean = false, bypass: boolean = false ): Promise<number[]> => {

    const map = parallel ? mapParallel : mapSerial;
    const run = ( script: string ) => Scex.runSingle ( script, bypass );

    return map ( scripts, run );

  }

};

/* EXPORT */

export default Scex;
