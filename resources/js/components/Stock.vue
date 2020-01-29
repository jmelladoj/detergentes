<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Stock</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Stock</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group row">
                                    <label for="" class="col-md-3">Ver informe de : </label>
                                    <div class="col-md-6">
                                        <select class="form-control" v-model="sucursal_id">
                                            <option value="0">Todas las sucursales</option>
                                            <option v-for="sucursal in sucursales" :key="sucursal.id" :value="sucursal.id" v-text="sucursal.nombre"></option>
                                        </select>
                                    </div>

                                    <div class="col-md-3">
                                        <button type="button" v-b-tooltip.hover title="Descargar inventario en formato excel" @click="exportar()" class="btn btn-info d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Descargar inventario</button>
                                    </div>


                            </div>
                        </div>
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
                                            :items="productos"
                                            :fields="fields"
                                            :current-page="currentPage"
                                            :per-page="perPage"
                                            :filter="filter"
                                            :sort-by.sync="sortBy"
                                            :sort-desc.sync="sortDesc"
                                            :sort-direction="sortDirection"
                                            @filtered="onFiltered"
                                            >

                                            <template v-slot:cell(cantidad)="row">
                                                <div class="col-12" v-for="sucursal in sucursales" :key="sucursal.id"  v-text="sucursal.nombre + ' : ' + obtenerStock(row.item.id, sucursal.id) "></div>
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
    import XLSX from 'xlsx'
import { log } from 'util';

    Vue.use(BootstrapVue)

    const items = []

    export default {
        data (){
            return {
                productos : [],
                sucursales : [],
                stock : [],
                sucursal_id: 0,
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center align-middle' },
                    { key: 'nombre', label: 'NOMBRE', sortable: true, class: 'text-left align-middle' },
                    { key: 'stock', label: 'STOCK TOTAL', sortable: true, class: 'text-center align-middle' },
                    { key: 'cantidad', label: 'STOCK POR SUCURSAL', sortable: true, class: 'text-left align-middle' }
                ],
                currentPage: 1,
                perPage: 25,
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
                var url= '/productos/stock';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.productos = respuesta.productos;
                    me.totalRows = me.productos.length;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
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
            listarStock(){
                let me=this;
                var url= '/stockSucursal';
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.stock = respuesta.stocks;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            obtenerStock(id_producto, id_sucursal){
                let me = this;

                var producto = new Object();

                producto = me.stock.find(function(p) {
                    return p.producto_id == id_producto && p.sucursal_id == id_sucursal;
                });

                if(producto){
                    var cantidad =  producto != 'undefined' ? producto.stock : 0;
                }

                return cantidad;

            },
            exportar(){
                let me = this;
                let informe = [];

                me.productos.forEach(function(p) {
                    me.sucursales.forEach(function(s) {
                        var fila = new Object();

                        if(me.sucursal_id == 0){
                            fila.NUM = p.id;
                            fila.NOMBRE = p.nombre.toUpperCase();
                            fila.TOTAL = p.stock;
                            fila.SUCURSALES = s.nombre.toUpperCase();
                            fila.STOCK = me.obtenerStock(p.id, s.id);
                        } else {
                            if(s.id == me.sucursal_id){
                                fila.NUM = p.id;
                                fila.NOMBRE = p.nombre.toUpperCase();
                                fila.TOTAL = p.stock;
                                fila.SUCURSALES = s.nombre.toUpperCase();
                                fila.STOCK = me.obtenerStock(p.id, s.id);
                            }
                        }

                        informe.push(fila);
                    });
                });

                let data = XLSX.utils.json_to_sheet(informe)
                const workbook = XLSX.utils.book_new()
                const filename = 'Inventario'
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)

                this.sucursal_id = 0
            }
        },
        mounted() {
            this.listarProductos();
            this.listarSucursales();
            this.listarStock();
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
