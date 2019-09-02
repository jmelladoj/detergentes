<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Clientes</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Clientes</li>
                        </ol>
                        <button type="button" v-b-tooltip.hover title="Agregar clientes al sistema" @click="abrirModal('cliente','registrar')" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Crear Cliente</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="estadoCliente" class="form-group row alert alert-success">
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
                                            :items="clientes"
                                            :fields="fields"
                                            :current-page="currentPage"
                                            :per-page="perPage"
                                            :filter="filter"
                                            :sort-by.sync="sortBy"
                                            :sort-desc.sync="sortDesc"
                                            :sort-direction="sortDirection"
                                            @filtered="onFiltered"
                                            >
                                            <template slot="acciones" slot-scope="row">
                                                <b-button size="xs" v-b-tooltip.hover title="Asignar productos a lista de cliente" @click="abrirModalLista(row.item)" class="btn btn-success">
                                                    <i class="fa fa-plus"></i>
                                                </b-button>

                                                <b-button size="xs" v-b-tooltip.hover title="Editar información de suscursal" @click="abrirModal('cliente','actualizar',row.item)" class="btn btn-warning">
                                                    <i class="icon-pencil"></i>
                                                </b-button>

                                                <b-button v-if="row.item.deleted_at" size="xs" v-b-tooltip.hover title="Restaurar cliente" @click="restaurarCliente(row.item.id)" class="btn btn-warning">
                                                    <i class="fa fa-undo"></i>
                                                </b-button>

                                                <b-button v-else size="xs" v-b-tooltip.hover title="Eliminar cliente" @click="eliminarCliente(row.item.id)" class="btn btn-danger">
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
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myLargeModalLabel" v-text="tituloModal"></h4>
                        <button type="button" class="close" @click="cerrarModal()" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-body">
                            <div v-show="errorCliente" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form m-t-20">
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <div class="form-group m-b-20">
                                            <label>Run</label>
                                            <input type="text" class="form-control" v-model="run" v-rut>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <div class="form-group m-b-20">
                                            <label>Nombre</label>
                                            <input type="text" class="form-control" v-model="nombre">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <div class="form-group m-b-20">
                                            <label>Dirección</label>
                                            <input type="text" class="form-control" v-model="direccion">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <div class="form-group m-b-20">
                                            <label>Teléfono</label>
                                            <input type="number" class="form-control" v-model="telefono">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarCliente()">Guardar</button>
                        <button type="button" v-if="tipoAccion==2" class="btn btn-primary" @click="actualizarCliente()">Actualizar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <div class="modal fade bs-example-modal-md" :class="{'mostrar' : modal_lista}" style="display: none;" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myLargeModalLabel" v-text="'Editar lista'"></h4>
                        <button type="button" class="close" @click="cerrarModalLista()" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-body">
                            <div v-show="estadoListaCliente" class="form-group row alert alert-success">
                                <div class="text-left">
                                    <li v-for="estado in estados" :key="estado" v-text="estado"></li>
                                </div>
                            </div>
                            <div v-show="errorLista" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form m-t-20">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <select class="form-control" v-model="producto_id">
                                                <option value="0">Seleccionar producto</option>
                                                <option v-for="producto in productos" :key="producto.id" :value="producto.id" v-text="producto.nombre"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <input type="number" class="form-control" v-model="precio_neto" placeholder="Valor Neto">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <input type="text" class="form-control" v-model="observacion" placeholder="Observación de producto">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <button type="button" v-b-tooltip.hover title="Ingresar subcategorias de la categorias al sistema" @click="registrarProductoLista()" class="btn btn-info btn-block"><i class="fa fa-plus-circle"></i> Agregar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-t-20">
                                    <div class="table-responsive">
                                        <table id="tablaGiftcards" class="table table-bordered table-striped">
                                            <thead>
                                                <tr align="center">
                                                    <th>#</th>
                                                    <th>Producto</th>
                                                    <th>Valor Neto</th>
                                                    <th>Neto + IVA</th>
                                                    <th>Observación</th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in listaCliente" :key="item.id" :value="item.id">
                                                    <td align="center" class="align-middle">{{ index + 1 }}</td>
                                                    <td class="align-left">{{ item.producto.nombre }}</td>
                                                    <td class="align-center">{{ item.precio_neto }}</td>
                                                    <td class="align-center">{{ item.precio_normal }}</td>
                                                    <td class="align-center">{{ item.observacion }}</td>
                                                    <td align="center">
                                                        <button type="button" v-b-tooltip.hover title="Eliminar SubCategoría" @click="eliminarProductoLista(item.id)" class="btn btn-danger btn-xs">
                                                            <i class="icon-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModalLista()">Cerrar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

    </div>
</template>

