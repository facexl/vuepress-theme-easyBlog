const gulp  = require('gulp')
const watch = require('gulp-watch')
const createCategory = require('./createCategory')
gulp.task('watch',function(){
    return watch('blog/**', function (e) {
        createCategory()
    });
})
