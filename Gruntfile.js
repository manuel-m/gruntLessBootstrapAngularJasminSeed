/*

 dist
 ├── app.js
 ├── app.css
 ├── vendors.css
 └── vendors.js

 */

module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    var src_html = 'src/**/*.html',

        src_js = 'src/**/*.js',
        test_src_js = 'src/**/*.test.js',


        angular_mock_js = 'node_modules/angular-mocks/angular-mocks.js',
        vendors_mock_js = angular_mock_js,
        vendors_js = [
            'node_modules/lodash/lodash.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap-less/js/bootstrap.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
        ],
        app_js = [src_js, '!' + test_src_js], // [!] exclude *.test.js
        vendors_dist_js = 'dist/vendors.js',
        app_dist_js = 'dist/app.js',

    // [!] better testing against concatenated code (closer from production)
        test_js = [vendors_dist_js, vendors_mock_js, app_dist_js, test_src_js],

        lint_js = ['Gruntfile.js', src_js, test_src_js],

        bootstrap_less_path = 'custom/bootstrap-less',
        vendors_less = 'less/vendors.less',
        vendors_less_config = {},
        vendors_dist_css = 'dist/vendors.css',

        app_less = 'less/app.less',
        app_dist_css = 'dist/app.css',

        app_less_config = {};

    app_less_config[app_dist_css] = app_less;
    vendors_less_config[vendors_dist_css] = vendors_less;

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            html: {
                files: [
                    // includes files within path
                    {
                        cwd: 'src/',           // set working folder / root to copy
                        src: '**/*.html',      // copy all files and subfolders **with ending .html**
                        dest: 'dist/',         // destination folder
                        expand: true,          // required when using cwd
                        flatten: false
                    }
                ]
            }
        },
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: test_js
                }
            }
        },
        jshint: {
            files: lint_js,
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        less: {
            app: {
                options: {},
                files: app_less_config
            },
            vendors: {
                options: {
                    paths: [bootstrap_less_path]
                },
                files: vendors_less_config
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            app: {
                src: app_js,
                dest: app_dist_js
            },
            vendors: {
                src: vendors_js,
                dest: vendors_dist_js
            }
        },
        watch: {
            htmls: {
                files: src_html,
                tasks: ['copy:html']
            },
            scripts: {
                files: src_js,
                tasks: ['scripts:dev']
            },
            styles: {
                files: [app_less, 'custom/bootstrap-less/**/*.less'], // which files to watch
                tasks: ['newer:less:app', 'less:vendors'],
                options: {
                    nospawn: true
                }
            }
        },
        clean: ['.tmp', 'dist', 'npm-debug.log'], // grunt clean
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/**/*.css',
                        'dist/**/*.js',
                        'dist/**/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: 'dist',
                    open: false // [!] prevent from browser new instance opening
                }
            }
        }
    });

    // default
    // [!] watch is blocking, so last one
    grunt.registerTask('default', ['dev', 'browserSync', 'watch']);

    // dev
    grunt.registerTask('scripts:dev', [
        'newer:jshint',
        'concat:vendors',
        'concat:app']);
    grunt.registerTask('styles:dev', ['less:vendors', 'newer:less:app']);

    // dist
    grunt.registerTask('scripts:dist', [
        'jshint',
        'concat:vendors', 'concat:app'
    ]);

    grunt.registerTask('styles:dist', ['less']);


    grunt.registerTask('dev', ['copy:html', 'scripts:dev', 'styles:dev']);
    grunt.registerTask('dist', ['clean', 'copy:html', 'scripts:dist', 'styles:dist']);

    // test
    grunt.registerTask('test', ['dist', 'karma']);


};
