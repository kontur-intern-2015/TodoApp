/**
 * Created by course on 03.05.2015.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
                sourceMap: true
            },
            debug: {
                src: ['app/**/*.js'],
                dest: 'dist/bundle.js'
            },
            release: {

            }
        }
    });

    // задача по умолчанию
    grunt.registerTask('default', ['concat:debug']);

};