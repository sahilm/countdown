module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      myFiles: ["timer.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2,
          "box-sizing": false,
          "universal-selector": false,
          "font-sizes": false
        },
        src: ['style.css']
      }
    },
    connect: {
      server: {
        options: {
          port: 8888,
          base: './',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask("default", ["jshint", "csslint"]);
};
