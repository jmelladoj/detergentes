<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Usuarios</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Usuarios</li>
                        </ol>
                        <button type="button" v-b-tooltip.hover title="Ingresar usuarios al sistema" @click="abrirModal('usuario','registrar')" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Crear Usuario</button>
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
                                            :items="usuarios"
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
                                                <b-button size="xs" v-b-tooltip.hover title="Editar informción de usuario" @click="abrirModal('usuario','actualizar',row.item)" class="btn btn-warning">
                                                    <i class="icon-pencil"></i>
                                                </b-button>

                                                <b-button size="xs" v-b-tooltip.hover title="Eliminar usuario" @click="eliminarUsuario(row.item.id)" class="btn btn-danger">
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
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myLargeModalLabel" v-text="tituloModal"></h4>
                        <button type="button" class="close" @click="cerrarModal()" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-body">
                            <div v-show="errorUsuario" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre Usuario</label>
                                            <input type="text" class="form-control" v-model="nombre">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo Usuario</label>
                                            <input type="email" class="form-control" v-model="correo">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Clave Correo Usuario</label>
                                            <input type="password" class="form-control" v-model="clave">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label> Perfil de usuario </label>
                                            <select class="form-control p-0" v-model="perfil_id">
                                                <option value="0">Selecciona un perfil</option>
                                                <option v-for="perfil in perfiles" :key="perfil.id" :value="perfil.id" v-text="perfil.nombre"></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label> Sucursal de usuario </label>
                                            <select class="form-control p-0" v-model="sucursal_id">
                                                <option :value="0">Selecciona una sucursal</option>
                                                <option v-for="sucursal in sucursales" :key="sucursal.id" :value="sucursal.id" v-text="sucursal.nombre"></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarUsuario()">Guardar</button>
                        <button type="button" v-if="tipoAccion==2" class="btn btn-primary" @click="actualizarUsuario()">Actualizar</button>
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
                perfil_id: 0,
                sucursal_id: 0,
                usuario_id: 0,
                nombre : '',
                correo : '',
                clave : '',
                usuarios : [],
                perfiles: [],
                modal : 0,
                tituloModal : '',
                tipoAccion : 0,
                estadoUsuario: 0,
                estados : [],
                errorUsuario : 0,
                sucursales : [],
                errores : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'name', label: 'NOMBRE', sortable: true, class: 'text-center' },
                    { key: 'email', label: 'CORREO', sortable: true, class: 'text-center' },
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
            listarUsuarios(){
                let me=this;
                var url= '/usuarios';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.usuarios = respuesta.usuarios;
                    me.totalRows = me.usuarios.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarPerfiles(){
                let me=this;
                var url= '/perfiles';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.perfiles = respuesta.perfiles;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            registrarUsuario(){
                if (this.validarUsuario()){
                    return;
                }

                let me = this;

                axios.post('/usuario/registrar',{
                    'nombre': this.nombre,
                    'correo': this.correo,
                    'clave' : this.clave,
                    'perfil_id': this.perfil_id,
                    'sucursal_id':this.sucursal_id
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarUsuarios();
                    me.statusUsuario(1);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            actualizarUsuario(){
                this.errores =[];

                if (this.validarUsuario()){
                    return;
                }

                let me = this;

                axios.post('/usuario/actualizar',{
                    'nombre': this.nombre,
                    'correo': this.correo,
                    'clave' : this.clave,
                    'usuario_id': this.usuario_id,
                    'perfil_id': this.perfil_id,
                    'sucursal_id':this.sucursal_id
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarUsuarios();
                    me.statusUsuario(2);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            eliminarUsuario(id){
               swal({
                title: '¿Esta seguro de eliminar esta usuario?',
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

                    axios.post('/usuario/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarUsuarios();
                        swal(
                        'Usuario eliminada!',
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
            validarUsuario(){
                this.errorUsuario=0;
                this.errores =[];

                if (!this.nombre) this.errores.push("El nombre de la usuario no puede estar vacío.");
                if (!this.correo) this.errores.push("Se le debe asignar un correo al usuario");
                if (!this.correo.includes('.') || !this.correo.includes('@')) this.errores.push("Debes ingresar un correo valido");
                if (!this.clave && this.tipoAccion == 1) this.errores.push("Se debe de ingresar una clave.");
                if (this.perfil_id <= 0) this.errores.push("Se debe de ingresar un perfil al usuario.");
                if (this.errores.length) this.errorUsuario = 1;

                return this.errorUsuario;
            },
            statusUsuario(estado){
                this.estadoUsuario = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Registro agregado exitosamente');
                } else if(estado == 2){
                    this.estados.push('Registro actualizo exitosamente');
                }

                if (this.estados.length) this.estadoUsuario = 1;

                return this.estadoUsuario;
            },
            cerrarModal(){
                this.modal = 0;
                this.tituloModal = '';
                this.nombre = '';
                this.correo = '';
                this.clave = '';
                this.perfil_id = 0;
                this.sucursal_id = 0;
                this.tipoAccion = 0;
                this.errorUsuario = 0;
            },
            abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "usuario":
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Registrar Usuario';
                                this.nombre = '';
                                this.correo = '';
                                this.clave = '';
                                this.perfil_id = 0;
                                this.tipoAccion = 1;
                                break;
                            }
                            case 'actualizar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Actualizar usuario';
                                this.tipoAccion = 2;
                                this.nombre = data['name'];
                                this.correo = data['email'];
                                this.perfil_id = data['perfil_id'];
                                this.sucursal_id = data['sucursal_id'];

                                this.usuario_id = data['id'];
                                break;
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            this.listarUsuarios();
            this.listarPerfiles();
            this.listarSucursales();
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
