module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      myFiles: ["timer.js"]
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
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-lint5");

  grunt.registerTask("test", ["jshint", "csslint", "lint5"]);
};
