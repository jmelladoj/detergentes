<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Dashboard Por Sucursal</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Dashboard Por Sucursal</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <filtro-fechas @inicio="fechaInicio" @termino="fechaTermino" v-on:metodo_uno="listarVentas()" v-on:metodo_dos="listarDetalleSucursal()"></filtro-fechas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group row">                           
                                <label for="" class="col-md-2 col-form-label">SUCURSAL</label>
                                <div class="col-md-10">
                                    <select class="form-control" v-model="sucursal.id" @change="actualizarSucursal()">
                                        <option v-for="sucursal in sucursales" :key="sucursal.id" :value="sucursal.id" v-text="sucursal.nombre"></option>
                                    </select>
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
                                <h4>Caja Chica</h4>
                            </div>
                            <div class="form-group row">
                                <table class="table table-bordered table-striped">
                                    <thead align="center">
                                        <th>EFECTIVO</th>
                                        <th>TARJETA CRÉDITO</th>
                                        <th>TARJETA DEBITO</th>
                                        <th>CHEQUE</th>
                                        <th>TRANSFERENCIA ELÉCTRONICA</th>
                                        <th>TOTAL</th>
                                    </thead>
                                    <tbody>
                                        <tr align="center">
                                            <td v-text="'$' + medios_pago.efectivo"></td>
                                            <td v-text="'$' + medios_pago.tarjeta_credito"></td>
                                            <td v-text="'$' + medios_pago.tarjeta_debito"></td>
                                            <td v-text="'$' + medios_pago.cheque"></td>
                                            <td v-text="'$' + medios_pago.transferencia"></td>
                                            <td v-text="'$' + medios_pago.total"></td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                <h4>Detalle Sucursal</h4>
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

                                            <template slot="detalle" slot-scope="row">
                                                <label for="" v-for="(pago, index) in row.item.pago" :key="index">
                                                    <p v-if="pago.medio_pago == 1"> EFECTIVO -  {{ pago.numero_documento }}</p>
                                                    <p v-if="pago.medio_pago == 2"> TARJETA CRÉDITO -  {{ pago.numero_documento }}</p>
                                                    <p v-if="pago.medio_pago == 3"> TARJETA DÉBITO -  {{ pago.numero_documento }}</p>
                                                    <p v-if="pago.medio_pago == 4"> CHEQUE -  {{ pago.numero_documento }}</p>
                                                    <p v-if="pago.medio_pago == 5"> TRANSFERENCIA ELECTRÓNICA -  {{ pago.numero_documento }}</p>
                                                </label>
                                            </template>

                                            <template slot="detalle_venta" slot-scope="row">
                                                <ul>
                                                    <li v-for="(item, index) in row.item.detalle" :key="index" v-text="obtenerNombre(item.producto_id) + ' X ' + item.cantidad"></li>
                                                </ul>
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
    
    Vue.use(BootstrapVue)

    const items = [
        { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } }
    ]

    export default {

        data (){
            return {
                inicio: '',
                termino: '',
                sucursal: {
                    id: 1
                },
                sucursales: [],
                medios_pago: {
                    efectivo: 0,
                    tarjeta_credito: 0,
                    tarjeta_debito: 0,
                    cheque: 0,
                    transferencia: 0,
                    total: 0
                },
                venta_id: 0,
                ventas : [],
                productos : [],
                items: items,
                fields: [
                    { key: 'id', label: 'NUM', sortable: true, sortDirection: 'desc', class: 'text-center' },
                    { key: 'venta', label: 'VENTA', sortable: true, class: 'text-left' },
                    { key: 'detalle', label: 'DETALLE VENTA', sortable: true, class: 'text-left' },
                    { key: 'detalle_venta', label: 'DETALLE VENTA', sortable: true, class: 'text-left' },
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
            fechaInicio(value){
                this.inicio = value;
            },
            fechaTermino(value){
                this.termino = value;
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
            listarDetalleSucursal(){
                let me=this;
                var url= '/ventas/detalle/'  + me.sucursal.id + '/' + me.inicio + '/' + me.termino ;
                axios.get(url).then(function (response) {
                    var respuesta = response.data;
                    me.medios_pago.efectivo = respuesta.efectivo;
                    me.medios_pago.tarjeta_credito = respuesta.tarjeta_credito;
                    me.medios_pago.tarjeta_debito = respuesta.tarjeta_debito;
                    me.medios_pago.cheque = respuesta.cheque;
                    me.medios_pago.transferencia = respuesta.transferencia;
                    me.medios_pago.total = respuesta.total;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            },
            actualizarSucursal(){
                this.listarDetalleSucursal();
                this.listarVentas();
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            listarVentas(){
                let me=this;
                var url= '/ventas/detalle/productos/'  + me.sucursal.id + '/' + me.inicio + '/' + me.termino ;
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
            obtenerNombre(id){
                var producto = new Object();
                producto = this.productos.find(function(p) {
                    return p.id == id;
                });

                if(producto){
                    return producto.nombre;
                } else {
                    return 'Producto desconocido';
                }
            }
        },
        mounted() {
            this.listarSucursales();
            this.listarProductos();
        }
    }
</script>

<style>
    canvas {
        height: 500px;
    }

</style>