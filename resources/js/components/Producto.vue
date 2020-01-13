<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Productos</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Productos</li>
                        </ol>
                        <button type="button" v-b-tooltip.hover title="Ingresar productos al sistema" @click="abrirModal('producto','registrar')" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Crear Producto</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="estadoUsuario" class="form-group row alert alert-success">
                                <div class="text-left">
                                    <li v-for="estado in estados" :key="estado" v-text="estado"></li>
                                </div>
                            </div>
                            <div class="form-group row">
                                <template>
                                    <div class="table-responsive">
                                        <b-container fluid>
                                            <!-- User Interface controls -->
                                            <b-row>
                                            <b-col md="6" class="my-1">
                                                <b-form-group label-cols-sm="3" label="Filtrar" class="mb-0">
                                                <b-input-group>
                                                    <b-form-input v-model="filter" placeholder="Escribe para buscar" />
                                                    <b-input-group-append>
                                                    <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
                                                    </b-input-group-append>
                                                </b-input-group>
                                                </b-form-group>
                                            </b-col>

                                            <b-col md="6" class="my-1">
                                                <b-form-group label-cols-sm="3" label="Ordenar" class="mb-0">
                                                <b-input-group>
                                                    <b-form-select v-model="sortBy" :options="sortOptions">
                                                    <option slot="first" :value="null">-- nada --</option>
                                                    </b-form-select>
                                                    <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                                                    <option :value="false">Asc</option> <option :value="true">Desc</option>
                                                    </b-form-select>
                                                </b-input-group>
                                                </b-form-group>
                                            </b-col>

                                            <b-col md="6" class="my-1">
                                                <b-form-group label-cols-sm="3" label="Dirección" class="mb-0">
                                                <b-input-group>
                                                    <b-form-select v-model="sortDirection" slot="append">
                                                    <option value="asc">Asc</option> <option value="desc">Desc</option>
                                                    <option value="last">Último</option>
                                                    </b-form-select>
                                                </b-input-group>
                                                </b-form-group>
                                            </b-col>

                                            <b-col md="6" class="my-1">
                                                <b-form-group label-cols-sm="3" label="Por página" class="mb-0">
                                                <b-form-select :options="pageOptions" v-model="perPage" />
                                                </b-form-group>
                                            </b-col>
                                            </b-row>

                                            <!-- Main table element -->
                                            <b-table class="table table-hover table-striped"
                                            show-empty
                                            responsive="md" 
                                            :items="productos"
                                            :fields="fields"
                                            :current-page="currentPage"
                                            :per-page="perPage"
                                            :filter="filter"
                                            :sort-by.sync="sortBy"
                                            :sort-desc.sync="sortDesc"
                                            :sort-direction="sortDirection"
                                            @filtered="onFiltered"
                                            >
                                            <template v-slot:cell(acciones)="row">

                                                <template slot="precio_costo" slot-scope="row">
                                                    $ {{ row.item.precio_costo.toLocaleString() }}
                                                </template>

                                                <template slot="precio_normal" slot-scope="row">
                                                    $ {{ row.item.precio_normal.toLocaleString() }}
                                                </template>

                                                <template slot="precio_mayorista" slot-scope="row">
                                                    $ {{ row.item.precio_mayorista.toLocaleString() }}
                                                </template>

                                                <b-button size="xs" v-b-tooltip.hover title="Asignar stock a sucursales" @click="abrirModalSucursalStock(row.item)" class="btn btn-success">
                                                    <i class="fa fa-plus"></i>
                                                </b-button> 

                                                <b-button size="xs" v-b-tooltip.hover title="Editar informción de producto" @click="abrirModal('producto','actualizar',row.item)" class="btn btn-warning">
                                                    <i class="icon-pencil"></i>
                                                </b-button>

                                                <b-button v-if="row.item.deleted_at" size="xs" v-b-tooltip.hover title="Restaurar producto" @click="restaurarProducto(row.item.id)" class="btn btn-warning">
                                                    <i class="fa fa-undo"></i>
                                                </b-button>

                                                <b-button v-else size="xs" v-b-tooltip.hover title="Eliminar producto" @click="eliminarProducto(row.item.id)"  class="btn btn-danger">
                                                    <i class="icon-trash"></i>
                                                </b-button>
                                            </template>

                                            </b-table>

                                            <b-row>
                                            <b-col md="6" class="my-1">
                                                <b-pagination
                                                :total-rows="totalRows"
                                                :per-page="perPage"
                                                v-model="currentPage"
                                                class="my-0"
                                                />
                                            </b-col>
                                            </b-row>
                                        </b-container>
                                    </div>
                                    
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade bs-example-modal-md" :class="{'mostrar' : modal}" style="display: none;" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myLargeModalLabel" v-text="tituloModal"></h4>
                        <button type="button" class="close" @click="cerrarModal()" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-body">
                            <div v-show="errorProducto" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form m-t-20">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Nombre Producto</label>
                                            <input type="text" class="form-control" v-model="nombre">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Codigo producto</label>
                                            <input type="text" class="form-control" v-model="codigo">
                                            <barcode :value="codigo" :options="{ format: 'EAN-13' }">Generando código de barras.</barcode>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Precio costo</label>
                                            <input type="number" class="form-control" v-model="precio_costo">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Precio normal</label>
                                            <input type="number" class="form-control" v-model="precio_normal">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Precio mayorista</label>
                                            <input type="number" class="form-control" v-model="precio_mayorista">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Stock</label>
                                            <input type="number" class="form-control" v-model="stock">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Stock Crítico</label>
                                            <input type="number" class="form-control" v-model="stock_critico">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Cantidad Mayorista</label>
                                            <input type="number" class="form-control" v-model="cantidad_mayorista">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label> Subcategoría de Producto</label>
                                            <select class="form-control p-0" v-model="sub_categoria_id">
                                                <option v-for="subcategoria in subCategorias" :key="subcategoria.id" :value="subcategoria.id" v-text="subcategoria.categoria.nombre + ' - ' + subcategoria.nombre"></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarProducto()">Guardar</button>
                        <button type="button" v-if="tipoAccion==2" class="btn btn-primary" @click="actualizarProducto()">Actualizar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <div class="modal fade bs-example-modal-md" :class="{'mostrar' : modal_stock}" style="display: none;" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myLargeModalLabel" v-text="'Asignar Stock'"></h4>
                        <button type="button" class="close" @click="cerrarModalStock()" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-body">
                            <div v-show="errorStockProducto" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form">
                                <div class="row">
                                    <div class="col-md-12 text-center">
                                        <h5>Debes asignar : <b><font color="blue" v-text="' ' + stock_producto"></font></b> productos | Llevas : <b><font color="green" v-text="' ' + stock_producto_fijo"></font></b> productos</h5>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="table-responsive">
                                        <table id="tablaGiftcards" class="table table-bordered table-striped">
                                            <thead>
                                                <tr align="center">
                                                    <th>#</th>
                                                    <th>Sucursal</th>
                                                    <th>Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in stock_sucursal" :key="item.id" :value="item.id">
                                                    <td align="center" class="align-middle">{{ index + 1 }}</td>
                                                    <td class="align-left">{{ item.nombre_sucursal }}</td>
                                                    <td><input type="number" class="form-control" v-model="item.stock_sucursal" @change="stockRestante()"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModalStock()">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="asignarStock()">Asigar Stock</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

    </div>
