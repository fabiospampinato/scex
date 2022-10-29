#!/usr/bin/env node

/* IMPORT */

import {program, updater} from 'specialist';
import RunRun from '.';

/* HELPERS */

const name = 'runrun';
const version = '1.0.0';
const description = 'A simple runner for npm scripts that can execute multiple scripts, in serial or in parallel.';

/* MAIN */

updater ({ name, version });

program
  .name ( name )
  .version ( version )
  .description ( description )
  .option ( '-p, --parallel', 'Execute scripts in serial' )
  .option ( '-s, --serial', 'Execute scripts in parallel (default)' )
  .arguments ( '<scripts...>' )
  .action ( async ( scripts, options ) => {
    if ( options.serial === true && options.parallel === true ) throw new Error ( '"serial" and "parallel" can not be both "true"' );
    if ( options.serial === false && options.parallel === false ) throw new Error ( '"serial" and "parallel" can not be both "false"' );
    await RunRun.runMultiple ( scripts, !!options.parallel );
    process.exit ( 0 );
  });

program.parse ();
