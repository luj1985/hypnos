#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var rootdir = process.argv[2];

// crosswalk doesn't work after apply 'custom_rules'
var target = path.join(rootdir, 'platforms', 'android', 'custom_rules.xml');

if (fs.existsSync(target)) {
  fs.unlinkSync(target);
  console.log(target + ' has been removed');
}