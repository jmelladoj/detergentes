<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Por entregar</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Por entregar</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
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
                                            :items="ventas"
                                            :fields="fields"
                                            :current-page="currentPage"
                                            :per-page="perPage"
                                            :filter="filter"
                                            :sort-by.sync="sortBy"
                                            :sort-desc.sync="sortDesc"
                                            :sort-direction="sortDirection"
                                            @filtered="onFiltered"
                                            >

                                            <template slot="venta" slot-scope="row">
                                                <p>
                                                    Subtotal : ${{ row.item.subtotal }} <br>
                                                    Descuento: ${{ row.item.descuento }} <br>
                                                    Total: ${{ row.item.total }}
                                                </p>
                                            </template>

                                            <template slot="detalle_venta" slot-scope="row">
                                                <ul>
                                                    <li v-for="(item, index) in row.item.detalle" :key="index" v-text="obtenerNombre(item.producto_id) + ' X ' + item.cantidad"></li>
                                                </ul>
                                            </template>

                                            <template v-slot:cell(acciones)="row">
                                                <b-button size="xs" v-b-tooltip.hover title="Confirmar entrega de pedido" @click="cambiarEstado(row.item.id)" class="btn btn-success">
                                                    <i class="fa fa-check"></i>
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
    </div>
</template>

<script>
    import BootstrapVue from 'bootstrap-vue'
import { setInterval } from 'timers';
    
    Vue.use(BootstrapVue)

    const items = [
        { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } }
    ]

    export default {
        data (){
            return {
                venta_id: 0,
                ventas : [],
                productos : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'venta', label: 'VENTA', sortable: true, class: 'text-left' },
                    { key: 'detalle_venta', label: 'DETALLE VENTA', sortable: true, class: 'text-left' },
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
            recargarPendientes(){
                setInterval(this.listarPendientes(), 12000);
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            listarPendientes(){
                let me=this;
                var url= '/ventas/pendientes';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.ventas = respuesta.ventas;
                    me.totalRows = me.ventas.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            listarProductos(){
                let me=this;
                var url= '/productos/stock';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.productos = respuesta.productos;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            cambiarEstado(id){
               swal({
                title: '¿Confirmas la entrega de productos?',
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

                    axios.post('/venta/entrega',{
                        'id': id
                    }).then(function (response) {
                        me.listarPendientes();
                        swal(
                        'Venta entregada!',
                        'El registro ha sido modificado con éxito.',
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
            obtenerNombre(id){
                var producto = new Object();
                producto = this.productos.find(function(p) {
                    return p.id == id;
                });

                return producto.nombre;
            }
        },
        mounted() {
            this.recargarPendientes();
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

    .form-group {
        margin-bottom: 0.4rem;
    }
</style>
