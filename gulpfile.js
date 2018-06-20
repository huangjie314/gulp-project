var gulp = require('gulp');
//加载gulp-load-plugins插件，并马上运行它
var plugins = require('gulp-load-plugins')();

//浏览器版本
const browsers = [
    'defaults',
    'last 2 Chrome versions',
    'safari 5',
    'ie 6-8',
    'ie 9',
    'ie 10',
    'ie 11',
    'Firefox >= 20',
    'opera 12.1',
    'iOS 7',
    'Android >= 4.0',
]

//检查脚本
gulp.task('jshint', function(){
    gulp.src('js/*.js')
    .pipe(plugins.jshint())
    //.pipe(plugins.jshint.reporter('default'));//输出结果
    console.log('检查脚本完毕！');
})
//压缩脚本
gulp.task('script', function(){
    gulp.src(['js/*.js', '!js/*.min.js'])
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest('js'));
    console.log('压缩js完毕！');
})
//压缩css
gulp.task('minify-css', function(){
    gulp.src(['css/*.css', '!css/*.min.css'])
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest('css'));
    console.log('压缩css完毕！');
})
//编译sass
gulp.task('compile-sass', function(){
    gulp.src('sass/*.+(sass|scss)')
    .pipe(plugins.autoprefixer({
        browsers: browsers,
        cascade: true,
        remove: true
    }))
    .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(plugins.notify({message: 'compile sass success!'}))
})
gulp.task('watch-sass', () => {
    gulp.watch('sass/*.+(sass|scss)', ['compile-sass']);
})
//监听
gulp.task('watch', function(){
    var watcher1 = gulp.watch('js/*.js', ['jshint', 'script']);
    gulp.watch('css/index.css', ['minify-css']);
    watcher1.on('change', function(event){
        //event.type==deleted时处理删除情况
        console.log('File '+event.path + 'was' + event.type + ', running tasks...');
    })
})
//清理
// gulp.task('clean', function () {
//     return gulp.src('application', {read: false})
//     .pipe(clean());
// });
gulp.task('default', function(){
    gulp.run('jshint', 'script', 'watch');
    console.log('Starting...')
});