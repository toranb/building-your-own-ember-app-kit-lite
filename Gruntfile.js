module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-template-compiler');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-testem');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-hashres');

  grunt.initConfig({
    uglify: {
        dist: {
            src: 'js/dist/deps.min.js',
            dest: 'js/dist/deps.min.js',
        },
    },
    hashres: {
      options: {
        renameFiles: true
      },
      prod: {
        src: ['js/dist/deps.min.js'],
        dest: 'index.html'
      }
    },
    testem: {
      basic: {
        src: [
          "js/dist/deps.min.js"
        ],
        options: {
          parallel: 2,
          framework: "qunit",
          launch_in_dev: ["PhantomJS"],
          launch_in_ci: ["PhantomJS"]
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      sources: {
        files: ['js/templates/**/*.handlebars', 'js/app/**/*.js'],
        tasks: ['dev']
      }
    },
    jshint: {
      all: ['js/app/**/*.js'],
      options : {
        esnext : true
      }
    },
    transpile: {
      tests: {
        type: 'amd',
        moduleName: function(path) {
          return 'example/tests/' + path;
        },
        files: [{
          expand: true,
          cwd: 'js/tests/',
          src: '**/*.js',
          dest: 'js/dist/transpiled/tests/'
        }]
      },
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
      },
      test: {
          src: [
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/handlebars/handlebars.js',
            'js/vendor/ember/ember.js',
            'js/lib/loader.js',
            'js/lib/ember-resolver.js',
            'js/dist/transpiled/app/**/*.js',
            'js/dist/tmpl.min.js',
            'js/dist/transpiled/tests/**/*.js',
            'js/lib/test-loader.js'],
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

  grunt.task.registerTask('dev', ['jshint', 'emberhandlebars', 'transpile:app', 'concat:dist']);
  grunt.task.registerTask('local', ['dev', 'watch']);
  grunt.task.registerTask('test', ['jshint', 'emberhandlebars', 'transpile:app', 'transpile:tests', 'concat:test', 'testem:ci:basic']);
  grunt.task.registerTask('deploy', ['dev', 'uglify:dist', 'hashres']);
};
