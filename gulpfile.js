'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
//added for CI/CD
require('./gulpfile-deploy-app-package');
require('./gulpfile-serve-info');
require('./gulpfile-update-manifest');
require('./gulpfile-upload-to-sharepoint');
require('./gulpfile-upload-app-package');

build.initialize(gulp);



