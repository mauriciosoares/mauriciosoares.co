module.exports = function(grunt) {
  'use strict';

  var tasks = [
    'grunt-contrib-jshint',
    'grunt-contrib-uglify',
    'grunt-contrib-concat',
    'grunt-contrib-watch',
    'grunt-contrib-connect',
    'grunt-contrib-copy'
  ];

  var config = {};

  // =============================================
  // watch
  config.watch = {};
  config.watch.scripts = {
    files: [
      'dev/assets/js/**/*.js',
      '!dev/assets/js/main.js'
    ],
    tasks: ['jshint', 'concat']
  };

  // =============================================
  // jshint
  config.jshint = {};
  config.jshint.options = {
    debug: true
  };
  config.jshint.all = ['dev/assets/js/**/*.js'];

  // =============================================
  // uglify
  config.uglify = {
    dist: {
      files: {
        'dist/assets/js/all.min.js': ['dev/assets/js/libs/*.js', 'dev/assets/js/main.js']
      }
    }
  };

  // =============================================
  // concat
  config.concat = {
    dist: {
      src: [
        'dev/assets/js/**/*.js',
        '!dev/assets/js/main.js'
      ],
      dest: 'dev/assets/js/main.js'
    }
  };

  // =========================
  // connect
  config.connect = {};
  config.connect.server = {
    options: {
      port: 8000,
      hostname: '*'
    }
  };

  // =========================
  // config
  grunt.initConfig(config);

  tasks.forEach(grunt.loadNpmTasks);

  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('dist', ['uglify']);
};
