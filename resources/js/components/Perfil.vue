<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Perfiles de Usuario</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Perfiles de Usuario</li>
                        </ol>
                        <button type="button" v-b-tooltip.hover title="Ingresar perfiles de usuarios al sistema" @click="abrirModal('perfil','registrar')" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Crear Perfil</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="estadoPerfil" class="form-group row alert alert-success">
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
                                            :items="perfiles"
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
                                                <b-button size="xs" v-b-tooltip.hover title="Editar informción de perfil" @click="abrirModal('perfil','actualizar',row.item)" class="btn btn-warning">
                                                    <i class="icon-pencil"></i>
                                                </b-button>

                                                <b-button size="xs" v-b-tooltip.hover title="Eliminar perfil" @click="eliminarPerfil(row.item.id)" class="btn btn-danger">
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
                            <div v-show="errorPerfil" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form m-t-20">
                                <div class="row m-b-20">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre Perfil</label>
                                            <input type="text" class="form-control" v-model="nombre">
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-b-20">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Permisos</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="crear" v-model="crear">
                                            <label class="custom-control-label" for="crear">Crear registros</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="editar" v-model="editar">
                                            <label class="custom-control-label" for="editar">Editar registros</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="eliminar" v-model="eliminar">
                                            <label class="custom-control-label" for="eliminar">Eliminar registros</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="agregar" v-model="agregar">
                                            <label class="custom-control-label" for="agregar">Agregar registros a existentes</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="descargar" v-model="descargar">
                                            <label class="custom-control-label" for="descargar">Descargar documentos</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="ver" v-model="ver">
                                            <label class="custom-control-label" for="ver">Ver información</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="enviar" v-model="enviar">
                                            <label class="custom-control-label" for="enviar">Enviar correos</label>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="row tex-center">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Módulos</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-b-10">
                                    <div class="col-sm-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><b>Dashboard</b></label>
                                            </div>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_dashboard" v-model="m_dashboard">
                                            <label class="custom-control-label" for="m_dashboard">GENERAL</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_dashboard_especifico" v-model="m_dashboard_especifico">
                                            <label class="custom-control-label" for="m_dashboard_especifico">ESPECIFICO</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><b>Sucursales</b></label>
                                            </div>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_sucursales" v-model="m_sucursales">
                                            <label class="custom-control-label" for="m_sucursales">Sucursales</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><b>Usuarios</b></label>
                                            </div>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_usuarios" v-model="m_usuarios">
                                            <label class="custom-control-label" for="m_usuarios">Usuarios</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_perfiles" v-model="m_perfiles">
                                            <label class="custom-control-label" for="m_perfiles">Perfiles</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-b-10">
                                    <div class="col-sm-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><b>Productos</b></label>
                                            </div>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_categorias_productos" v-model="m_categorias_productos">
                                            <label class="custom-control-label" for="m_categorias_productos">Categorías</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_productos" v-model="m_productos">
                                            <label class="custom-control-label" for="m_productos">Productos</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_stock_manual" v-model="m_stock_manual">
                                            <label class="custom-control-label" for="m_stock_manual">Stock manual</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><b>Clientes</b></label>
                                            </div>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_categorias_clientes" v-model="m_categorias_clientes">
                                            <label class="custom-control-label" for="m_categorias_clientes">Categorías</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_clientes" v-model="m_clientes">
                                            <label class="custom-control-label" for="m_clientes">Clientes</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><b>Informes</b></label>
                                            </div>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_ventas" v-model="m_ventas">
                                            <label class="custom-control-label" for="m_ventas">Ventas</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_sin_stock" v-model="m_sin_stock">
                                            <label class="custom-control-label" for="m_sin_stock">Sin Stock</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_stock" v-model="m_stock">
                                            <label class="custom-control-label" for="m_stock">Stock</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="por_categoria" v-model="por_categoria">
                                            <label class="custom-control-label" for="por_categoria">Ventas Categorías</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-b-10">
                                    <div class="col-sm-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><b>Ventas</b></label>
                                            </div>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_normal" v-model="m_normal">
                                            <label class="custom-control-label" for="m_normal">Normal</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_premium" v-model="m_premium">
                                            <label class="custom-control-label" for="m_premium">Premium</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_pendientes" v-model="m_pendientes">
                                            <label class="custom-control-label" for="m_pendientes">Pendientes</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label><b>Documentos</b></label>
                                            </div>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_empresas" v-model="m_empresas">
                                            <label class="custom-control-label" for="m_empresas">Empresas</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_cotizaciones" v-model="m_cotizaciones">
                                            <label class="custom-control-label" for="m_cotizaciones">Cotizaciones</label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="m_ordenes_compra" v-model="m_ordenes_compra">
                                            <label class="custom-control-label" for="m_ordenes_compra">Ordenes de compra</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarPerfil()">Guardar</button>
                        <button type="button" v-if="tipoAccion==2" class="btn btn-primary" @click="actualizarPerfil()">Actualizar</button>
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
                nombre : '',
                correo : '',
                clave : '',
                perfiles : [],
                modal : 0,
                tituloModal : '',
                tipoAccion : 0,
                estadoPerfil: 0,
                estados : [],
                errorPerfil : 0,
                errores : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'nombre', label: 'NOMBRE', sortable: true, class: 'text-left' },
                    { key: 'acciones', label: 'ACCIONES', sortable: true, class: 'text-center' },
                ],
                currentPage: 1,
                perPage: 10,
                totalRows: 0,
                pageOptions: [10, 25, 50, 100],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                crear: 0,
                editar: 0,
                eliminar: 0,
                agregar: 0,
                descargar: 0,
                ver: 0,
                enviar: 0,
                m_dashboard: 0,
                m_sucursales: 0,
                m_usuarios: 0,
                m_perfiles: 0,
                m_categorias_productos: 0,
                m_productos: 0,
                m_stock_manual: 0,
                m_categorias_clientes: 0,
                m_clientes: 0,
                m_ventas: 0,
                m_sin_stock: 0,
                m_stock: 0,
                m_normal: 0,
                m_premium: 0,
                m_pendientes: 0,
                m_empresas: 0,
                m_cotizaciones: 0,
                m_ordenes_compra: 0,
                por_categoria: 0,
                m_dashboard_especifico: 0
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
            listarPerfiles(){
                let me=this;
                var url= '/perfiles';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.perfiles = respuesta.perfiles;
                    me.totalRows = me.perfiles.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            registrarPerfil(){
                if (this.validarPerfil()){
                    return;
                }
                
                let me = this;

                axios.post('/perfil/registrar',{
                    'nombre': this.nombre,
                    'crear' : this.crear,
                    'editar' : this.editar,
                    'eliminar' : this.eliminar,
                    'agregar' : this.agregar,
                    'descargar' : this.descargar,
                    'ver' : this.ver,
                    'enviar' : this.enviar,
                    'm_dashboard' : this.m_dashboard,
                    'm_sucursales' : this.m_sucursales,
                    'm_usuarios' : this.m_usuarios,
                    'm_perfiles' : this.m_perfiles,
                    'm_categorias_productos' : this.m_categorias_productos,
                    'm_productos' : this.m_productos,
                    'm_stock_manual' : this.m_stock_manual,
                    'm_categorias_clientes' : this.m_categorias_clientes,
                    'm_clientes' : this.m_clientes,
                    'm_ventas' : this.m_ventas,
                    'm_sin_stock' : this.m_sin_stock,
                    'm_stock' : this.m_stock,
                    'm_normal' : this.m_normal,
                    'm_premium' : this.m_premium,
                    'm_pendientes' : this.m_pendientes,
                    'm_empresas': this.m_empresas,
                    'm_cotizaciones': this.m_cotizaciones,
                    'm_ordenes_compra': this.m_ordenes_compra,
                    'por_categoria': this.por_categoria,
                    'm_dashboard_especifico': this.m_dashboard_especifico
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarPerfiles();
                    me.statusPerfil(1);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            actualizarPerfil(){
                this.errores =[];

                if (this.validarPerfil()){
                    return;
                }
                
                let me = this;

                axios.post('/perfil/actualizar',{
                    'nombre': this.nombre,
                    'crear' : this.crear,
                    'editar' : this.editar,
                    'eliminar' : this.eliminar,
                    'agregar' : this.agregar,
                    'descargar' : this.descargar,
                    'ver' : this.ver,
                    'enviar' : this.enviar,
                    'm_dashboard' : this.m_dashboard,
                    'm_sucursales' : this.m_sucursales,
                    'm_usuarios' : this.m_usuarios,
                    'm_perfiles' : this.m_perfiles,
                    'm_categorias_productos' : this.m_categorias_productos,
                    'm_productos' : this.m_productos,
                    'm_stock_manual' : this.m_stock_manual,
                    'm_categorias_clientes' : this.m_categorias_clientes,
                    'm_clientes' : this.m_clientes,
                    'm_ventas' : this.m_ventas,
                    'm_sin_stock' : this.m_sin_stock,
                    'm_stock' : this.m_stock,
                    'm_normal' : this.m_normal,
                    'm_premium' : this.m_premium,
                    'm_pendientes' : this.m_pendientes,
                    'm_empresas': this.m_empresas,
                    'm_cotizaciones': this.m_cotizaciones,
                    'm_ordenes_compra': this.m_ordenes_compra,
                    'perfil_id': this.perfil_id,
                    'por_categoria': this.por_categoria,
                    'm_dashboard_especifico': this.m_dashboard_especifico
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarPerfiles();
                    me.statusPerfil(2);
                }).catch(function (error) {
                    console.log(error.response.data);
                }); 
            },
            eliminarPerfil(id){
               swal({
                title: '¿Esta seguro de eliminar esta perfil?',
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

                    axios.post('/perfil/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarPerfiles();
                        swal(
                        'Perfil eliminado!',
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
            validarPerfil(){
                this.errorPerfil=0;
                this.errores =[];

                if (!this.nombre) this.errores.push("El nombre del perfil no puede estar vacío.");
                if (this.errores.length) this.errorPerfil = 1;

                return this.errorPerfil;
            },
            statusPerfil(estado){
                this.estadoPerfil = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Registro agregado exitosamente');
                } else if(estado == 2){
                    this.estados.push('Registro actualizo exitosamente');
                }

                if (this.estados.length) this.estadoPerfil = 1;

                return this.estadoPerfil;
            },
            cerrarModal(){
                this.modal = 0;
                this.tituloModal = '';
                this.nombre = '';
                this.crear = 0;
                this.editar = 0;
                this.eliminar = 0;
                this.agregar = 0;
                this.descargar = 0;
                this.ver = 0;
                this.enviar = 0;
                this.m_dashboard = 0;
                this.m_sucursales = 0;
                this.m_usuarios = 0;
                this.m_perfiles = 0;
                this.m_categorias_productos = 0;
                this.m_productos = 0;
                this.m_stock_manual = 0;
                this.m_categorias_clientes = 0;
                this.m_clientes = 0;
                this.m_ventas = 0;
                this.m_sin_stock = 0;
                this.m_stock = 0;
                this.m_normal = 0;
                this.m_premium = 0;
                this.m_pendientes = 0;
                this.tipoAccion = 0;
                this.m_empresas = 0;
                this.m_cotizaciones = 0;
                this.m_ordenes_compra = 0;
                this.errorPerfil = 0;
                this.por_categoria = 0;
                this.m_dashboard_especifico = 0;
            },
            abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "perfil":
                    {
                        switch(accion){
                            case 'registrar':
                            { 
                                this.modal = 1;
                                this.tituloModal = 'Registrar perfil';
                                this.nombre = '';
                                this.crear = 0;
                                this.editar = 0;
                                this.eliminar = 0;
                                this.agregar = 0;
                                this.descargar = 0;
                                this.ver = 0;
                                this.enviar = 0;
                                this.m_dashboard = 0;
                                this.m_sucursales = 0;
                                this.m_usuarios = 0;
                                this.m_perfiles = 0;
                                this.m_categorias_productos = 0;
                                this.m_productos = 0;
                                this.m_stock_manual = 0;
                                this.m_categorias_clientes = 0;
                                this.m_clientes = 0;
                                this.m_ventas = 0;
                                this.m_sin_stock = 0;
                                this.m_stock = 0;
                                this.m_normal = 0;
                                this.m_premium = 0;
                                this.m_pendientes = 0;
                                this.m_empresas = 0;
                                this.m_cotizaciones = 0;
                                this.m_ordenes_compra = 0;
                                this.por_categoria = 0;
                                this.m_dashboard_especifico = 0;
                                this.tipoAccion = 1;
                                break;
                            }
                            case 'actualizar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Actualizar perfil';
                                this.tipoAccion = 2;
                                this.nombre = data['nombre'];
                                this.crear = data['crear'];
                                this.editar = data['editar'];
                                this.eliminar = data['eliminar'];
                                this.agregar = data['agregar'];
                                this.descargar = data['descargar'];
                                this.enviar = data['enviar'];
                                this.ver = data['ver'];
                                this.m_dashboard = data['m_dashboard'];
                                this.m_sucursales = data['m_sucursales'];
                                this.m_usuarios = data['m_usuarios'];
                                this.m_perfiles = data['m_perfiles'];
                                this.m_categorias_productos = data['m_categorias_productos'];
                                this.m_productos = data['m_productos'];
                                this.m_stock_manual = data['m_stock_manual'];
                                this.m_categorias_clientes = data['m_categorias_clientes'];
                                this.m_clientes = data['m_clientes'];
                                this.m_ventas = data['m_ventas'];
                                this.m_sin_stock = data['m_sin_stock'];
                                this.m_stock = data['m_stock'];
                                this.m_normal = data['m_normal'];
                                this.m_premium = data['m_premium'];
                                this.m_pendientes = data['m_pendientes'];
                                this.m_empresas = data['m_empresas'];
                                this.m_cotizaciones = data['m_cotizaciones'];
                                this.m_ordenes_compra = data['m_ordenes_compra'];
                                this.por_categoria = data['por_categoria'];
                                this.m_dashboard_especifico = data['m_dashboard_especifico'];
                                this.perfil_id = data['id'];
                                break;
                            }
                        }
                    }
                }
            },
        },
        mounted() {
            this.listarPerfiles();
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

    .custom-control-label {
        padding-left: 20px;
    }
</style>