<script>
    import BootstrapVue from 'bootstrap-vue'
    import vueRut from 'vue-rut'

    Vue.use(vueRut);
    Vue.use(BootstrapVue)

    const items = []

    export default {
        data (){
            return {
                cliente_id: 0,
                producto_id: 0,
                precio_neto: 0,
                observacion: '',
                run : '',
                nombre : '',
                direccion : '',
                telefono : '',
                clientes : [],
                productos : [],
                listaCliente : [],
                modal : 0,
                modal_lista: 0,
                tituloModal : '',
                tipoAccion : 0,
                estadoCliente: 0,
                estadoListaCliente: 0,
                estados : [],
                errorCliente : 0,
                errorLista : 0,
                errores : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'run', label: 'RUN', sortable: true, class: 'text-left' },
                    { key: 'nombre', label: 'NOMBRE', sortable: true, class: 'text-left' },
                    { key: 'direccion', label: 'DIRECCIÓN', sortable: true, class: 'text-left' },
                    { key: 'telefono', label: 'TELÉFONO', sortable: true, class: 'text-center' },
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
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            listarProductos(){
                let me=this;
                var url= '/productos/activos';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.productos = respuesta.productos;
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
                    me.totalRows = me.clientes.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarListaCliente(){
                let me = this;

                axios.post('/productoLista/cliente',{
                    'cliente_id' : this.cliente_id
                }).then(function (response) {
                    var respuesta= response.data;
                    me.listaCliente = respuesta.listaCliente;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            registrarProductoLista(){
                if (this.validarProductoLista()){
                    return;
                }
                
                let me = this;

                axios.post('/productoLista/registrar',{
                    'cliente_id': this.cliente_id,
                    'producto_id': this.producto_id,
                    'precio_neto': this.precio_neto,
                    'precio_normal': parseInt(parseInt(this.precio_neto) * 1.19),
                    'observacion': this.observacion
                }).then(function (response) {
                    me.statusListaCliente(1);
                    me.listarListaCliente();
                    me.limpiarDatosModalLista();
                }).catch(function (error) {
                    console.log(error.response.data);
                });

            },
            registrarCliente(){
                if (this.validarCliente()){
                    return;
                }
                
                let me = this;

                axios.post('/cliente/registrar',{
                    'run': this.run,
                    'nombre': this.nombre,
                    'direccion': this.direccion,
                    'telefono': this.telefono
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarClientes();
                    me.statusCliente(1);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            actualizarCliente(){
                this.errores =[];

                if (this.validarCliente()){
                    return;
                }
                
                let me = this;

                axios.post('/cliente/actualizar',{
                    'run': this.run,
                    'nombre': this.nombre,
                    'direccion': this.direccion,
                    'telefono': this.telefono,
                    'cliente_id': this.cliente_id
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarClientes();
                    me.statusCliente(2);
                }).catch(function (error) {
                    console.log(error.response.data);
                }); 
            },
            eliminarCliente(id){
               swal({
                title: '¿Esta seguro de eliminar esta cliente?',
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

                    axios.post('/cliente/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarClientes();
                        swal(
                        'Cliente eliminado!',
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
            restaurarCliente(id){
               swal({
                title: '¿Esta seguro de restaurar esta cliente?',
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

                    axios.post('/cliente/restaurar',{
                        'id': id
                    }).then(function (response) {
                        me.listarClientes();
                        swal(
                        'Cliente restaurado!',
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
            eliminarProductoLista(id){
               swal({
                title: '¿Esta seguro de eliminar este producto de la lista?',
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

                    axios.post('/productoLista/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarListaCliente();
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
            validarCliente(){
                this.errorCliente = 0;
                this.errores = [];

                if (!this.nombre) this.errores.push("El nombre de la cliente no puede estar vacío.");
                if (!this.direccion) this.errores.push("La dirección de la cliente no puede estar vacío.");
                if (this.errores.length) this.errorCliente = 1;

                return this.errorCliente;
            },
            validarProductoLista(){
                this.errorLista = 0;
                this.errores = [];

                if (this.producto_id <= 0) this.errores.push("Debes seleccionar un producto.");
                if (this.precio_neto < 0) this.errores.push("El valor ingresado no puede ser menor a 0.");
                if (this.errores.length) this.errorLista = 1;

                return this.errorLista;
            },
            statusCliente(estado){
                this.estadoCliente = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Registro agregado exitosamente');
                } else if(estado == 2){
                    this.estados.push('Registro actualizo exitosamente');
                } else if(estado == 3){
                    this.estados.push('Producto agregado a la lista exitosamente');
                }

                if (this.estados.length) this.estadoCliente = 1;

                return this.estadoCliente;
            },
            statusListaCliente(estado){
                this.estadoListaCliente = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Producto agregado a la lista exitosamente.');
                } else if(estado == 2){
                    this.estados.push('Producto eliminado de la lista exitosamente.');
                }

                if (this.estados.length) this.estadoListaCliente = 1;

                return this.estadoListaCliente;
            },
            cerrarModal(){
                this.modal = 0;
                this.tituloModal = '';
                this.run = '';
                this.nombre = '';
                this.direccion = '';
                this.telefono = '';
                this.tipoAccion = 0;
                this.errorCliente = 0;
            },
            abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "cliente":
                    {
                        switch(accion){
                            case 'registrar':
                            { 
                                this.modal = 1;
                                this.tituloModal = 'Registrar Cliente';
                                this.run = '';
                                this.nombre = '';
                                this.direccion = '';
                                this.telefono = '';
                                this.tipoAccion = 1;
                                break;
                            }
                            case 'actualizar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Actualizar cliente';
                                this.tipoAccion = 2;
                                this.run = data['run'];
                                this.nombre = data['nombre'];
                                this.direccion = data['direccion'];
                                this.telefono = data['telefono'];
                                this.cliente_id = data['id'];
                                break;
                            }
                        }
                    }
                }
            },
            limpiarDatosModalLista(){
                this.producto_id = 0;
                this.precio_neto = 0;
                this.observacion = '';
            },
            cerrarModalLista(){
                this.modal_lista = 0;
                this.errorLista = 0;
                this.listaCliente = [];
                this.estadoListaCliente = 0;
            },
            abrirModalLista(data = []){
                this.modal_lista = 1;
                this.producto_id = 0;
                this.precio_neto = 0;
                this.errorLista = 0;
                this.cliente_id = data['id'];
                this.listarListaCliente();
            }
        },
        mounted() {
            this.listarClientes();
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
