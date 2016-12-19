/*

The app is set up this way so all of the files that have actual content will be transpiled, and I can use newer module syntax.

https://webpack.github.io/docs/code-splitting.html
“Webpack 1.x.x (coming in 2.0.0!) does not natively support or understand ES6 modules. However, you can get around that by using a transpiler, like Babel, to turn the ES6 import syntax into CommonJs or AMD modules.”

 */
require('./main.es6')
