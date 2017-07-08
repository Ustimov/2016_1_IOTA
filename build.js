/**
 * Created by note on 27.05.16.
 */
({
    baseUrl: 'public_html/js',

    out: 'build/main.js',
    optimize: 'uglify2',

    name: 'lib/almond/almond',
    include: ['lib/almond/almond','main'],
    stubModules: ['cs', 'text'],
    wrap: true,

    paths: {
        backbone: 'lib/backbone',
        underscore: 'lib/underscore',
        jquery: 'lib/jquery',
        require: 'lib/require',
        scp: 'serviceworker-cache-polyfill'
    }
})