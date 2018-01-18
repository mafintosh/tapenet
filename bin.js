#!/usr/bin/env node

var path = require('path')
var pkg = require('tape/package.json')

require(path.join(require.resolve('tape/package.json'), '..', pkg.bin.tape))
