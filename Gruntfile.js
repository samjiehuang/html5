module.exports = function(grunt) {
    require('time-grunt')(grunt); //Grunt处理任务进度条提示

    grunt.initConfig({
        //默认文件目录在这里
        paths: {
            assets: './assets', //输出的最终文件assets里面
            lcss: './css', //推荐使用Sass
            css: './css', //若简单项目，可直接使用原生CSS，同样可以grunt watch:base进行监控
            js: './js', //js文件相关目录
            img: './images'//图片相关
        },
        fileHandle:{
            css:'index',
            js:'index',
            html:'index'
        },
        buildType: 'Build',
        pkg: grunt.file.readJSON('package.json'),
        archive_name: grunt.option('name') || '项目名称', //此处可根据自己的需求修改

        //清理掉开发时才需要的文件
        clean: {
            pre: ['build/'], //删除掉先前的开发文件
            post: ['<%= archive_name %>*.zip'] //先删除先前生成的压缩包
        },
        //JS检测
         jshint: {
             all: ['<%= paths.js %>/<%= fileHandle.js %>.js']
         },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                banner: '/** \n' +
                    '* Project : <%= pkg.name %> \n' +
                    '* Author : <%= pkg.author %> \n' +
                    '* Updated : <%= grunt.template.today() %> \n' +
                    '*/ \n'
            },
            dist: {
                files: {
                    '<%= paths.assets %>/js/<%= fileHandle.js %>.js': '<%= paths.js %>/<%= fileHandle.js %>.js'
                }
            }
        },
        //调用谷歌高级压缩
        'closure-compiler': {
            base: {
                closurePath: '/usr/local/Cellar/closure-compiler/20140407/libexec', //在这里指定谷歌高级压缩路径
                js: [
                    '<%= paths.assets %>/js/v.js',
                ],
                jsOutputFile: '<%= paths.assets %>/js/min.main.js', //输出的js为min.main.js
                noreport: true,
                maxBuffer: 500,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    warning_level: "DEFAULT"
                        // language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        },
        //压缩最终Build文件夹
        compress: {
            main: {
                options: {
                    archive: '<%= archive_name %>-<%= grunt.template.today("yyyy") %>年<%= grunt.template.today("mm") %>月<%= grunt.template.today("dd") %>日<%= grunt.template.today("h") %>时<%= grunt.template.today("TT") %>.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: ''
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['*','!bower_components','!assets','!git','!build', '!.gitignore', '!.DS_Store', '!Gruntfile.js', '!package.json', '!node_modules/**', '!go.sh', '!.ftppass', '!<%= archive_name %>*.zip'],
                    dest: 'build/'
                }, ]
            },

             // {
          //           expand: true,
          //           src: ['assets/css/**'],
          //           dest: 'build/css'
          //       }, {
          //           expand: true,
          //           src: ['assets/images/**'],
          //           dest: 'build/images'
          //       }, {
          //           expand: true,
          //           src: ['assets/js/**'],
          //           dest: 'build/js'
          //       },

            js:{
                expand: true,
                cwd: '<%= paths.assets %>/js/',
                src: ['**'],
                dest: 'build/js',
                flatten: true,
                filter: 'isFile',
            },
            css:{
                expand: true,
                cwd: '<%= paths.assets %>/css/',
                src: ['**'],
                dest: 'build/css',
                flatten: true,
                filter: 'isFile',
            },

            images: {
                expand: true,
                cwd: '<%= paths.assets %>/images/',
                src: ['**', '!github.png'],
                dest: 'build/images',
                flatten: true,
                filter: 'isFile',
            },

            html:{
                expand: true,
                cwd: '<%= paths.assets %>/',
                src: ['*.html'],
                dest: 'build/',
                flatten: true,
                filter: 'isFile',
            },

            archive: {
                files: [{
                    expand: true,
                    src: ['<%= archive_name %>.zip'],
                    dest: 'dist/'
                }]
            }
        },

        //Sass 预处理
        less: {
            admin: {
                options: {
                    sourcemap: true,
                    // style: 'nested',
                    banner: '/** \n' +
                        '* Project : <%= pkg.name %> \n' +
                        '* Author : <%= pkg.author %> \n' +
                        '* Updated : <%= grunt.template.today() %> \n' +
                        '*/ \n'
                },
                files: {
                    '<%= paths.css %>/<%= fileHandle.css %>.css': '<%= paths.lcss %>/<%= fileHandle.css %>.less',
                }
            }
        },
        //css检测
         csslint:{
            options:{
                csslintrc:'.csslint'
            },
            build:['<%= paths.css %>/<%= fileHandle.css %>.css']
 
        },

        //压缩 css
        cssmin: {
            options: {
                keepSpecialComments: 0,
                banner: '/** \n' +
                    '* Project : <%= pkg.name %> \n' +
                    '* Author : <%= pkg.author %> \n' +
                    '* Updated : <%= grunt.template.today() %> \n' +
                    '*/ \n'
            },
            compress: {
                files: {
                    '<%= paths.assets %>/css/<%= fileHandle.css %>.css': [
                        '<%= paths.css %>/<%= fileHandle.css %>.css'
                    ]
                }
            }
        },

        // 格式化和清理html文件
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true //压缩html:根据情况开启与否
                },

                files: {
                    '<%= paths.assets %>/<%= fileHandle.html %>.html': [
                        '<%= fileHandle.html %>.html'
                    ] //清除html中的注释
                }
            }
        },

        //优化图片 请参考  https://github.com/JamieMason/ImageOptim-CLI
        imageoptim: {
            myTask: {
                options: {
                    jpegMini: false,
                    imageAlpha: true,
                    quitAfter: true
                },
                src: ['<%= paths.assets %>/images', '<%= paths.assets %>/images']
            }
        },

        //监听变化 默认grunt watch 监测所有开发文件变化
        watch: {
            options: {
                //开启 livereload
                livereload: true,
                //显示日志
                dateFormate: function(time) {
                    grunt.log.writeln('编译完成,用时' + time + 'ms ' + (new Date()).toString());
                    grunt.log.writeln('Wating for more changes...');
                }
            },
            //css
            less: {
                files: '<%= paths.lcss %>/<%= fileHandle.css %>.less',
                tasks: ['less:admin', 'cssmin']
            },
            css: {
                files: '<%= paths.css %>/<%= fileHandle.css %>.css',
                tasks: ['cssmin']
            },
            js: {
                files: '<%= paths.js %>/<%= fileHandle.js %>.js',
                tasks: ['uglify']
            },
            //若不使用Sass，可通过grunt watch:base 只监测style.css和js文件
            base: {
                files: ['<%= paths.css %>/<%= fileHandle.css %>.css', '<%= paths.js %>/<%= fileHandle.css %>.js', 'img/**'],
                tasks: ['cssmin', 'uglify', 'copy:images']
            }

        },

        //发布到FTP服务器 : 请注意密码安全，ftp的帐号密码保存在主目录 .ftppass 文件
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'yourftp.domain.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'build',
                dest: '/home/ftp/demo',
                exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
            }
        },

        'sftp-deploy': {
            build: {
                auth: {
                    host: 'yoursftp.domain.com',
                    port: 22,
                    authKey: 'key1'
                },
                cache: 'sftpCache.json',
                src: 'build',
                dest: '/home/sftp/demo',
                exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp'],
                serverSep: '/',
                concurrency: 4,
                progress: true
            }
        },
         concat: {
              options: {
                // separator: ';',
              },
              dist: {
                src: ['./js/plugin.js', './src/plugin2.js'],
                dest: './assets/global.js',
              },
        }

    });

    //输出进度日志
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + '文件: ' + filepath + ' 变动状态: ' + action);
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sftp-deploy');
    grunt.loadNpmTasks('grunt-closure-compiler'); //增加谷歌高级压缩
    grunt.loadNpmTasks('grunt-imageoptim');
    /*下方为配置的常用 grunt 命令*/
    grunt.registerTask('compressother', ['htmlmin', 'copy:images']);
    grunt.registerTask('compresscss', ['less:admin', 'csslint','cssmin']);
    grunt.registerTask('compressjs', ['jshint', 'uglify']);
    //执行 grunt bundle --最终输出的文件 < name-生成日期.zip > 文件
    grunt.registerTask('bundle', ['clean:pre', 'copy:js', 'copy:css', 'copy:main', 'copy:html', 'cssmin', 'copy:archive', 'clean:post', 'htmlmin', 'compress', ]);
    //执行 grunt publish 可以直接上传项目文件到指定服务器FTP目录
    grunt.registerTask('publish', ['ftp-deploy']);
    //执行 grunt ssh 可以利用 ssh 上传到服务器
    grunt.registerTask('ssh', ['sftp-deploy']);
    //执行 grunt gcc 可进行谷歌压缩
    grunt.registerTask('gcc', ['closure-compiler']);

};
