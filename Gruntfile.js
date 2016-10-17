module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  
  ///////////////////////
  //    Grunt tasks    //
  ///////////////////////

  grunt.registerTask('watch', function (target) {
    grunt.task.run([ 'nodemon' ]);
  });

};