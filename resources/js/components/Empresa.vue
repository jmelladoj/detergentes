<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Empresas</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Empresas</li>
                        </ol>
                        <button type="button" v-b-tooltip.hover title="Agregar empresas al sistema" @click="abrirModal('empresa','registrar')" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Crear Empresa</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="estadoEmpresa" class="form-group row alert alert-success">
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
                                            :items="empresas"
                                            :fields="fields"
                                            :current-page="currentPage"
                                            :per-page="perPage"
                                            :filter="filter"
                                            :sort-by.sync="sortBy"
                                            :sort-desc.sync="sortDesc"
                                            :sort-direction="sortDirection"
                                            @filtered="onFiltered"
                                            >

                                            <template slot="contacto" slot-scope="row">
                                                <label for="" v-text="row.item.telefono + ' - ' + row.item.correo"></label>
                                            </template>

                                            <template slot="tipo" slot-scope="row">
                                                <label for="" v-if="row.item.empresa == 1 && row.item.proveedor == 1"> EMPRESA - PROVEEDOR</label>
                                                <label for="" v-if="row.item.empresa == 1 && row.item.proveedor == 0"> SOLO EMPRESA</label>
                                                <label for="" v-if="row.item.empresa == 0 && row.item.proveedor == 1"> SOLO PROVEEDOR</label>
                                                <label for="" v-if="row.item.empresa == 0 && row.item.proveedor == 0"> EN PROCESO</label>
                                            </template>

                                            <template slot="acciones" slot-scope="row">
                                                <b-button size="xs" v-b-tooltip.hover title="Editar información de empresa" @click="abrirModal('empresa','actualizar',row.item)" class="btn btn-warning">
                                                    <i class="icon-pencil"></i>
                                                </b-button>

                                                <b-button size="xs" v-b-tooltip.hover title="Eliminar empresa" @click="eliminarEmpresa(row.item.id)" class="btn btn-danger">
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
                            <div v-show="errorEmpresa" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form m-t-20">
                                <div class="form-group row">
                                    <div class="col-md-4">
                                        <label>Nombre Empresa</label>
                                        <input type="text" class="form-control" v-model="nombre">
                                    </div>
                                    <div class="col-md-4">
                                        <label>Rut Empresa</label>
                                        <input type="text" class="form-control" v-model="rut" v-rut>
                                    </div>
                                    <div class="col-md-4">
                                        <label>Giro</label>
                                        <input type="text" class="form-control" v-model="giro">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-4">
                                        <label>Télefono</label>
                                        <input type="number" class="form-control" v-model="telefono">
                                    </div>
                                    <div class="col-md-4">
                                        <label>Dirección</label>
                                        <input type="text" class="form-control" v-model="direccion">
                                    </div>
                                    <div class="col-md-4">
                                        <label>Comuna</label>
                                        <input type="text" class="form-control" v-model="comuna">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <label>Correo</label>
                                        <input type="email" class="form-control" v-model="correo">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarEmpresa()">Guardar</button>
                        <button type="button" v-if="tipoAccion==2" class="btn btn-primary" @click="actualizarEmpresa()">Actualizar</button>
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

    const items = [
        { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } }
    ]

    export default {
        data (){
            return {
                empresa_id: 0,
                nombre : '',
                rut : '',
                direccion : '',
                giro : '',
                telefono : 0,
                direccion : '',
                comuna : '',
                correo : '',
                empresas : [],
                modal : 0,
                tituloModal : '',
                tipoAccion : 0,
                estadoEmpresa: 0,
                estados : [],
                errorEmpresa : 0,
                errores : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'nombre', label: 'NOMBRE', sortable: true, class: 'text-center' },
                    { key: 'direccion', label: 'DIRECCIÓN', sortable: true, class: 'text-center' },
                    { key: 'contacto', label: 'CONTÁCTO', sortable: true, class: 'text-center' },
                    { key: 'tipo', label: 'TIPO', sortable: true, class: 'text-center' },
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
            registrarEmpresa(){
                if (this.validarEmpresa()){
                    return;
                }
                
                let me = this;

                axios.post('/empresa/registrar',{
                    'nombre': this.nombre,
                    'rut': this.rut,
                    'direccion': this.direccion,
                    'giro': this.giro,
                    'telefono': this.telefono,
                    'direccion': this.direccion,
                    'comuna': this.comuna,
                    'correo': this.correo
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarEmpresas();
                    me.statusEmpresa(1);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            actualizarEmpresa(){
                this.errores =[];

                if (this.validarEmpresa()){
                    return;
                }
                
                let me = this;

                axios.post('/empresa/actualizar',{
                    'nombre': this.nombre,
                    'rut': this.rut,
                    'direccion': this.direccion,
                    'giro': this.giro,
                    'telefono': this.telefono,
                    'direccion': this.direccion,
                    'comuna': this.comuna,
                    'correo': this.correo,
                    'empresa_id': this.empresa_id
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarEmpresas();
                    me.statusEmpresa(2);
                }).catch(function (error) {
                    console.log(error.response.data);
                }); 
            },
            eliminarEmpresa(id){
               swal({
                title: '¿Esta seguro de eliminar esta empresa?',
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

                    axios.post('/empresa/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarEmpresas();
                        swal(
                        'Empresa eliminada!',
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
            validarEmpresa(){
                this.errorEmpresa=0;
                this.errores =[];

                if (!this.nombre) this.errores.push("El nombre de la empresa no puede estar vacío.");
                if (!this.rut) this.errores.push("El rut de la empresa no puede estar vacío.");
                if (!this.direccion) this.errores.push("La dirección de la empresa no puede estar vacío.");
                if (!this.giro) this.errores.push("El giro de la empresa no puede estar vacío.");
                if (this.telefono < 1) this.errores.push("El teléfono de la empresa no puede estar vacío.");
                if (!this.comuna) this.errores.push("La comuna de la empresa no puede estar vacío.");
                if (!this.correo) this.errores.push("El correo de la empresa no puede estar vacío.");
                if (this.errores.length) this.errorEmpresa = 1;

                return this.errorEmpresa;
            },
            statusEmpresa(estado){
                this.estadoEmpresa = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Registro agregado exitosamente');
                } else if(estado == 2){
                    this.estados.push('Registro actualizo exitosamente');
                }

                if (this.estados.length) this.estadoEmpresa = 1;

                return this.estadoEmpresa;
            },
            cerrarModal(){
                this.modal = 0;
                this.tituloModal = '';
                this.empresa_id = 0;
                this.nombre = '';
                this.rut = '';
                this.direccion = '';
                this.giro = '';
                this.telefono = 0;
                this.direccion = '';
                this.comuna = '';
                this.correo = '';
                this.direccion = '';
                this.tipoAccion = 0;
                this.errorEmpresa = 0;
            },
            abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "empresa":
                    {
                        switch(accion){
                            case 'registrar':
                            { 
                                this.modal = 1;
                                this.tituloModal = 'Registrar Empresa';
                                this.empresa_id = 0;
                                this.nombre = '';
                                this.rut = '';
                                this.direccion = '';
                                this.giro = '';
                                this.telefono = 0;
                                this.direccion = '';
                                this.comuna = '';
                                this.correo = '';
                                this.direccion = '';
                                this.tipoAccion = 1;
                                break;
                            }
                            case 'actualizar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Actualizar empresa';
                                this.tipoAccion = 2;
                                this.empresa_id = data['id'];
                                this.nombre = data['nombre'];
                                this.rut = data['rut'];
                                this.direccion = data['direccion'];
                                this.giro = data['giro'];
                                this.telefono = data['telefono'];
                                this.direccion = data['direccion'];
                                this.comuna = data['comuna'];
                                this.correo = data['correo'];
                                break;
                            }
                        }
                    }
                }
            }
        },
        mounted() {
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
    }

    .table td{
        padding: 0.30rem;
    }

    .table th{
        padding: 0.50rem;
    }

    .form-group {
        margin-bottom: 0.4rem;
    }
</style>
