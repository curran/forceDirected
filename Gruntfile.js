module.exports = function(grunt) {

  grunt.initConfig({
    coffee: {
      compileWithMaps:{
        options: {
          sourceMap: true
        },
        files: {
          'js/forceDirected.js': 'src/forceDirected.coffee'
        }
      }
    },
    bower: {
      target: {
        rjsConfig: 'config.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-bower-requirejs');

  grunt.registerTask('default', ['coffee', 'bower']);

};
