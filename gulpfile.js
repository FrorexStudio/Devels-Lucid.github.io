const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    // pug = require('gulp-pug'),
    sass = require('gulp-sass')(require('sass')),

    app = 'app/',
    dist = 'dist/';

const config = {
    app: {
        // html: app + 'pug/*.pug',
        html: app + 'html/*.html',
        style: app + 'scss/**/*.scss',
        js: app + 'js/**/*.js',
        img: app + 'img/**/*.*',
        fonts: app + 'fonts/**/*.*',
    },
    dist: {
        html: dist,
        style: dist + 'css/',
        js: dist + 'js/',
        img: dist + 'img/',
        fonts: dist + 'fonts/',
    },
    watch: {
        // html: app + 'pug/*.pug',
        html: app + 'html/*.html',
        style: app + 'scss/**/*.scss',
        js: app + 'js/**/*.js',
        img: app + 'img/**/*.*',
        fonts: app + 'fonts/**/*.*',
    }
}








// Tasks

// web server
const webServer = () => {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 9000,
        host: 'localhost',
        notify: false
    })
}

// // Pug
// const pugTask = () => {
//     return gulp.src(config.app.html)
//         .pipe(pug())
//         .pipe(pug({
//             pretty: false
//         }))
//         .pipe(gulp.dest(config.dist.html))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// };

// html
const htmlTask = () => {
    return gulp.src(config.app.html)
        .pipe(gulp.dest(config.dist.html))
        .pipe(browserSync.reload({
            stream: true
        }))
};

// Scss
const scssTask = () => {
    return gulp.src(config.app.style)
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.dist.style))
        .pipe(browserSync.reload({
            stream: true
        }))
};

// js
const jsTask = () => {
    return gulp.src(config.app.js)
        .pipe(gulp.dest(config.dist.js))
        .pipe(browserSync.reload({
            stream: true
        }))
};

// img
const imgTask = () => {
    return gulp.src(config.app.img)
        .pipe(gulp.dest(config.dist.img))
        .pipe(browserSync.reload({
            stream: true
        }))
};

// fonts
const fontsTask = () => {
    return gulp.src(config.app.fonts)
        .pipe(gulp.dest(config.dist.fonts))
        .pipe(browserSync.reload({
            stream: true
        }))
};


// watcher
const watchFiles = () => {
    // gulp.watch([config.watch.html], gulp.series(pugTask));
    gulp.watch([config.watch.html], gulp.series(htmlTask));
    gulp.watch([config.watch.style], gulp.series(scssTask));
    gulp.watch([config.watch.js], gulp.series(jsTask));
    gulp.watch([config.watch.img], gulp.series(imgTask));
    gulp.watch([config.watch.fonts], gulp.series(fontsTask));
}

// start
const start = () => {
    // gulp.series(pugTask, scssTask, jsTask, imgTask, fontsTask);
    gulp.series(htmlTask, scssTask, jsTask, imgTask, fontsTask);
}



// exports
exports.default = gulp.parallel(start, watchFiles, webServer);