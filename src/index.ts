
/* IMPORT */

import {spawn} from 'node:child_process';
import whenExit from 'when-exit';
import {mapParallel, mapSerial} from './utils';

/* MAIN */

const Scex = {

  /* API */

  runSingle: ( script: string ): Promise<number> => {

    return new Promise ( resolve => {

      const proc = spawn ( `npm run "${script}"`, {
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

  runMultiple: ( scripts: string[], parallel: boolean = false ): Promise<number[]> => {

    const map = parallel ? mapParallel : mapSerial;

    return map ( scripts, Scex.runSingle );

  }

};

/* EXPORT */

export default Scex;
