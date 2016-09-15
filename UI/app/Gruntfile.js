module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt 
  grunt.initConfig({
    connect: {
      all: {
        options:{
          port: 8080,
          hostname: "0.0.0.0",
          keepalive: true,

          middleware: function(connect, options) {

            return [
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              connect.static(options.base)
            ];
          }

        }
      }
    },

    open: {
      all: {
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },

    regarde: {
      all: {
        files:['index.html'],
        tasks: ['livereload']
      }
    }

  });

  // Creates the `server` task
  grunt.registerTask('server',[
    'open',
    'livereload-start',
    'connect',
    'regarde'
  ]);
};