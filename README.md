# Express PouchDB SSJS Injection (Authenticated Remote Code Execution)

PouchDB is vulnerable to server-side code injection using
express-pouchdb with access to `_test_view`. As this should only be an
authenticated user, it is only available as RCE to those that have the
proper authorization to use `_test_view` in your environment. The
default `express-pouchdb` configuration does not enforce any of this.

### Vulnerable Code Path

PouchDB <6.0.5 uses `scope-eval` to `eval()` expressions in PouchDB views.
Obviously, this is bad news. As they scope the `eval()`, things like
`require` and `module` are not accessible to the function, but Node.js
primitives from `process` are. Because of this, we can use `spawn_sync`
or `process` to create arbitrary processes as the user running the
Express JS server.

It is also possible to use `this.process` within the `eval()` scope to
run any third-party module included from `this.process.mainModule`.

The offending function is in pouchdb/lib/index.js:6201, `evalfunc`.


### How to use this PoC

0. Run `npm install --save` to download Node dependencies. Versions are
   locked to the versions used when creating this PoC at first.
1. Run `app.js`. This starts the Express server.
2. In a different terminal window, run `nc -l 8080 -vvv` or similar.
3. In a different terminal window, run `python exploit.py`. A shell will
   appear in the netcat window.


### Responsible disclosure timeline

29 July 2016: Bug report submitted to pouchdb maintainers.
16 September 2016: Fixed in the wild.


### License

GNU GPL v3.
