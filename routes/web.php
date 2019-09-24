<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});
 

Auth::routes();

Route::middleware(['auth'])->group(function () {

    Route::get('/cache', function() {
        $exitCode = Artisan::call('config:clear');
        $exitCode = Artisan::call('cache:clear');
        $exitCode = Artisan::call('config:cache');
        return 'DONE'; //Return anything
    });
    
    Route::get('/home', 'HomeController@index')->name('home');

    //Rutas de sucursales
    Route::get('/sucursales', 'SucursalController@index');
    Route::post('/sucursal/registrar', 'SucursalController@guardarSucursal');
    Route::post('/sucursal/actualizar', 'SucursalController@actualizarSucursal');
    Route::post('/sucursal/eliminar', 'SucursalController@eliminarSucursal');
  
    //Rutas de perfiles
    Route::get('/perfiles', 'PerfilController@index');
    Route::post('/perfil/registrar', 'PerfilController@guardar');
    Route::post('/perfil/actualizar', 'PerfilController@actualizar');
    Route::post('/perfil/eliminar', 'PerfilController@eliminar');

    //Rutas de usuario
    Route::get('/usuarios', 'UserController@index');
    Route::post('/usuario/registrar', 'UserController@guardarUsuario');
    Route::post('/usuario/actualizar', 'UserController@actualizarUsuario');
    Route::post('/usuario/eliminar', 'UserController@eliminarUsuario');

    //Rutas de categorías
    Route::get('/categorias', 'CategoriaController@index');
    Route::post('/categoria/registrar', 'CategoriaController@guardarCategoria');
    Route::post('/categoria/actualizar', 'CategoriaController@actualizarCategoria');
    Route::post('/categoria/eliminar', 'CategoriaController@eliminarCategoria');
    Route::post('/categoria/restaurar', 'CategoriaController@restaurarCategoria');

    //Rutas de categorías
    Route::get('/subCategorias', 'SubCategoriaController@index');
    Route::post('/subCategorias', 'SubCategoriaController@indexCategoria');
    Route::post('/subCategoria/registrar', 'SubCategoriaController@guardarSubCategoria');
    Route::post('/subCategoria/eliminar', 'SubCategoriaController@eliminarSubCategoria');
    Route::post('/subCategoria/restaurar', 'SubCategoriaController@restaurarSubCategoria');

    //Rutas de categorías
    Route::get('/productos', 'ProductoController@index');
    Route::get('/productos/activos', 'ProductoController@indexActivos');
    Route::get('/productos/criticos', 'ProductoController@indexCriticos');
    Route::get('/productos/stock', 'ProductoController@indexStock');
    Route::post('/producto/registrar', 'ProductoController@guardarProducto');
    Route::post('/producto/actualizar', 'ProductoController@actualizarProducto');
    Route::post('/producto/eliminar', 'ProductoController@eliminarProducto');
    Route::post('/producto/restaurar', 'ProductoController@restaurarProducto');
    Route::post('/producto/ingreso/stock', 'ProductoController@ingresoStockManual');

    //Rutas de stock sucursales
    Route::get('/stockSucursal', 'StockSucursalController@index');
    Route::post('/stockSucursal/registrarStock', 'StockSucursalController@registrarStock');
    Route::post('/stockSucursal/obtenerStock', 'StockSucursalController@obtenerStock');

    //Rutas de categorias de clientes
    Route::get('/categoriasClientes', 'CategoriaClienteController@index');
    Route::post('/categoriasClientes/registrar', 'CategoriaClienteController@guardarCategoriaCliente');
    Route::post('/categoriasClientes/actualizar', 'CategoriaClienteController@actualizarCategoriaCliente');
    Route::post('/categoriasClientes/eliminar', 'CategoriaClienteController@eliminarCategoriaCliente');
    

    //Rutas de empresas
    Route::get('/empresas', 'EmpresaController@index');
    Route::post('/empresa/registrar', 'EmpresaController@guardarEmpresa');
    Route::post('/empresa/actualizar', 'EmpresaController@actualizarEmpresa');
    Route::post('/empresa/eliminar', 'EmpresaController@eliminarEmpresa');

    //Rutas de documentos
    Route::get('/documentos/{tipo}', 'DocumentoController@index');
    Route::post('/documento/registrar', 'DocumentoController@guardarDocumento');
    Route::post('/documento/restaurar', 'DocumentoController@restaurarDocumento');
    Route::post('/documento/eliminar', 'DocumentoController@eliminarDocumento');
    Route::get('/documentos/{id}/ver', 'DocumentoController@verDetalle');
    Route::get('/documento/cotizacion/{id}/descargar', 'DocumentoController@descargarCotizacion');
    Route::get('/documento/cotizacion/{id}/enviar', 'DocumentoController@enviarCotizacion');
    Route::get('/documento/ordenCompra/{id}/descargar', 'DocumentoController@descargarOrdenCompra');
    Route::get('/documento/ordenCompra/{id}/enviar', 'DocumentoController@enviarOrdenDeCompra');

    //Rutas de clientes
    Route::get('/clientes', 'ClienteController@index');
    Route::get('/clientes/{id}/lista', 'ClienteController@indexVenta');
    Route::post('/cliente/registrar', 'ClienteController@guardarCliente');
    Route::post('/cliente/actualizar', 'ClienteController@actualizarCliente');
    Route::post('/cliente/eliminar', 'ClienteController@eliminarCliente');
    Route::post('/cliente/restaurar', 'ClienteController@restaurarCliente');

    //Rutas de lista de clientes
    Route::post('/productoLista/cliente', 'ListaClienteController@obtenerListaCliente');
    Route::post('/productoLista/registrar', 'ListaClienteController@guardarListaCliente');
    Route::post('/productoLista/eliminar', 'ListaClienteController@eliminarProductoListaCliente');

    //Rutas de ventas
    Route::get('/ventas', 'VentaController@index');
    Route::post('/venta/registrar', 'VentaController@registrarVenta');
    Route::get('/ventas/pendientes', 'VentaController@pendientes');
    Route::post('/venta/entrega', 'VentaController@entregar');
    

    //Rutas de resumen
    Route::get('/resumen', 'HomeController@resumen');

    //Rutas de log
    Route::get('/logs', 'LogStockController@index');

});



