
/* MAIN */

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

/* EXPORT */

export {mapParallel, mapSerial};
