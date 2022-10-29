# RunRun

A simple runner for npm scripts that can execute multiple scripts, in serial or in parallel.

## Install

```sh
npm install -g runrun
```

## Usage

Execute multiple npm scripts in serial:

```
runrun foo bar baz
```

Execute multiple npm scripts in parallel:

```
runrun -p foo bar baz
```

## License

MIT © Fabio Spampinato