</template>

<script>
    import BootstrapVue from 'bootstrap-vue';
    import VueBarcode from 'vue-barcode';
    import Vue2Filters from 'vue2-filters';

    Vue.use(Vue2Filters)
    Vue.use(BootstrapVue)

    const items = [];

    export default {
        data (){
            return {
                producto_id: 0,
                nombre : '',
                codigo : '',
                precio_costo : 0,
                precio_normal : 0,
                precio_mayorista : 0,
                stock : 0,
                stock_critico : 0,
                cantidad_mayorista : 0,
                sub_categoria_id : 0,
                stock_producto : 0,
                stock_producto_fijo : 0,
                productos : [],
                subCategorias : [],
                sucursales :  [],
                stock_sucursal : [],
                modal : 0,
                modal_stock: 0,
                tituloModal : '',
                tipoAccion : 0,
                estadoUsuario: 0,
                estados : [],
                errorProducto : 0,
                errorStockProducto : 0,
                errores : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'nombre', label: 'NOMBRE', sortable: true, class: 'text-left' },
                    { key: 'precio_costo', label: 'COSTO', sortable: true, class: 'text-center' },
                    { key: 'precio_normal', label: 'NORMAL', sortable: true, class: 'text-center' },
                    { key: 'precio_mayorista', label: 'MAYORISTA', sortable: true, class: 'text-center' },
                    { key: 'stock', label: 'STOCK', sortable: true, class: 'text-center' },
                    { key: 'acciones', label: 'ACCIONES', sortable: true, class: 'text-center' },
                ],
                currentPage: 1,
                perPage: 10,
                totalRows: 0,
                pageOptions: [10, 25, 50, 100],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null
            }
        },
        components: {
            'barcode': VueBarcode
        },
        computed:{
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
            },
        },
        methods : {
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            listarStockProducto(){
                let me = this;

                axios.post('/stockSucursal/obtenerStock',{
                    'producto_id' : this.producto_id
                }).then(function (response) {
                    var respuesta= response.data;

                    respuesta.stocks.forEach(function(item) {
                        var producto_sucursal = new Object();
                        
                        producto_sucursal['id'] = item.id;
                        producto_sucursal['nombre_sucursal'] = item.sucursal.nombre;
                        producto_sucursal['stock_sucursal'] = item.stock;
                        producto_sucursal['sucursal_id'] = item.sucursal_id;
                        producto_sucursal['producto_id'] = item.producto_id;

                        me.stock_sucursal.push(producto_sucursal);
                    });

                    me.stockRestante();
                    
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            stockRestante(){
                var total = 0;

                this.stock_sucursal.forEach(function(item) {
                    total += parseInt(item.stock_sucursal);
                });

                this.stock_producto_fijo = total;
            },
            asignarStock(){
                if (this.validarStock()){
                    return;
                }
                
                let me = this;

                axios.post('/stockSucursal/registrarStock',{
                    'stock_sucursales': this.stock_sucursal
                }).then(function (response) {
                    me.cerrarModalStock();
                    me.statusProducto(3);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarProductos(){
                let me=this;
                var url= '/productos';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.productos = respuesta.productos;
                    me.totalRows = me.productos.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarSubCategorias(){
                let me=this;
                var url= '/subCategorias';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.subCategorias = respuesta.subCategorias;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            registrarProducto(){
                if(this.validarProducto()){
                    return;
                }
                
                let me = this;

                axios.post('/producto/registrar',{
                    'nombre': this.nombre,
                    'codigo' : this.codigo,
                    'precio_costo' : this.precio_costo,
                    'precio_normal' : this.precio_normal,
                    'precio_mayorista' : this.precio_mayorista,
                    'stock' : this.stock,
                    'stock_critico' : this.stock_critico,
                    'cantidad_mayorista' : this.cantidad_mayorista,
                    'sub_categoria_id' : this.sub_categoria_id
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarProductos();
                    me.statusProducto(1);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            actualizarProducto(){
                this.errores =[];

                if (this.validarProducto()){
                    return;
                }
                
                let me = this;

                axios.post('/producto/actualizar',{
                    'nombre': this.nombre,
                    'codigo' : this.codigo,
                    'precio_costo' : this.precio_costo,
                    'precio_normal' : this.precio_normal,
                    'precio_mayorista' : this.precio_mayorista,
                    'stock' : this.stock,
                    'stock_critico' : this.stock_critico,
                    'cantidad_mayorista' : this.cantidad_mayorista,
                    'sub_categoria_id' : this.sub_categoria_id,
                    'producto_id': this.producto_id
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarProductos();
                    me.statusProducto(2);
                }).catch(function (error) {
                    console.log(error.response.data);
                }); 
            },
            eliminarProducto(id){
               swal({
                title: '¿Esta seguro de eliminar este producto?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar!',
                cancelButtonText: 'Cancelar',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                reverseButtons: true
                }).then((result) => {
                if (result.value) {
                    let me = this;

                    axios.post('/producto/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarProductos();
                        swal(
                        'Producto eliminado!',
                        'El registro ha sido eliminado con éxito.',
                        'success'
                        )
                    }).catch(function (error) {
                        console.log(error.response.data);
                    });
                } else if (
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    
                }
                }) 
            },
            restaurarProducto(id){
               swal({
                title: '¿Esta seguro de restaurar este producto?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar!',
                cancelButtonText: 'Cancelar',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                reverseButtons: true
                }).then((result) => {
                if (result.value) {
                    let me = this;

                    axios.post('/producto/restaurar',{
                        'id': id
                    }).then(function (response) {
                        me.listarProductos();
                        swal(
                        'Producto restaurado!',
                        'El registro ha sido restaurado con éxito.',
                        'success'
                        )
                    }).catch(function (error) {
                        console.log(error.response.data);
                    });
                } else if (
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    
                }
                }) 
            },
            validarProducto(){
                this.errorProducto = 0;
                this.errores = [];

                if (!this.nombre) this.errores.push("Se debe de asignar un nombre al producto.");
                if (!this.codigo) this.errores.push("Se le debe asignar un código al producto");
                if (this.precio_costo < 0) this.errores.push("El valor del precio costo debe ser mayor o igual a 0");
                if (this.precio_normal < 0) this.errores.push("El valor del precio normal debe ser mayor o igual a 0");
                if (this.precio_mayorista < 0) this.errores.push("El valor del precio mayorista debe ser mayor o igual a 0");
                if (this.stock < 0) this.errores.push("El stock debe ser mayor o igual a 0");
                if (this.stock_critico < 0) this.errores.push("El stock crítico debe ser mayor o igual a 0");
                if (this.cantidad_mayorista < 0) this.errores.push("El stock mayorista debe ser mayor o igual a 0");
                if (!this.sub_categoria_id) this.errores.push("Se debe de asignar una categoría al producto");
                if (this.errores.length) this.errorProducto = 1;

                return this.errorProducto;
            },
            validarStock(){
                this.errorStockProducto = 0;
                this.errores =[];

                if (this.stock_producto_fijo > this.stock_producto) this.errores.push("La districubión de stock supera el total de stock");
                if (this.stock_producto_fijo < 0) this.errores.push("La districubión de stock no puede ser negativa");
                if (this.errores.length) this.errorStockProducto = 1;

                return this.errorStockProducto;
            },
            statusProducto(estado){
                this.estadoUsuario = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Registro agregado exitosamente');
                } else if(estado == 2){
                    this.estados.push('Registro actualizo exitosamente');
                } else if(estado == 3){
                    this.estados.push('Se han asignado los stock a las sucursales exitosamente');
                }

                if (this.estados.length) this.estadoUsuario = 1;

                return this.estadoUsuario;
            },
            cerrarModal(){
                this.modal = 0;
                this.tituloModal = '';
                this.nombre = '';
                this.codigo = '',
                this.precio_costo = 0,
                this.precio_normal = 0,
                this.precio_mayorista = 0,
                this.stock = 0,
                this.stock_critico = 0,
                this.cantidad_mayorista = 0,
                this.producto_id = 0,
                this.sub_categoria_id = 0,
                this.tipoAccion = 0;
                this.errorProducto = 0;
            },
            cerrarModalStock(){
                this.modal_stock = 0;
                this.errorStock = 0;
                this.stock_producto = 0;
                this.stock_producto_fijo = 0;
                this.errorStockProducto = 0;
                this.producto_id = 0;
                this.stock_sucursal = [];
            },
            abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "producto":
                    {
                        switch(accion){
                            case 'registrar':
                            { 
                                this.modal = 1;
                                this.tituloModal = 'Registrar Producto';
                                this.listarSubCategorias();
                                this.nombre = '';
                                this.codigo = '';
                                this.precio_costo = 0;
                                this.precio_normal = 0;
                                this.precio_mayorista = 0;
                                this.stock = 0;
                                this.stock_critico = 0;
                                this.cantidad_mayorista = 0;
                                this.producto_id = 0;
                                this.sub_categoria_id = 0;
                                this.tipoAccion = 1;
                                break;
                            }
                            case 'actualizar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Actualizar Producto';
                                this.listarSubCategorias();
                                this.tipoAccion = 2;
                                this.nombre = data['nombre'];
                                this.codigo = data['codigo'];
                                this.precio_costo = data['precio_costo'];
                                this.precio_normal = data['precio_normal'];
                                this.precio_mayorista = data['precio_mayorista'];
                                this.stock = data['stock'];
                                this.stock_critico = data['stock_critico'];
                                this.cantidad_mayorista = data['cantidad_mayorista'];
                                this.producto_id = data['id'];
                                this.sub_categoria_id = data['sub_categoria_id'];
                                break;
                            }
                        }
                    }
                }
            },
            abrirModalSucursalStock(data = []){
                this.modal_stock = 1;
                this.producto_id = data['id'];
                this.stock_producto = data['stock'];
                this.stock_producto_fijo = 0;
                
                this.errorStockProducto = 0;

                this.listarStockProducto();
            }
        },
        mounted() {
            this.listarProductos();
        }
    }
</script>

<style>    
    .modal-content{
        width: 100% !important;
        position: absolute !important;
    }
    .mostrar{
        display: list-item !important;
        opacity: 1 !important;
        position: fixed !important;
        background-color: #000000b3 !important;
    }

    .table td{
        padding: 0.30rem;
    }

    .table th{
        padding: 0.50rem;
    }
</style>
