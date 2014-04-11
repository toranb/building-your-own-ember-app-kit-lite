module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-template-compiler');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');

  grunt.initConfig({
    transpile: {
      app: {
        type: 'amd',
        moduleName: function(path) {
          return 'example/' + path;
        },
        files: [{
          expand: true,
          cwd: 'js/app/',
          src: '**/*.js',
          dest: 'js/dist/transpiled/app/'
        }]
      }
    },
    concat: {
      dist: {
          src: [
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/handlebars/handlebars.js',
            'js/vendor/ember/ember.min.js',
            'js/lib/loader.js',
            'js/lib/ember-resolver.js',
            'js/dist/transpiled/app/**/*.js',
            'js/dist/tmpl.min.js'],
          dest: 'js/dist/deps.min.js'
      }
    },
    emberhandlebars: {
        compile: {
            options: {
                templateName: function(sourceFile) {
                    var newSource = sourceFile.replace('js/templates/', '');
                    return newSource.replace('.handlebars', '');
                }
            },
            files: ['js/templates/**/*.handlebars'],
            dest: 'js/dist/tmpl.min.js'
        }
    }
  });

  grunt.task.registerTask('local', ['emberhandlebars', 'transpile:app', 'concat:dist']);
}
