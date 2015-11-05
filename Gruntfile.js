module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            app: 'app'
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',
                sassDir: 'src/stylesheets',
                cssDir: 'public/css',
                raw: 'preferred_syntax = :sass\n' ,

                imagesDir:             "public/images/",
                //,imagesPath:          "assets/images/sprites/",
                generatedImagesDir:    "public/images/sprites/",
                generatedImagesPath:   "public/images/sprites/"
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.app %>/public'
                    ]
                }
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/public/{,*/}*.html',
                    '<%= config.app %>/public/css/{,*/}*.css',
                    '<%= config.app %>/public/images/{,*/}*'
                ]
            },
            compass: {
                files: ['**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
        },
        compass: {
            dev: {
                options: {
                    sassDir: ['app/src/stylesheets'],
                    cssDir: ['app/public/css'],
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: ['app/src/stylesheets'],
                    cssDir: ['app/public/css'],
                    environment: 'production'
                }
            },
        },
        unretina: {
            resize: {
                files: [
                    { src: '**/*.png', dest: 'app/public/images/@1x/', expand: true, cwd: 'app/public/images/@2x' }
                ]
            }
        }
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-unretina');

    // Default task(s).
    grunt.registerTask('default', ['connect:livereload', 'compass:dev', 'watch']);
    // prod build
    grunt.registerTask('prod', ['compass:prod']);
    // unretina
    grunt.registerTask('resize', ['unretina:resize']);

};
