module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    nodemon: {
      dev: {
        script: 'server/src/server.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/test/**/*.js']
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  
  ///////////////////////
  //    Grunt tasks    //
  ///////////////////////

  grunt.registerTask('watch', function (target) {
    grunt.task.run(['nodemon']);
  });

  grunt.registerTask('test', function(target) {
    grunt.task.run(['mochaTest']);
  });

};