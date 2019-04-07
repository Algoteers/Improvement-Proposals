# SIP 002 - Use Native ES6 Modules Without Bundling

Superalgos source code is written as ES6 modules, which is the modern, interoperable standard. Webpack and Babel are currently used to transpile that ES6 code into CommonJS (i.e. nodejs) and ES5 code. This process has a number of pros and cons, but I believe the pros win out.

Recommend to remove all webpack and babel build steps and publish code as ES6 modules. For nodejs processes, there are three possible ways to run these:

### Alternatives

##### ESM

[esm](https://github.com/standard-things/esm) makes ES6 modules available in NodeJS. To quote their README:


> There are two ways to enable `esm`.
> 
> 1. Enable `esm` for packages:
> 
>    Use `esm` to load the main ES module and export it as CommonJS.
> 
>     __index.js__
>     ```js
>     // Set options as a parameter, environment variable, or rc file.
>     require = require("esm")(module/*, options*/)
>     module.exports = require("./main.js")
>     ```
>     __main.js__
>     ```js
>     // ESM syntax is supported.
>     export {}
>     ```
>     :bulb: These files are automagically created with `npm init esm` or `yarn create esm`.
> 
> 2. Enable `esm` for local runs:
> 
>     ```shell
>     node -r esm main.js
>     ```
>     :bulb: Omit the filename to enable `esm` in the REPL.

I would recommend we publish packages using method 1. Instead of webpack and babel configurations, plus distribution code, we will simply add a single, small CommonJS module to `require('esm')` and then import/export the ES6 modules.

Note that using method 2, it is possible to import a CommonJS module from an ES6 module without any transpilation. Simply `import * as default from 'commonjs-module'`.

##### NodeJS Experimental Flag

NodeJS is working on [ES6 module support](https://nodejs.org/api/esm.html), but it is currently behind a flag.

`node --experimental-modules my-app.mjs`

I don't recommend using this, since it is experimental and also not quite standard, enforcing this `.mjs` extension.

### Factors

##### Page Load

Larger bundles can harm page load times, since every bit of code must be downloaded up front. Superalgos is definitely affected by this, since it's master-app-client bundle weighs in at a whopping 52.4 MiB:

```
/@isysd/src/js/modules/@superalgos/MasterApp/client$ npm run dev

> master-app-client@0.1.3 dev /@isysd/src/js/modules/@superalgos/MasterApp/client
> NODE_ENV=development webpack-dev-server --hot --port 3100 --config ./webpack.config.js

ℹ ｢wds｣: Project is running at http://localhost:3100/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: 404s will fallback to /index.html
ℹ ｢wdm｣: Hash: a45ae1e4b05707478381
Version: webpack 4.27.1
Time: 26645ms
Built at: 04/07/2019 8:12:53 AM
                               Asset      Size  Chunks             Chunk Names
199f6d49afb40768a650abb24481aa41.png  7.32 KiB          [emitted]  
27c3b6c5df59ab15abdb1e843f83079a.png    27 KiB          [emitted]  
3682f4a224b0e4422db7e2b84953af18.png  10.9 KiB          [emitted]  
91c942ef87eacef4bcce7624c284576a.png  4.66 KiB          [emitted]  
d39e02f11608da7833cbc4a8708def8d.jpg  65.9 KiB          [emitted]  
ed06224521d7224d4b85a470da517ce6.svg  5.23 KiB          [emitted]  
f6491bdae4a5aaad0a31c26e2e74295a.png  3.43 KiB          [emitted]  
                          index.html  2.29 KiB          [emitted]  
                           script.js  52.4 MiB    main  [emitted]  main

```

By loading only a single `index.js` module, which then imports other modules as needed, the initial script load will be decreased 100x, and possibly overall data usage will go down, if not all 52.4 MiB of bundled libs actually get imported. It is true that minifying the code reduces the overall size, but many of the libraries we would import already have minified builds, and there are debugging and readability tradeoffs.

##### Debugging

Source code is much easier to debug when it is in un-minified, un-bundled form. I don't think I need to elaborate, since every JS developer has seen an error like `Error in bundle.js on line 1, char 32409812341`. It is far nicer to see `Error in specific-lib.js on line 234, char 23`. Sure, source maps and similar techniques could reconstruct the source reference for you, but that just yet more work and complexity...

##### Licenses

When software is bundled and distributed together, all of the licenses must be included, and reconciled. This means, for example, that including a single GPLv3 library requires the final product to have a GPLv3 or compatible (i.e. LGPL) license. While I'm not a lawyer, I believe importing a GPLv3 licensed module at run time does not impose the same restrictions on the final product license.

##### Code Complexity

It is simply easier to write code to one recognized standard rather than implementing a complex build system to support older and less standardized modules. Webpack and babel are some of the most complex tools in the JS developer arsenal, and are easy to mis-configure. They also add dozens of dev dependencies. Since ES6 modules became a standard, all groups, including the CommonJS group, have started to move toward that standard. Unless there's a specific legacy case to cover, we might as well build forward cleanly.
