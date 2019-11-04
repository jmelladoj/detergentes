<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Ordenes de Compra</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Ordenes de Compra</li>
                        </ol>
                        <button type="button" v-b-tooltip.hover title="Agregar ordenes de compra al sistema" @click="abrirModal('ordenCompra','registrar')" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Crear Orden de Compra</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="estadoOrdenDeCompra" class="form-group row alert alert-success">
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
                                            :items="cotizaciones"
                                            :fields="fields"
                                            :current-page="currentPage"
                                            :per-page="perPage"
                                            :filter="filter"
                                            :sort-by.sync="sortBy"
                                            :sort-desc.sync="sortDesc"
                                            :sort-direction="sortDirection"
                                            @filtered="onFiltered"
                                            >

                                            <template slot="total" slot-scope="row">
                                               $ {{ row.item.total.toLocaleString() }}
                                            </template>

                                            <template slot="empresa_nombre" slot-scope="row">
                                                {{ row.item.empresa.nombre }}
                                            </template>

                                            <template slot="encargado_nombre" slot-scope="row">
                                                {{ row.item.encargado.name }}
                                            </template>

                                            <template slot="acciones" slot-scope="row">
                                                <b-button size="xs" v-b-tooltip.hover title="Ver detalle de Orden de Compra" @click="abrirModal('ordenCompra','revisar',row.item)" class="btn btn-info">
                                                    <i class="fa fa-list"></i>
                                                </b-button>

                                                <b-button size="xs" v-b-tooltip.hover title="Descargar Orden de Compra como pdf" @click="descargar(row.item.id)" class="btn btn-warning">
                                                    <i class="fa fa-file-pdf-o"></i>
                                                </b-button>

                                                <b-button size="xs" v-b-tooltip.hover title="Enviar Orden de Compra al cliente" @click="enviar(row.item.id)" class="btn btn-success">
                                                    <i class="fa fa-envelope"></i>
                                                </b-button>

                                                <b-button v-if="row.item.deleted_at" size="xs" v-b-tooltip.hover title="Restaurar Orden de Compra" @click="resturar(row.item.id)" class="btn btn-warning">
                                                    <i class="fa fa-undo"></i>
                                                </b-button>

                                                <b-button v-else size="xs" v-b-tooltip.hover title="Anular Orden de Compra" @click="anular(row.item.id)"  class="btn btn-danger">
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
                            <div v-show="errorCotizacion" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form v-if="tipoAccion == 1" class="form" id="formulario_cotizacion">
                                <div class="row">
                                    <div class="col-md-12 text-center text-info">
                                        <h5>DATOS DE EMPRESA</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">Nombre Empresa</label>
                                            <div class="col-md-10">
                                                <vue-bootstrap-typeahead
                                                    :data="empresas"
                                                    v-model="nombre"
                                                    :serializer="s => s.nombre"
                                                    placeholder="Buscar ..."
                                                    @hit="empresaSeleccionada()"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">Rut Empresa</label>
                                            <div class="col-md-10">
                                                <input type="text" class="form-control" v-rut v-model="rut">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">Giro</label>
                                            <div class="col-md-10">
                                                <input type="text" class="form-control" v-model="giro">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">Teléfono</label>
                                            <div class="col-md-10">
                                                <input type="number" class="form-control" v-model="telefono">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">Dirección</label>
                                            <div class="col-md-10">
                                                <input type="text" class="form-control" v-model="direccion">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">Comuna</label>
                                            <div class="col-md-10">
                                                <input type="text" class="form-control" v-model="comuna">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-1">Correo</label>
                                            <div class="col-md-11">
                                                <input type="email" class="form-control" v-model="correo">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-t-20">
                                    <div class="col-md-12 text-center text-info">
                                        <h5>DETALLE ORDEN DE COMPRA</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <table id="cotizaciones" name="cotizaciones" class="table table-bordered table-striped">
                                                <thead>
                                                    <tr align="center">
                                                        <th class="col-4">PRODUCTO</th>
                                                        <th class="col-2">CANTIDAD</th>
                                                        <th class="col-2">UNIDAD</th>
                                                        <th class="col-2">VALOR</th>
                                                        <th class="col-2">ACCIÓN</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in detalle" :key="index" :id="index">
                                                        <td>
                                                            <input type="text" class="form-control" v-model="detalle[index]"> 
                                                        </td>
                                                        <td>
                                                            <input type="number" class="form-control" v-model="cantidad[index]" @blur="obtenerTotales()">
                                                        </td>
                                                        <td>
                                                            <input type="text" class="form-control" v-model="unidad[index]">
                                                        </td>
                                                        <td>
                                                            <input type="number" class="form-control" v-model="valor[index]" @blur="obtenerTotales()">
                                                        </td>
                                                        <td class="text-center">
                                                            <button type="button" class="btn btn-circle btn-success btn-sm" data-toggle="tooltip" title="Agregar fila" @click="agregarFila()" ><i class="fa fa-plus" ></i></button>
                                                            <button v-if="index > 0" type="button" class="btn btn-circle btn-danger btn-sm" data-toggle="tooltip" title="Agregar fila" @click="eliminarFila(index)" ><i class="fa fa-remove" ></i></button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">Total NETO</label>
                                            <div class="col-md-10">
                                                <input type="number" class="form-control" v-model="neto" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">IVA</label>
                                            <div class="col-md-10">
                                                <input type="number" class="form-control" v-model="iva" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">TOTAL</label>
                                            <div class="col-md-10">
                                                <input type="number" class="form-control" v-model="total" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group row">
                                            <div class="col-md-12">
                                                <textarea class="form-control" rows="5" v-model="observacion" placeholder="Ingresa aquí las observaciones ...."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form v-if="tipoAccion == 2" class="form" id="formulario_cotizacion">
                                <div class="row m-t-20">
                                    <div class="col-md-12 text-center text-info">
                                        <h5>DETALLE COTIZACIÓN</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <table id="cotizaciones" name="cotizaciones" class="table table-bordered table-striped">
                                                <thead>
                                                    <tr align="center">
                                                        <th>PRODUCTO</th>
                                                        <th>CANTIDAD</th>
                                                        <th>UNIDAD</th>
                                                        <th>VALOR</th>
                                                        <th>ACCIÓN</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in detalle_documento" :key="index" :id="index">
                                                        <td>
                                                            <input type="text" class="form-control" :value="item.producto" readonly> 
                                                        </td>
                                                        <td>
                                                            <input type="number" class="form-control" :value="item.cantidad" readonly> 
                                                        </td>
                                                        <td>
                                                            <input type="text" class="form-control" :value="item.unidad" readonly> 
                                                        </td>
                                                        <td>
                                                            <input type="number" class="form-control" :value="item.valor" readonly> 
                                                        </td>
                                                        <td align="center">
                                                            <b-button v-if="item.confirmado" variant="danger" v-b-tooltip.hover title="Anular producto" @click="confirmarStock(item.id, 2)" class="btn-circle">
                                                                <i class="fa fa-times"></i>
                                                            </b-button>

                                                            <b-button v-else variant="success" v-b-tooltip.hover title="Confirmar producto" @click="confirmarStock(item.id, 1)" class="btn-circle">
                                                                <i class="icon-check"></i>
                                                            </b-button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">Total NETO</label>
                                            <div class="col-md-10">
                                                <input type="number" class="form-control" v-model="neto" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">IVA</label>
                                            <div class="col-md-10">
                                                <input type="number" class="form-control" v-model="iva" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group row">
                                            <label class="control-label text-left col-md-2">TOTAL</label>
                                            <div class="col-md-10">
                                                <input type="number" class="form-control" v-model="total" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion == 1" class="btn btn-primary" @click="registrarOrdenCompra()">Guardar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </div>
