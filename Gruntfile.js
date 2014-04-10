module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    concat: {
      dist: {
          src: [
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/handlebars/handlebars.js',
            'js/vendor/ember/ember.min.js',
            'js/app.js'],
          dest: 'js/dist/deps.min.js'
      }
    }
  });

  grunt.task.registerTask('local', ['concat:dist']);
}
