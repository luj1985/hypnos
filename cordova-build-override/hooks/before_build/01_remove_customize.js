#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var rootdir = process.argv[2];

// the build folder name will change when disabled 'custom-build'
var target = path.join(rootdir, 'platforms', 'android', 'ant-build');
var source = path.join(rootdir, 'platforms', 'android', 'bin');

if (!fs.existsSync(target)) {
  fs.symlinkSync(source, target);
  console.log(target + ' has been created');
}
