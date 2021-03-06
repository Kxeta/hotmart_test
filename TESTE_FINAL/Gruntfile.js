module.exports = function(grunt) {



  // ===========================================================================

  // CONFIGURE GRUNT ===========================================================

  // ===========================================================================

  grunt.initConfig({



    // get the configuration info from package.json ----------------------------

    // this way we can use things like name and version (pkg.name)

    pkg: grunt.file.readJSON('package.json'),



    // configure jshint to validate js files -----------------------------------

    jshint: {

      options: {

        reporter: require('jshint-stylish')

      },

      all: ['Grunfile.js', 'scripts/*.js']

    },



    // configure uglify to minify js files -------------------------------------

    uglify: {

      options: {

      },

      build: {

        files: [{                         

          expand: true,

          cwd: 'scripts',

          src: ['*.js'],

          dest: 'dist/scripts',

          ext: '.min.js'

        }]

      }

    },



    // compile less stylesheets to css -----------------------------------------

    sass: {                              // Task

      dist: {                            // Target

        options: {                       // Target options

          style: 'expanded'

        },

        files: [{                         // Dictionary of files

          expand: true,

          cwd: 'styles',

          src: ['*.scss','!variaveis.scss'],

          dest: 'dist/styles',

          ext: '.css'

        }]

      }

    },



    // configure autoprefixer ------------------------------------

    autoprefixer: {

      options: {

      },

      multiple_files: {

        expand: true,

        flatten: true,

        src: 'dist/styles/*.css',

        dest: 'dist/styles/'

      }

    },



    // configure cssmin to minify css files ------------------------------------

    cssmin: {

      options: {        

      },

      build: {

        files: [{

          expand: true,

          cwd: 'dist/styles',

          src: ['*.css'],

          dest: 'dist/styles',

          ext: '.min.css'

        }]

      }

    },


    // Copy js to dist ---------------------------

    copy: {
      main: {
        expand: true,
        src: 'scripts/*.js',
        dest: 'dist/',
      },
    },



    // Deletes all files generated by grunt ---------------------------

    clean: {

      css: ["dist/styles/*.css"],

      sasscache: [".sass-cache"],

      scripts: ["dist/scripts/*.js"]

    },

    // configure wiredep ------------------------------------------
    wiredep: {
      task: {
        src: ['index.html']
      }
    },

    // configure watch to auto update ------------------------------------------

    watch: {

      stylesheets: {

        files: ['dist/style/*.css', 'styles/**/*.scss', 'styles/*.scss'],

        tasks: ['sass', 'autoprefixer'],

        options: {

        },

      },

      scripts: {

        files: ['scripts/*.js'],

        tasks: ['jshint','copy'],

        options: {

        },

      },

      scripts_third: {

        files: ['scripts/**/*.js'],

        tasks: ['uglify'],

        options: {

        },

      }

    }


  });



  // ===========================================================================

  // LOAD GRUNT PLUGINS ========================================================

  // ===========================================================================

  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-wiredep');
  
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-contrib-uglify');





  // ===========================================================================

  // CREATE TASKS ==============================================================

  // ===========================================================================

  grunt.registerTask('default', ['clean', 'wiredep', 'sass', 'autoprefixer', 'jshint', 'copy']);
  grunt.registerTask('dev', ['clean', 'wiredep', 'sass', 'autoprefixer', 'jshint', 'copy', 'watch']);
  grunt.registerTask('deploy', ['clean', 'sass', 'autoprefixer', 'cssmin', 'jshint', 'uglify']);



};