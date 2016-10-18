module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    nodemon: {
      dev: {
        script: 'server/src/server.js'
      }
    },

    express: {
      options: {
        port: 1337
      },
      dev: {
        options: {
          script: 'server/src/server.js'
        }
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

    clean: {
      build: {
        src: ['server/public/src/*']
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['client/src/**/*.js'],
        dest: 'server/src/public/app.js'
      },
      less: {
        src: ['client/src/**/*.less'],
        dest: 'server/src/public/styles.less'
      }
    },

    copy: {
      index: {
        files: [{
          src: [ 'client/src/index.html' ],
          dest: 'server/src/public/index.html'
        }]
      },
      vendor: {
        files: [{
          src: [ 'bower_components/angular/angular.min.js' ],
          dest: 'server/src/public/vendor/angular.min.js'
        },{
          src: [ 'bower_components/angular-ui-router/release/angular-ui-router.min.js' ],
          dest: 'server/src/public/vendor/angular-ui-router.min.js'
        }]
      }
    },

    delta: {
      jssrc: {
        files: [
          'client/src/**/*.js'
        ],
        tasks: ['concat:js']
      },

      html: {
        files: ['client/src/index.html'],
        tasks: ['copy:index']
      }
    }
  });
  
  ///////////////////////
  //    Grunt tasks    //
  ///////////////////////
  
  grunt.registerTask('build', ['clean',
                               'concat:js',
                               'concat:less',
                               'copy:index',
                               'copy:vendor']);

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch:client', ['build', 'express:dev', 'delta']);

  grunt.registerTask('watch:server', ['nodemon']);

  grunt.registerTask('test', function(target) {
    grunt.task.run(['mochaTest']);
  });

};