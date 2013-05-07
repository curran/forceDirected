module.exports = function(grunt) {

  // Project configuration.
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
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task(s).
  grunt.registerTask('default', ['coffee']);

};
