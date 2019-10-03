<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Venta Premium</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Venta Premium</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="errorVenta" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="(error, index) in errores" :key="index" v-text="error"></li>
                                </div>
                            </div>
                            <br>
                            <form id="formulario_venta" name="formulario_venta" class="form">
                                <div class="form-group row">
                                    <label for="" class="col-md-2 col-form-label">RUT CLIENTE</label>
                                    <div class="col-md-10">
                                        <vue-bootstrap-typeahead
                                            ref="typeahead"
                                            :data="clientes"
                                            :serializer="c => c.run + ' - ' + c.nombre"
                                            placeholder="Buscar ..."
                                            @hit="clienteSeleccionado($event)"
                                        />
                                    </div>
                                </div>

                                <div v-show="cliente_id" class="form-group row">
                                    <label for="" class="col-md-2 col-form-label">FECHA</label>
                                    <div class="col-md-4">
                                        <input type="date" v-model="fecha" class="form-control" readonly>
                                    </div>
                                    
                                    <label for="" class="col-md-2 col-form-label">SUCURSAL</label>
                                    <div class="col-md-4">
                                        <select class="form-control" v-model="sucursal_id" @change="actualizarSucursal()">
                                            <option v-for="sucursal in sucursales" :key="sucursal.id" :value="sucursal.id" v-text="sucursal.nombre"></option>
                                        </select>
                                    </div>
                                </div>

                                <div v-show="cliente_id" class="form-group row">
                                    <label for="" class="col-md-2 col-form-label">ITEM</label>
                                    <div class="col-md-10">
                                        <vue-bootstrap-typeahead
                                            ref="typeahead"
                                            :data="productos"
                                            v-model="producto_nombre"
                                            :serializer="p => p.nombre"
                                            placeholder="Buscar ..."
                                            @hit="productoSeleccionado($event)"
                                        />
                                    </div>
                                </div>

                                <div v-show="detalle_venta.length > 0" class="form-group row">
                                    <div class="table-responsive m-t-20">
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr align="center">
                                                    <th>#</th>
                                                    <th>PRODUCTO</th>
                                                    <th>CANTIDAD</th>
                                                    <th>VALOR</th>
                                                    <th>BORRAR</th>
                                                </tr>
                                            </thead>
                                            <tbody>         
                                                <tr v-for="(item, index) in detalle_venta" :key="index" :id="index">
                                                    <td align="center">{{ index + 1 }}</td>
                                                    <td align="left"><label class="label-control" v-text="item.producto_nombre"></label></td>
                                                    <td><input type="number" class="form-control" v-model="detalle_venta[index].cantidad" min="1" @change="cambiarValorProducto(index, detalle_venta[index].lista);limitarStock(index);"/></td>
                                                    <td><input type="number" class="form-control" :value="detalle_venta[index].producto_valor" readonly/></td>
                                                    <td align="center"><button type="button" class="btn btn-circle btn-danger btn-sm" data-toggle="tooltip" title="Eliminar item" @click="eliminarFila(index)" ><i class="fa fa-remove" ></i></button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div v-show="detalle_venta.length > 0" class="form-group row">
                                    <label for="" class="col-md-2 col-form-label">SUBTOTAL</label>
                                    <div class="col-md-2">
                                        <input type="number" v-model="subtotal" class="form-control" readonly>
                                    </div>
                                    
                                    <label for="" class="col-md-2 col-form-label">% DESCUENTO</label>
                                    <div class="col-md-2">
                                        <input type="number" v-model="descuento" class="form-control" min="0" max="100">
                                    </div>

                                    <label for="" class="col-md-2 col-form-label">TOTAL</label>
                                    <div class="col-md-2">
                                        <input type="number" v-model="total" class="form-control" readonly>
                                    </div>
                                </div>

                                <div v-show="detalle_venta.length > 0" class="form-group row">
                                    <div class="table-responsive m-t-20">
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr align="center">
                                                    <th>#</th>
                                                    <th>A PAGAR</th>
                                                    <th>MONTO PAGO</th>
                                                    <th>MEDIO PAGO</th>
                                                    <th>NUM BOLETA / VOUCHER</th>  
                                                </tr>
                                            </thead>
                                            <tbody>         
                                                <tr v-for="(item, index) in detalle_pago" :key="index" :id="index">
                                                    <td align="center">{{ index + 1 }}</td>
                                                    <td><input type="number" class="form-control" v-model="detalle_pago[index].a_pagar" readonly/></td>
                                                    <td><input type="number" class="form-control" v-model="detalle_pago[index].monto_pago" @change="verificarPago(index)"/></td>
                                                    <td>
                                                        <select class="form-control" v-model="detalle_pago[index].medio_pago">
                                                            <option value="0">SELECCIONA UN MEDIO DE PAGO ...</option>
                                                            <option value="1">EFECTIVO</option>
                                                            <option value="2">TARJETA CRÉDITO</option>
                                                            <option value="3">TARJETA DÉBITO</option>
                                                            <option value="4">CHEQUE</option>
                                                            <option value="5">TRANSFERENCIA ELECTRÓNICA</option>
                                                        </select>
                                                    </td>
                                                    <td><input type="number" class="form-control" v-model="detalle_pago[index].numero_documento"/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div v-show="detalle_venta.length > 0" class="form-group row">
                                    <label for="" class="col-md-2 col-form-label">Observación de Venta</label>
                                    <textarea class="form-control col-md-10" v-model="observacion"></textarea>
                                </div>

                                <div v-show="detalle_venta.length > 0" class="form-group row m-b-40">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-success btn-block" @click="registrarVenta()">Finalizar Venta</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue2Filters from 'vue2-filters';
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
    import VueBarcodeScanner from 'vue-barcode-scanner';

    Vue.use(Vue2Filters);
    Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead);
    Vue.use(VueBarcodeScanner);
    


    export default {
        name: 'VueBarcodeTest',
        props: [
            'usuario'
        ],
        data (){
            return {
                fecha: 0,
                producto_nombre: '',
                cliente_id: '',
                sucursal_id : 0,
                subtotal : 0,
                descuento : 0,
                total : 0,
                observacion: '',
                productos: [],
                sucursales : [],
                clientes :[],
                lista : [],
                detalle_venta : [],
                detalle_pago : [],
                stock_sucursales : [],
                errorVenta : 0,
                errores : []
            }
        },
        watch: {
            detalle_venta: {
                handler: function () {
                    this.obtenerTotales();
                },
                deep: true
            },
            descuento: function (val) {
                this.obtenerTotales();
            }
        },
        created () {
            this.$barcodeScanner.init(this.onBarcodeScanned)
        },
        destroyed () {
            this.$barcodeScanner.destroy()
        },
        methods : {
            onBarcodeScanned (barcode) {
                let me = this;

                var producto = me.productos.find(function(p) {
                    return p.codigo == barcode;
                });

                var p = me.detalle_venta.find(function(d) {
                    return d.producto_id == producto.id;
                });

                if(p){
                    me.limitarStock(me.detalle_venta.indexOf(p));
                    p.cantidad += 1;
                } else {
                    var item = new Object();

                    item['producto_id'] = producto.id;
                    item['producto_nombre'] = producto.nombre;
                    item['cantidad'] = 1;
                    item['producto_valor'] = producto.precio_normal;
                    item['producto_valor_normal'] = producto.precio_normal;
                    item['producto_valor_mayorista'] = producto.precio_mayorista;
                    item['cantidad_mayorista'] = producto.cantidad_mayorista;
                    

                    me.detalle_venta.push(item);
                }
            },
            resetBarcode () {
                let barcode = this.$barcodeScanner.getPreviousCode()
            },
            mostrarMensaje(tipo_alerta, mensaje){
                swal({
                    type: tipo_alerta,
                    title: mensaje,
                    showConfirmButton: true,
                    timer: 2000
                });
            },
            actualizarSucursal(){
                let me = this;

                me.detalle_venta.forEach(function(item) {
                    item.cantidad = 0;    
                });

                me.errorStock = 0
                me.erroresStock = [];

                me.producto_nombre = "";
                this.$refs.typeahead.inputValue = "";

            },
            cambiarValorProducto(index, estado){
                let me = this;

                if(estado == 0){
                    me.detalle_venta[index].producto_valor = parseInt(me.detalle_venta[index].cantidad)  >= parseInt(me.detalle_venta[index].cantidad_mayorista) ? me.detalle_venta[index].producto_valor_mayorista : me.detalle_venta[index].producto_valor_normal;
                }
                
                me.obtenerTotales();

            },
            limitarStock(index){
                let me = this;

                var stock_sucursal = me.stock_sucursales.find(function(s) {
                    return s.producto_id == me.detalle_venta[index].producto_id && s.sucursal_id == me.sucursal_id;
                });
                
                if(parseInt(me.detalle_venta[index].cantidad) > parseInt(stock_sucursal.stock)){
                    this.mostrarMensaje('warning', 'Stock superado, solo se pueden vender ' +  stock_sucursal.stock + ' productos.');
                    me.detalle_venta[index].cantidad = stock_sucursal.stock;
                }
            },
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
            listarClientes(){
                let me=this;
                var url= '/clientes';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.clientes = respuesta.clientes;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarListaCliente(id){
                let me=this;
                var url= '/clientes/' + id + '/lista';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.lista = respuesta.lista;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarStockSucursales(){
                let me=this;
                var url= '/stockSucursal';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.stock_sucursales = respuesta.stocks;
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
            clienteSeleccionado(e){
                this.cliente_id = e.id;
                this.listarListaCliente(this.cliente_id);
            },
            productoSeleccionado(e){
                let me = this;

                var p = me.detalle_venta.find(function(d) {
                    return d.producto_id == e.id;
                });

                var l = me.lista.find(function(l) {
                    return l.producto_id == e.id;
                });
                
                if(p){
                    this.mostrarMensaje('warning', 'El producto ya esta en la lista.');
                    this.producto_nombre = "";
                    this.$refs.typeahead.inputValue = "";
                    return false;
                }

                var item = new Object();

                item['producto_id'] = e.id;
                item['producto_nombre'] = e.nombre;
                item['cantidad'] = 1;

                if(l){
                    item['lista'] = 1;
                    item['producto_valor'] = l.precio_normal;
                } else {
                    item['lista'] = 0;
                    item['producto_valor'] = e.precio_normal;
                }
                
                item['producto_valor_normal'] = e.precio_normal;
                item['producto_valor_mayorista'] = e.precio_mayorista;
                item['cantidad_mayorista'] = e.cantidad_mayorista;

                me.detalle_venta.push(item);

                me.producto_nombre = "";
                this.$refs.typeahead.inputValue = "";
            },
            obtenerTotales(){
                let me = this;

                var subtotal = 0;

                me.detalle_venta.forEach(function(item) {
                    subtotal += item.cantidad * item.producto_valor;
                });

                me.subtotal = subtotal;
                me.total = parseInt(subtotal * (1 - (me.descuento / 100)));
                me.detalle_pago[0].a_pagar = me.total;
            },
            agregarMedioPago(monto = 0){
                let me = this;

                var item = new Object();

                item['a_pagar'] = monto;
                item['monto_pago'] = 0;
                item['medio_pago'] = 0;
                item['numero_documento'] = "";

                me.detalle_pago.push(item);
            },
            verificarPago(indice){
                let me = this;

                me.detalle_pago.forEach(function(item, index) {
                    if(item.a_pagar == item.monto_pago){
                        me.detalle_pago.splice((index + 1), me.detalle_pago.length);
                    }
                });

                if(me.detalle_pago[indice].monto_pago < me.detalle_pago[indice].a_pagar){
                    me.agregarMedioPago(me.detalle_pago[indice].a_pagar - me.detalle_pago[indice].monto_pago);                    
                }
            },
            eliminarFila(index){
                this.detalle_venta.splice(index, 1);
            },
            obtenerFechaActual(){
                let me = this;

                var fecha = new Date();
                var mes = fecha.getMonth()+1;
                var dia = fecha.getDate();
                var ano = fecha.getFullYear();

                if(dia<10){
                    dia='0'+dia;
                }
                
                if(mes<10){
                    mes='0'+mes;
                }

                me.fecha = ano + "-" + mes + "-" + dia;
            },
            limpiarFormulario(){
                let me = this;

                me.producto_nombre = '';;
                me.subtotal = 0;
                me.descuento = 0;
                me.total = 0;
                me.detalle_venta = [];
                me.detalle_pago = [];
                me.errorVenta = 0;
                me.observacion = "";
                me.errores = [];
                me.agregarMedioPago();
            },
            registrarVenta(){
                
                if(this.validarVenta() || this.errorStock == 1){
                    return;
                }

               swal({
                title: '¿Esta seguro de realizar la venta?',
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

                    axios.post('/venta/registrar',{
                        'sucursal_id' : me.sucursal_id,
                        'subtotal' : me.subtotal,
                        'descuento' : me.descuento,
                        'total' : me.total,
                        'detalle_venta' : me.detalle_venta,
                        'detalle_pago' : me.detalle_pago,
                        'observacion' : me.observacion
                    }).then(function (response) {
                        swal(
                        'Venta realizada!',
                        'El registro ha sido ingreso con éxito.',
                        'success'
                        )
                        me.limpiarFormulario();
                    }).catch(function (error) {
                        console.log(error.response.data);
                    });
                } else if (
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    
                }
                }) 
            },
            validarVenta(){
                let me = this;

                me.errorVenta = 0;
                me.errores = [];

                if (me.descuento < 0 || me.descuento > 100) me.errores.push("El descuento debe de estar en el rango de 0 a 100.");
                
                me.detalle_venta.forEach(function(item) {
                    if(item.cantidad < 1 ){
                        me.errores.push("La cantidad miníma de un producto es de 1.");
                        return false;
                    }
                });

                me.detalle_pago.forEach(function(item) {
                    if(item.monto_pago < 1){
                        me.errores.push("El monto minímo aceptado es de 1 peso.");
                        return false;
                    }
                });

                me.detalle_pago.forEach(function(item) {
                    if(item.medio_pago < 1){
                        me.errores.push("Se debe de seleccionar un medio de pago.");
                        return false;
                    }
                });

                me.detalle_pago.forEach(function(item) {
                    if(item.numero_documento < 1){
                        me.errores.push("Se debe de indicar el número de la boleta o el voucher.");
                        return false;
                    }
                });
                
                if (me.errores.length) me.errorVenta = 1;

                return me.errorVenta;
            },
        },
        mounted() {
            this.listarProductos();
            this.listarSucursales();
            this.listarStockSucursales();
            this.listarClientes();
            this.obtenerFechaActual();
            this.agregarMedioPago();
            this.sucursal_id = this.usuario.sucursal_id;
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
