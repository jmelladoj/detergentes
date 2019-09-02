/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('usuario', require('./components/Usuario.vue').default);
Vue.component('categoria-producto', require('./components/CategoriaProducto.vue').default);
Vue.component('producto', require('./components/Producto.vue').default);
Vue.component('productos-criticos', require('./components/StockCritico.vue').default);
Vue.component('productos-stock', require('./components/Stock.vue').default);
Vue.component('cliente', require('./components/Cliente.vue').default);
Vue.component('categoria-cliente', require('./components/CategoriaCliente.vue').default);
Vue.component('empresa', require('./components/Empresa.vue').default);
Vue.component('sucursal', require('./components/Sucursal.vue').default);
Vue.component('cotizacion', require('./components/Cotizacion.vue').default);
Vue.component('orden-compra', require('./components/OrdenCompra.vue').default);
Vue.component('venta-normal', require('./components/VentaNormal.vue').default);
Vue.component('detalle-ventas', require('./components/Ventas.vue').default);
Vue.component('dashboard', require('./components/Dashboard.vue').default);
Vue.component('pendientes', require('./components/Pendientes.vue').default);
//Vue.component('venta-premium', require('./components/VentaPremium'));
Vue.component('stock-manual', require('./components/StockManual.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    el: '#app',
    data :{
        menu : 16
    }
});

