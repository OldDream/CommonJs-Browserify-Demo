# CommonJs-Browserify-Demo

Base on gulp 4.0.2,  most of the counterpart is based on 3.X, so I upload this project.

```
npm i // install 
gulp browserify  // manual compile 
gulp auto // monitor and auto compile
gulp webserver // launch webserver at http://localhost:9000/
```

bundle CommonJs modules to a single .js file with uglify and sourceMap in order to use it in browser.

launch live server, open demo/index.html to see the demo.

check gulpfils.js for details.

Didn't add babel-polyfill, so you need to be cairful when using special ES6 ES7 APIs 