</template>

<script>
    import Vue2Filters from 'vue2-filters'
    import BootstrapVue from 'bootstrap-vue'
    import { rutInputDirective } from 'vue-dni';
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

    Vue.directive('rut', rutInputDirective);
    Vue.use(BootstrapVue)
    Vue.use(Vue2Filters)
    Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

    const items = [
        { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } }
    ]

    export default {
        data (){
            return {
                documento_id: 0,
                producto_id: 0,
                nombre: '',
                rut: '',
                giro: '',
                telefono: 0,
                direccion: '',
                comuna: '',
                correo: '',
                observacion: '',
                detalle_documento: [],
                cotizaciones: [],
                empresas: [],
                productos: [],
                detalle: [],
                cantidad: [],
                unidad: [],
                valor: [],
                neto: 0,
                iva: 0,
                total: 0,
                modal: 0,
                tituloModal: '',
                tipoAccion: 0,
                estadoOrdenDeCompra: 0,
                estados: [],
                errorCotizacion: 0,
                errores: [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'empresa_nombre', label: 'EMPRESA', sortable: true, class: 'text-center' },
                    { key: 'total', label: 'TOTAL', sortable: true, class: 'text-center' },
                    { key: 'encargado_nombre', label: 'ENCARGADO', sortable: true, class: 'text-center' },
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
        computed:{
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
            }
        },
        methods : {
            empresaSeleccionada(){
                let me = this;

                var empresa = me.empresas.find(function(e) {
                    return e.nombre == me.nombre;
                });

                me.rut = empresa.rut;
                me.giro = empresa.giro;
                me.telefono = empresa.telefono;
                me.direccion = empresa.direccion;
                me.comuna = empresa.comuna;
                me.correo = empresa.correo;
            },
            obtenerTotales(){
                let me = this;

                var total_cotizacion = 0;

                for (var i = 0; i < me.cantidad.length; i++) {
                    total_cotizacion += me.cantidad[i] * me.valor[i];
                }

                me.neto = total_cotizacion;
                me.iva = parseInt(total_cotizacion * 0.19);
                me.total = me.neto + me.iva;
            },
            agregarFila(){
                this.detalle.push('');
                this.cantidad.push(0);
                this.unidad.push('');
                this.valor.push(0);
            },
            eliminarFila(index){
                this.detalle.splice(index, 1);
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            listarEmpresas(){
                let me=this;
                var url= '/empresas';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.empresas = respuesta.empresas;
                    me.totalRows = me.empresas.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarOrdenesCompra(){
                let me=this;
                var url= '/documentos/2';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.cotizaciones = respuesta.documentos;
                    me.totalRows = me.cotizaciones.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            listarDetalle(id){
                let me=this;
                var url= '/documentos/' + id + '/ver';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.detalle_documento = respuesta.detalle_documento;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            registrarOrdenCompra(){
                if (this.validarCotizacion()){
                    return;
                }
                
                let me = this;

                axios.post('/documento/registrar',{
                    'rut': this.rut,
                    'nombre': this.nombre,
                    'direccion': this.direccion,
                    'giro': this.giro,
                    'telefono': this.telefono,
                    'comuna': this.comuna,
                    'correo': this.correo,
                    'tipo': 2,
                    'detalle': this.detalle, 
                    'cantidad': this.cantidad,
                    'unidad': this.unidad,
                    'valor': this.valor,
                    'neto': this.neto,
                    'total': this.total,
                    'detalle': this.detalle,
                    'cantidad': this.cantidad,
                    'unidad': this.unidad,
                    'valor': this.valor,
                    'observacion': this.observacion
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarOrdenesCompra();
                    me.statusCotizacion(1);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            anular(id){
               swal({
                title: '¿Esta seguro de anular este documento?',
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

                    axios.post('/documento/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarOrdenesCompra();
                        swal(
                        'Documento anulado!',
                        'El registro ha sido anulado con éxito.',
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
            resturar(id){
               swal({
                title: '¿Esta seguro de restaurar este documento?',
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

                    axios.post('/documento/restaurar',{
                        'id': id
                    }).then(function (response) {
                        me.listarOrdenesCompra();
                        swal(
                        'Documento restaurado!',
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
            descargar(id){
               swal({
                title: '¿Esta seguro de descargar este documento?',
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

                    axios.get('/documento/ordenCompra/'+id+'/descargar', {responseType: 'blob'}).then(function (response) {                       
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'OrdenDeCompra.pdf'); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                    }).catch(function (error) {
                        console.log(error.response.data);
                    });
                } else if (
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    
                }
                }) 
            },
            enviar(id){
               swal({
                title: '¿Esta seguro de enviar este documento?',
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

                    axios.get('/documento/ordenCompra/'+id+'/enviar').then(function (response) {
                        me.listarOrdenesCompra();
                        swal(
                        'Documento enviado!',
                        'El registro ha sido enviado con éxito.',
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
            confirmarStock(id, accion){
               swal({
                title: accion == 2 ? '¿Esta seguro de anular el stock?' : '¿Esta seguro de confirmar el stock?',
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

                    var mensaje_uno = accion == 2 ? 'Stock anulado' : 'Stock confirmado';
                    var mensaje_dos = accion == 2 ? 'Se ha quitado el stock del inventario' : 'Se ha añadido el stock al inventario';

                    axios.post('/documento/confirmar',{
                        'id': id,
                        'accion': accion
                    }).then(function (response) {
                        me.listarDetalle(me.documento_id);
                        swal(
                        mensaje_uno, mensaje_dos,
                        'success'
                        );
                    }).catch(function (error) {
                        console.log(error.response.data);
                    });
                } else if (
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    
                }
                }) 
            },
            validarCotizacion(){
                this.errorCotizacion=0;
                this.errores =[];

                if (!this.rut) this.errores.push("El rut de empresa en la ordenCompra no puede estar vacío.");
                if (!this.nombre) this.errores.push("El nombre de la empresa en lacotizacion no puede estar vacío.");
                if (!this.direccion) this.errores.push("La dirección de la empresa en la ordenCompra no puede estar vacío.");
                if (!this.giro) this.errores.push("El giro de la empresa en lac otizacion no puede estar vacío.");
                if (this.telefono < 1) this.errores.push("El teléfono de la empresa en la ordenCompra no puede estar vacío.");
                if (!this.comuna) this.errores.push("La comuna de la empresa en la ordenCompra no puede estar vacío.");
                if (!this.correo) this.errores.push("El correo de la empresa en lac otizacion no puede estar vacío.");
                
                if (this.errores.length) this.errorCotizacion = 1;

                return this.errorCotizacion;
            },
            statusCotizacion(estado){
                this.estadoOrdenDeCompra = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Registro agregado exitosamente');
                } else if(estado == 2){
                    this.estados.push('Registro actualizo exitosamente');
                }

                if (this.estados.length) this.estadoOrdenDeCompra = 1;

                return this.estadoOrdenDeCompra;
            },
            limpiarFormulario(){
                this.nombre = '';
                this.rut = '';
                this.giro = '';
                this.telefono = '';
                this.direccion = '';
                this.comuna = '';
                this.correo = '';
                this.errorCotizacion = 0;
                this.detalle = [];
                this.cantidad = [];
                this.unidad = [];
                this.valor = [];
                this.detalle_documento = [];
                this.observacion = '';
                this.documento_id = 0;
            },
            cerrarModal(){
                this.modal = 0;
                this.tituloModal = '';
                this.tipoAccion = 0;
                this.limpiarFormulario();
            },
            abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "ordenCompra":
                    {
                        switch(accion){
                            case 'registrar':
                            { 
                                this.modal = 1;
                                this.tituloModal = 'Registrar Orden de Compra ' + (this.cotizaciones.length + 1);;
                                this.tipoAccion = 1;
                                this.limpiarFormulario();
                                this.agregarFila();
                                break;
                            }
                            case 'revisar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Detalle Orden de Compra ' + data['id'];
                                this.tipoAccion = 2;
                                this.listarDetalle(data['id']);
                                this.neto = data['subtotal'];
                                this.iva = data['total'] - data['subtotal'];
                                this.total = data['total'];

                                this.documento_id = data['id'];
                                break;
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            this.listarOrdenesCompra();
            this.listarEmpresas();
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
        overflow-y: auto;
    }

    .modal-lg{
        max-width: 90%;
        max-height: 90%;
    }

    .table td{
        padding: 0.30rem;
    }

    .table th{
        padding: 0.50rem;
    }
</style>
