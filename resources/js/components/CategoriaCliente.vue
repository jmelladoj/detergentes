<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Categoría Clientes</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Categoría Clientes</li>
                        </ol>
                        <button type="button" v-b-tooltip.hover title="Agregar categorías de clientes al sistema" @click="abrirModal('categoriaCliente','registrar')" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Crear Categoría de cliente</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="estadoCategoriaCliente" class="form-group row alert alert-success">
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
                                            :items="categoriasClientes"
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
                                                <b-button size="xs" v-b-tooltip.hover title="Editar información de suscursal" @click="abrirModal('categoriaCliente','actualizar',row.item)" class="btn btn-warning">
                                                    <i class="icon-pencil"></i>
                                                </b-button>

                                                <b-button size="xs" v-b-tooltip.hover title="Eliminar sucursal" @click="eliminarCategoriaCliente(row.item.id)" class="btn btn-danger">
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
                            <div v-show="errorCategoriaCliente" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form m-t-20">
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre</label>
                                            <input type="text" class="form-control" v-model="nombre">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Desde</label>
                                            <input type="number" class="form-control" v-model.number="minimo">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Hasta</label>
                                            <input type="number" class="form-control" v-model.number="maximo">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarCategoriaCliente()">Guardar</button>
                        <button type="button" v-if="tipoAccion==2" class="btn btn-primary" @click="actualizarCategoriaCliente()">Actualizar</button>
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

    Vue.use(BootstrapVue)

    const items = [
        { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } }
    ]

    export default {
        data (){
            return {
                categoria_cliente_id: 0,
                nombre : '',
                minimo : 0,
                maximo : 0,
                categoriasClientes : [],
                modal : 0,
                tituloModal : '',
                tipoAccion : 0,
                estadoCategoriaCliente: 0,
                estados : [],
                errorCategoriaCliente : 0,
                errores : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'nombre', label: 'NOMBRE', sortable: true, class: 'text-center' },
                    { key: 'minimo', label: 'MÍNIMO', sortable: true, class: 'text-center' },
                    { key: 'maximo', label: 'MÁXIMO', sortable: true, class: 'text-center' },
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
            listarCategoriasClientes(){
                let me=this;
                var url= '/categoriasClientes';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.categoriasClientes = respuesta.categoriasClientes;
                    me.totalRows = me.categoriasClientes.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            registrarCategoriaCliente(){
                if (this.validarCategoriaCliente()){ return; }
                
                let me = this;

                axios.post('/categoriasClientes/registrar',{
                    'nombre': this.nombre,
                    'minimo': this.minimo,
                    'maximo': this.maximo
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarCategoriasClientes();
                    me.statusCategoriaCliente(1);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            actualizarCategoriaCliente(){
                this.errores =[];

                if (this.validarCategoriaCliente()){
                    return;
                }
                
                let me = this;

                axios.post('/categoriasClientes/actualizar',{
                    'nombre': this.nombre,
                    'minimo': this.minimo,
                    'maximo': this.maximo,
                    'categoria_cliente_id': this.categoria_cliente_id
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarCategoriasClientes();
                    me.statusCategoriaCliente(2);
                }).catch(function (error) {
                    console.log(error.response.data);
                }); 
            },
            eliminarCategoriaCliente(id){
               swal({
                title: '¿Esta seguro de eliminar esta categoría de cliente?',
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

                    axios.post('/categoriasClientes/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarCategoriasClientes();
                        swal(
                        'Categoria de Cliente eliminada!',
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
            validarCategoriaCliente(){
                this.errorCategoriaCliente = 0;
                this.errores = [];
 
                if (!this.nombre) this.errores.push("El nombre de la categoría de cliente no puede estar vacío.");
                if (this.minimo < 0) this.errores.push("El mínimo debe ser mayor 0");
                if (this.maximo < 0) this.errores.push("El máximo debe ser mayor 0");

                if (this.errores.length) this.errorCategoriaCliente = 1;

                return this.errorCategoriaCliente;
            },
            statusCategoriaCliente(estado){
                this.estadoCategoriaCliente = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Registro agregado exitosamente');
                } else if(estado == 2){
                    this.estados.push('Registro actualizo exitosamente');
                }

                if (this.estados.length) this.estadoCategoriaCliente = 1;

                return this.estadoCategoriaCliente;
            },
            cerrarModal(){
                this.modal = 0;
                this.tituloModal = '';
                this.nombre = '';
                this.direccion = '';
                this.tipoAccion = 0;
                this.errorCategoriaCliente = 0;
            },
            abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "categoriaCliente":
                    {
                        switch(accion){
                            case 'registrar':
                            { 
                                this.modal = 1;
                                this.tituloModal = 'Registrar Categoría de Cliente';
                                this.nombre = '';
                                this.minimo = 0;
                                this.maximo = 0;
                                this.tipoAccion = 1;
                                break;
                            }
                            case 'actualizar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Actualizar Categoría de Cliente';
                                this.tipoAccion = 2;
                                this.nombre = data['nombre'];
                                this.minimo = data['minimo'];
                                this.maximo = data['maximo'];
                                this.categoria_cliente_id = data['id'];
                                break;
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            this.listarCategoriasClientes();
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
