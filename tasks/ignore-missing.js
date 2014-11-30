/*
 * grunt-browserify-ignore-missing
 * https://github.com/open-node/grunt-browserify-ignore-missing
 *
 * Copyright (c) 2014 Redstone Zhao, contributors
 * Licensed under the MIT license.
 * https://github.com/open-node/grunt-browserify-ignore-missing/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var ignoreMissingFn = function(){var emptyFnStr="function (require,module,exports){\n\n}";var emptyFnStrMin="function (){}";var emptyFns=[];var fnStr="";for(var i in t){fnStr=t[i][0].toString();if(fnStr===emptyFnStr||fnStr===emptyFnStrMin)emptyFns.push(i)}for(var j in t){for(var k in t[j][1]){if(emptyFns.indexOf(t[j][1][k].toString())!==-1)delete t[j][1][k]}}};

  grunt.registerMultiTask('ignoreMissing', 'browserify-ignore-missing.', function() {

    var options = this.options({
      processContent: false,
      processContentExclude: []
    });

    var copyOptions = {
      process: options.processContent,
      noProcess: options.processContentExclude
    };

    grunt.verbose.writeflags(options, 'Options');

    var dest;
    var isExpandedPair;
    var tally = {
      dirs: 0,
      files: 0
    };

    this.files.forEach(function(filePair) {
      isExpandedPair = filePair.orig.expand || false;

      filePair.src.forEach(function(src) {
        // ignore-missing
        var output = "";
        var content = grunt.file.read(src);
        output = content.substring(0, 27);
        output += "(" + ignoreMissingFn.toString() + ")();";
        output += content.substring(27);
        grunt.file.write(filePair.dest, output);
      });
    });

    grunt.log.write('Insert special function for ignore missing');

    grunt.log.writeln();
  });

};
