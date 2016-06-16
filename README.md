# Template project: Grunt, less, Angular, Bootstrap, Jasmine

* Tests are performed against dist assets.  
* Application and vendors assets are splitted
* No minification

### Results
```
dist
├── index.html
├── app.xyz.js
├── app.xyz.css
├── vendors.xyz.css
└── vendors.xyz.js
```

### Packages

* NPM (no bower)
* Jquery, lodash
* Angular JS, Angular UI Bootstrap
* Grunt: grunt-contrib-concat, grunt-contrib-copy, grunt-contrib-watch, jit-grunt, time-grunt,  grunt-newer,grunt-contrib-jshint, grunt-contrib-clean
* Less, grunt grunt-contrib-less
* BrowserSync: grunt-browser-sync, grunt-cache-bust
* Tests (Karma, Jasmine) : karma, karma-jasmine, karma-phantomjs-launcher, grunt-karma, angular-mocks

### Setup

**Quick setup**
npm install && grunt

**Tested with Node v4 LTS**
```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm i -g grunt-cli // [!] else node node_modules/.bin/grunt
sudo npm i http-server -g
```

**Reset packages**
```
npm init
npm i grunt --save-dev

// no more need grunt.loadNpmTasks => require('jit-grunt')(grunt);
npm i jit-grunt --save-dev

// time line => require('time-grunt')(grunt);
npm i time-grunt --save-dev

// copy
npm i grunt-contrib-copy --save-dev

// watch
npm i grunt-contrib-watch --save-dev

// only build files that have changed with grunt-newer
npm i grunt-newer --save-dev

npm i grunt-contrib-concat --save-dev
npm i grunt-contrib-jshint --save-dev

// less
npm i grunt grunt-contrib-less --save-dev

// clean
npm i grunt-contrib-clean --save-dev

// cash bust (rename html with md5 assets)
npm i grunt-cache-bust --save-dev

// browser sync
npm i grunt-browser-sync --save-dev

// lodash
npm i --save lodash --save

// angular
npm i jquery angular bootstrap-less --save

// angular ui
npm i angular-ui-bootstrap --save-dev



// tests
npm i karma --save-dev  
npm i karma-jasmine --save-dev  
npm i karma-phantomjs-launcher --save-dev
npm i grunt-karma --save-dev

// angular mocks
npm i angular-mocks --save-dev


// debug verbose mode
grunt -v

```

**Resources**
```
http://putaindecode.io/fr/articles/js/grunt/
https://jonsuh.com/blog/take-grunt-to-the-next-level/
http://ericnish.io/blog/compile-less-files-with-grunt/
http://andyshora.com/unit-testing-best-practices-angularjs.html
```
