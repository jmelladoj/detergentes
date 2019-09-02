<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Ingreso de Stock Manual</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Ingreso de Stock Manual</li>
                            <button type="button" v-b-tooltip.hover title="Ingresar stock manual al sistema" @click="ingresarStock()" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Ingresar Stock</button>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="errores.length > 0" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="(error, index) in errores" :key="index" v-text="error"></li>
                                </div>
                            </div>
                            <br>
                            <form id="formulario_venta" name="formulario_venta" class="form">
                                <div class="form-group row">
                                    <label for="" class="col-md-3 col-form-label">SELECCIÓN DE PRODUCTO</label>
                                    <div class="col-md-9">
                                        <vue-bootstrap-typeahead
                                            ref="typeahead"
                                            :data="productos"
                                            v-model="producto_nombre"
                                            :serializer="p => p.nombre"
                                            placeholder="Buscar ..."
                                            @hit="productoSeleccionado()"
                                        />
                                    </div>
                                </div>

                                <div v-show="detalle_stock.length > 0" class="form-group row">
                                    <div class="table-responsive m-t-20">
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr align="center">
                                                    <th>#</th>
                                                    <th>SUCURSAL</th>
                                                    <th>STOCK A AGREGAR</th>
                                                </tr>
                                            </thead>
                                            <tbody>         
                                                <tr v-for="(item, index) in detalle_stock" :key="index" :id="index">
                                                    <td align="center">{{ index + 1 }}</td>
                                                    <td align="left"><label class="label-control" v-text="detalle_stock[index].sucursal_nombre"></label></td>
                                                    <td><input type="number" class="form-control" v-model="detalle_stock[index].stock" min="1" /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="form-group row">
                                <div class="table-responsive m-t-20">
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr align="center">
                                                <th>#</th>
                                                <th>REGISTRO</th>
                                            </tr>
                                        </thead>
                                        <tbody>         
                                            <tr v-for="(item, index) in logs" :key="index" :id="index">
                                                <td align="center">{{ index + 1 }}</td>
                                                <td align="left"><label class="label-control" v-text="item.mensaje"></label></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue2Filters from 'vue2-filters';
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

    Vue.use(Vue2Filters)
    Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)


    export default {
        data (){
            return {
                producto_nombre: '',
                producto_id: 0,
                detalle_stock: [],
                productos: [],
                sucursales : [],
                logs : [],
                errorStockManual : 0,
                errores : [],
            }
        },

        methods : {
            listarSucursales(){
                let me=this;
                var url= '/sucursales';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.sucursales = respuesta.sucursales;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarLogs(){
                let me=this;
                var url= '/logs';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.logs = respuesta.logs;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarProductos(){
                let me=this;
                var url= '/productos';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.productos = respuesta.productos;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            mostrarMensaje(tipo_alerta, mensaje){
                swal({
                    type: tipo_alerta,
                    title: mensaje,
                    showConfirmButton: true,
                    timer: 2000
                });
            },
            productoSeleccionado(){
                let me = this;

                this.limpiarFormulario();
                var producto = me.productos.find(function(p) {
                    return p.nombre == me.producto_nombre;
                });

                me.producto_id = producto.id;

                me.sucursales.forEach(function(s) { 
                    var item = new Object();

                    item['stock'] = 0;
                    item['sucursal_id'] = s.id;
                    item['sucursal_nombre'] = s.nombre;

                    me.detalle_stock.push(item);
                });

                
            },
            limpiarFormulario(){
                let me = this;
                me.detalle_stock = [];
                me.errores = [];
                me.producto_id = 0;
            },
            ingresarStock(){
                let me = this;

                if(me.validarRegistroStockManual()){
                    return;
                }

               swal({
                title: '¿Esta seguro de ingresar el stock al producto?',
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


                    axios.post('/producto/ingreso/stock',{
                        'producto_id': me.producto_id,
                        'detalle_stock' : JSON.stringify(me.detalle_stock)
                    }).then(function (response) {
                        me.mostrarMensaje('success', 'Stock ingresado correctamente');
                        me.producto_nombre = "";
                        me.$refs.typeahead.inputValue = "";
                        me.limpiarFormulario();

                        me.listarLogs();
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else if (
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    
                }
                }) 
            },
            validarRegistroStockManual(){
                let me = this;

                me.errorStockManual = 0;
                me.errores = [];

                if(me.producto_id == 0){
                    me.errores.push("Se debe de seleccionar un producto para agregar stock.");
                }

                me.detalle_stock.forEach(function(item) {
                    if(item.stock < 1 ){
                        me.errores.push("La cantidad miníma de un producto es de 1.");
                    }
                });

                if (me.errores.length) me.errorStockManual = 1;

                return me.errorStockManual;
            },
        },
        mounted() {
            this.listarProductos();
            this.listarSucursales();
            this.listarLogs();
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
