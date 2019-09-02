const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.styles([
    'public/public_intranet/css/pages/login-register-lock.css',
    'public/public_intranet/css/style.css'
    ], 'public/css/login.css'),
    mix.scripts([
    'public/public_intranet/node_modules/popper/popper.min.js'
    ], 'public/js/login.js');
    
    mix.styles([
    'public/public_intranet/node_modules/morrisjs/morris.css',
    'public/public_intranet/css/style.min.css',
    'public/public_intranet/css/pages/dashboard1.css',
    'public/public_intranet/css/pages/floating-label.css'
    ], 'public/public_intranet/css/estilos_intranet.css')
    .scripts([
    'public/public_intranet/node_modules/popper/popper.min.js',
    'public/public_intranet/js/perfect-scrollbar.jquery.min.js',
    'public/public_intranet/js/waves.js',
    'public/public_intranet/js/sidebarmenu.js',
    'public/public_intranet/js/custom.min.js',
    'public/public_intranet/node_modules/jquery-sparkline/jquery.sparkline.min.js',
    'public/public_intranet/node_modules/raphael/raphael-min.js',
    'public/public_intranet/node_modules/morrisjs/morris.min.js',
    'public/public_intranet/js/dashboard1.js',
    'public/public_intranet/js/sweetalert2.all.js'
    ], 'public/public_intranet/js/plugins_intranet.js');
