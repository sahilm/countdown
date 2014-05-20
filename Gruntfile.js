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
          "universal-selector": false
        },
        src: ['style.css']
      }
    },
    lint5: {
      dirPath: ".",
      templates: ["index.html"]
    },
    "http-server": {
      "dev": {
        port: 8888,
        cache: 0
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-lint5");
  grunt.loadNpmTasks('grunt-http-server');

  grunt.registerTask("test", ["jshint", "csslint", "lint5"]);
};
