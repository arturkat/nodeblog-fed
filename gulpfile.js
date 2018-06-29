const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require("gulp-autoprefixer")
const cssnano = require("gulp-cssnano")
const browserSync = require("browser-sync").create()
const plumber = require("gulp-plumber")

gulp.task("scss", () => {
    return (
        gulp
            .src("dev/scss/**/*.scss")
            .pipe(plumber())
            .pipe(sass().on("error", sass.logError))
            .pipe(
                autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
                    cascade: true
                })
            )
            // .pipe(cssnano())
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream())
    )
})

gulp.task("browser-sync", () => {
    browserSync.init({
        // proxy: "http://localhost:3000",
        server: {
            baseDir: "./dist"
        },
        notify: false
    })
})

gulp.task("default", ["browser-sync", "scss"], () => {
    gulp.watch("dev/scss/**/*.scss", ["scss"])

    gulp.watch("dist/*.html", () => {
        browserSync.reload()
    })
})
