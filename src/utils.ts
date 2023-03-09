
/* IMPORT */

import findUp from 'find-up-json';

/* MAIN */

const getPackage = (() => {

  let cached: ({ name?: string, version?: string, scripts?: Partial<Record<string, string>> });

  return (): ({ name?: string, version?: string, scripts?: Partial<Record<string, string>> }) => {

    return cached ||= findUp ( 'package.json' )?.content || {};

  };

})();

const mapParallel = <T, R> ( values: T[], iterator: ( value: T, index: number, values: T[] ) => R ): Promise<Awaited<R>[]> => {

  return Promise.all ( values.map ( ( value, index ) => {

    return iterator ( value, index, values );

  }));

};

const mapSerial = async <T, R> ( values: T[], iterator: ( value: T, index: number, values: T[] ) => R ): Promise<Awaited<R>[]> => {

  const results: Awaited<R>[] = [];

  for ( let i = 0, l = values.length; i < l; i++ ) {

    const value = values[i];
    const result = await iterator ( value, i, values );

    results.push ( result );

  }

  return results;

};

const resolveNpmRun = ( script: string ): string => {

  return `npm run "${script}"`;

};

const resolvePackage = ( script: string ): string => {

  const pkg = getPackage ();

  return pkg.scripts?.[script] || resolveNpmRun ( script );

};

/* EXPORT */

export {getPackage, mapParallel, mapSerial, resolveNpmRun, resolvePackage};
