const gulp = require("gulp");
const babel = require("gulp-babel");    // 用于ES6转化ES5
const count = require('gulp-count');
const concat = require("gulp-concat");
const uglify = require('gulp-uglify'); // 用于压缩 JS
const webserver = require('gulp-webserver');
const clean = require('gulp-clean');
const browserify = require('browserify'),
    babelify = require('babelify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

gulp.task('browserify', () => {
    return browserify({
        entries: ['src/js/index.js'],
        debug: true, // 告知Browserify在运行同时生成内联sourcemap用于调试; ask Browserify to generate sourcemap
    })
        .transform("babelify", {
            "presets": [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }]], "plugins": [["@babel/plugin-transform-runtime"]]
        })
        .bundle()
        .pipe(source('index.js')) // rename output file here
        .pipe(buffer()) // 缓存文件内容
        .pipe(sourcemaps.init({ loadMaps: true })) // 从 browserify 文件载入 map;load sourceMap from Browserify
        .pipe(uglify())
        .pipe(sourcemaps.write('.')) // 写入 .map 文件; write .map file
        .pipe(gulp.dest('dist/js'));
})

gulp.task('cleanDist', () => {
    return gulp.src('dist/*', { read: false })
        .pipe(clean())
})

// ES6转化为ES5
// 在命令行使用 gulp toes5 启动此任务
gulp.task("toes5", () => {
    console.log("开始");
    return gulp.src("src/js/**/*.js")// ES6 源码存放的路径
        .pipe(count('## js-files selected'))
        .pipe(concat('actionsAssemble.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("dist")); //转换成 ES5 存放的路径
});

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('min', () => {
    // 1. 找到文件
    return gulp.src('dist/*/*.js')
        // 2. 压缩并清理console文件
        .pipe(uglify({ compress: { drop_console: true } }))
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('min/'))
});

gulp.task('webserver', () => {
    return gulp.src('./')
        .pipe(webserver({
            livereload: true,
            host: "localhost",
            directoryListing: true,
            open: true,
            port: 9000
        }
        ));
});

gulp.task('cleanES5', () => {
    return gulp.src('dist/*', { read: false })
        .pipe(clean())
})

gulp.task('cleanMin', () => {
    return gulp.src('min/*', { read: false })
        .pipe(clean())
})

gulp.task('es5min', gulp.series('cleanES5', 'cleanMin', 'toes5', 'min'));

// 自动监控任务
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('src/js/**/*.js', gulp.series('cleanDist', 'browserify'));
});