<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Categorías de Productos</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Categorías de Productos</li>
                        </ol>
                        <button type="button" v-b-tooltip.hover title="Ingresar categorías de los producto al sistema" @click="abrirModal('categoria','registrar')" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Crear Categoría</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div v-show="estadoCategoria" class="form-group row alert alert-success">
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
                                            :items="categorias"
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

                                                <b-button size="xs" v-b-tooltip.hover title="Agregar subcategorías" class="btn btn-success" @click="agregarSubCategorias(row.item)">
                                                    <i class="icon-plus"></i>
                                                </b-button>

                                                <b-button size="xs" v-b-tooltip.hover title="Editar información de categoría content" @click="abrirModal('categoria','actualizar',row.item)" class="btn btn-warning">
                                                    <i class="icon-pencil"></i>
                                                </b-button>

                                                <b-button v-if="row.item.deleted_at" size="xs" v-b-tooltip.hover title="Restaurar categoría" @click="restaurarCategoria(row.item.id)" class="btn btn-warning">
                                                    <i class="fa fa-undo"></i>
                                                </b-button>

                                                <b-button v-else size="xs" v-b-tooltip.hover title="Eliminar categoría" @click="eliminarCategoria(row.item.id)"  class="btn btn-danger">
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
                            <div v-show="errorCategoria" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form m-t-20">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre Categoria</label>
                                            <input type="text" class="form-control" v-model="nombre">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarCategoria()">Guardar</button>
                        <button type="button" v-if="tipoAccion==2" class="btn btn-primary" @click="actualizarCategoria()">Actualizar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <div class="modal fade bs-example-modal-md" :class="{'mostrar' : modalSubcategoria}" style="display: none;" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myLargeModalLabel" v-text="'Subcategoriás'"></h4>
                        <button type="button" class="close" @click="cerrarModalSubCategorias()" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-body">
                            <div v-show="errorSubCategoria" class="form-group row alert alert-danger">
                                <div class="text-left">
                                    <li v-for="error in errores" :key="error" v-text="error"></li>
                                </div>
                            </div>
                            <form class="form m-t-20">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <input type="text" class="form-control" v-model="nombre_subcategoria" placeholder="Nombre Subcategoría">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <button type="button" v-b-tooltip.hover title="Ingresar subcategorias de la categorias al sistema" @click="registrarSubCategoria()" class="btn btn-info btn-block"><i class="fa fa-plus-circle"></i> Agregar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-t-20">
                                    <div class="table-responsive">
                                        <table id="tablaGiftcards" class="table table-bordered table-striped">
                                            <thead>
                                                <tr align="center">
                                                    <th>#</th>
                                                    <th>Nombre</th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(subCategoria, index) in subCategorias" :key="subCategoria.id" :value="subCategoria.id">
                                                    <td align="center" class="align-middle">{{ index + 1 }}</td>
                                                    <td class="align-left">{{ subCategoria.nombre }}</td>
                                                    <td align="center">
                                                        <button type="button" v-if="subCategoria.deleted_at" v-b-tooltip.hover title="Restaurar SubCategoría" @click="restaurarSubCategoria(subCategoria.id)" class="btn btn-warning btn-xs">
                                                            <i class="fa fa-undo"></i>
                                                        </button>

                                                        <button type="button" v-else v-b-tooltip.hover title="Eliminar SubCategoría" @click="eliminarSubCategoria(subCategoria.id)"  class="btn btn-danger btn-xs">
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
                        <button type="button" class="btn btn-secondary" @click="cerrarModalSubCategorias()">Cerrar</button>
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
                categoria_id: 0,
                nombre : '',
                nombre_subcategoria: '',
                categorias : [],
                subCategorias : [],
                modal : 0,
                modalSubcategoria : 0,
                tituloModal : '',
                tipoAccion : 0,
                estadoCategoria: 0,
                estados : [],
                errorCategoria : 0,
                errorSubCategoria : 0,
                errores : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'nombre', label: 'NOMBRE', sortable: true, class: 'text-center' },
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
            listarCategorias(){
                let me=this;
                var url= '/categorias';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.categorias = respuesta.categorias;
                    me.totalRows = me.categorias.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarSubCategorias(){
                let me=this;
                axios.post('/subCategorias',{
                    'categoria_id': this.categoria_id
                }).then(function (response) {
                    var respuesta= response.data;
                    me.subCategorias = respuesta.subCategorias;
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            registrarCategoria(){
                if (this.validarCategoria()){
                    return;
                }
                
                let me = this;

                axios.post('/categoria/registrar',{
                    'nombre': this.nombre
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarCategorias();
                    me.statusCategoria(1);
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            registrarSubCategoria(){
                if (this.validarSubCategoria()){
                    return;
                }
                
                let me = this;

                axios.post('/subCategoria/registrar',{
                    'nombre': this.nombre_subcategoria,
                    'categoria_id': this.categoria_id
                }).then(function (response) {
                    me.listarSubCategorias();
                    me.nombre_subcategoria = "";
                }).catch(function (error) {
                    console.log(error.response.data);
                });
            },
            actualizarCategoria(){
                this.errores =[];

                if (this.validarCategoria()){
                    return;
                }
                
                let me = this;

                axios.post('/categoria/actualizar',{
                    'nombre': this.nombre,
                    'categoria_id': this.categoria_id
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarCategorias();
                    me.statusCategoria(2);
                }).catch(function (error) {
                    console.log(error.response.data);
                }); 
            },
            eliminarCategoria(id){
               swal({
                title: '¿Esta seguro de eliminar esta categoría?',
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

                    axios.post('/categoria/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarCategorias();
                        swal(
                        'Categoría eliminada!',
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
            restaurarCategoria(id){
               swal({
                title: '¿Esta seguro de restaurar esta categoría?',
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

                    axios.post('/categoria/restaurar',{
                        'id': id
                    }).then(function (response) {
                        me.listarCategorias();
                        swal(
                        'Categoría restaurada!',
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
            eliminarSubCategoria(id){
               swal({
                title: '¿Esta seguro de eliminar esta subcategoría?',
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

                    axios.post('/subCategoria/eliminar',{
                        'id': id
                    }).then(function (response) {
                        me.listarSubCategorias();
                        swal(
                        'SubCategoría eliminada!',
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
            restaurarSubCategoria(id){
               swal({
                title: '¿Esta seguro de restaurar esta subcategoría?',
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

                    axios.post('/subCategoria/restaurar',{
                        'id': id
                    }).then(function (response) {
                        me.listarSubCategorias();
                        swal(
                        'SubCategoría restaurada!',
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
            validarCategoria(){
                this.errorCategoria = 0;
                this.errores =[];

                if (!this.nombre) this.errores.push("El nombre de la categoría no puede estar vacío.");
                if (this.errores.length) this.errorCategoria = 1;

                return this.errorCategoria;
            },
            validarSubCategoria(){
                this.errorSubCategoria = 0;
                this.errores =[];

                if (!this.nombre_subcategoria) this.errores.push("El nombre de la subcategoría no puede estar vacío.");
                if (this.errores.length) this.errorSubCategoria = 1;

                return this.errorSubCategoria;
            },
            statusCategoria(estado){
                this.estadoCategoria = 0;
                this.estados = [];

                if(estado == 1){
                    this.estados.push('Registro agregado exitosamente');
                } else if(estado == 2){
                    this.estados.push('Registro actualizo exitosamente');
                }

                if (this.estados.length) this.estadoCategoria = 1;

                return this.estadoCategoria;
            },
            cerrarModal(){
                this.modal = 0;
                this.tituloModal = '';
                this.nombre = '';
                this.categoria_id = 0;
            },
            abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "categoria":
                    {
                        switch(accion){
                            case 'registrar':
                            { 
                                this.modal = 1;
                                this.tituloModal = 'Registrar Categoría';
                                this.nombre = '';
                                this.categoria_id = 0;
                                this.tipoAccion = 1;
                                break;
                            }
                            case 'actualizar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Actualizar categoría';
                                this.tipoAccion = 2;
                                this.nombre = data['nombre'];
                                this.categoria_id = data['id'];
                                break;
                            }
                        }
                    }
                }
            },
            agregarSubCategorias(data = []){
                this.modalSubcategoria = 1;
                this.nombre_subcategoria = "";
                this.categoria_id = data['id'];
                this.listarSubCategorias();
            },
            cerrarModalSubCategorias(){
                this.modalSubcategoria = 0;
                this.categoria_id = 0;
                this.nombre_subcategoria = "";
                this.subCategorias = [];
                this.errorSubCategoria = 0;
            },
        },
        mounted() {
            this.listarCategorias();
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
