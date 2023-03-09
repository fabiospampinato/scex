#!/usr/bin/env node

/* IMPORT */

import {bin} from 'specialist';
import Scex from '.';

/* MAIN */

bin ( 'scex', 'A simple runner for npm scripts that can execute multiple scripts, in serial or in parallel' )
  /* DEFAULT COMMAND */
  .option ( '-b, --bypass', 'Bypass "npm run" and execute each script directly' )
  .option ( '-p, --parallel', 'Execute scripts in parallel' )
  .option ( '-s, --serial', 'Execute scripts in serial' )
  .argument ( '<scripts...>', 'Script names to execute' )
  .action ( ( options, scripts ) => {
    const {bypass, serial, parallel} = options;
    if ( serial && parallel ) throw new Error ( '"serial" and "parallel" can not be both "true"' );
    if ( !serial && !parallel ) throw new Error ( 'Either "serial" or "parallel" must be "true"' );
    return Scex.runMultiple ( scripts, !serial, !!bypass );
  })
  /* RUN */
  .run ();
