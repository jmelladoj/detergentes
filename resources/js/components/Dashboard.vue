<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Dashboard</h4>
                </div>
                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="card-group">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-flex no-block align-items-center">
                                    <div>
                                        <h3><i class="fa fa-list"></i></h3>
                                        <p class="text-muted">CANTIDAD VENTAS</p>
                                    </div>
                                    <div class="ml-auto">
                                        <h2 class="counter text-primary" v-text="resumen.cantidad_ventas">23</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-flex no-block align-items-center">
                                    <div>
                                        <h3><i class="fa fa-usd"></i></h3>
                                        <p class="text-muted">RECAUDADO SEMANAL</p>
                                    </div>
                                    <div class="ml-auto">
                                        <h2 class="counter text-cyan" v-text="resumen.total_ventas"></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-flex no-block align-items-center">
                                    <div>
                                        <h3><i class="fa fa-product-hunt"></i></h3>
                                        <p class="text-muted">PRODUCTOS VENDIDOS</p>
                                    </div>
                                    <div class="ml-auto">
                                        <h2 class="counter text-purple" v-text="resumen.productos_vendido"></h2>
                                    </div>
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
                            <canvas ref="canvas"><line-chart :heigth="400"></line-chart></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!--<div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group row">
                                <div class="col-md-6">
                                    <div class="row form-group">
                                        <div class="table-responsive">
                                            <h4 class="m-b-20 text-center">Productos más vendidos</h4>
                                            <table id="tablaProductos" name="tablaProductos" class="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th align="center">#</th>
                                                        <th align="left">NOMBRE</th>
                                                        <th align="center">CANTIDAD</th>
                                                    </tr>
                                                </thead>
                                                <tbody>    
                                                    <tr></tr>     
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="row form-group">
                                        <div class="table-responsive">
                                            <h4 class="m-b-20 text-center">Productos menos vendidos</h4>
                                            <table id="tablaProductos" name="tablaProductos" class="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th align="center">#</th>
                                                        <th align="left">NOMBRE</th>
                                                        <th align="center">CANTIDAD</th>
                                                    </tr>
                                                </thead>
                                                <tbody>    
                                                    <tr></tr>     
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->
        </div>

    </div>
</template>

<script>
    import VueCharts from 'vue-chartjs'
    import { Bar, Line } from 'vue-chartjs'
   
    Vue.component('line-chart', { extends: VueCharts.Line })


    export default {
        extends: Bar,
        data (){
            return {
                resumen: [],
                datacollection: null
            }
        },
        methods : {
            listarResumen(){
                let me = this;

                axios.get('/resumen').then(function (response) {
                    var respuesta= response.data;
                    me.resumen = respuesta.resumen;

                    me.renderChart({
                        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
                        datasets: [
                            {
                                label: 'Ventas en la semana',
                                backgroundColor: '#f87979',
                                data: [
                                        me.resumen.ventas_lunes, 
                                        me.resumen.ventas_martes, 
                                        me.resumen.ventas_miercoles, 
                                        me.resumen.ventas_jueves, 
                                        me.resumen.ventas_viernes, 
                                        me.resumen.ventas_sabado
                                    ]
                            }
                        ]
                    }, 
                    {   
                        responsive: true, 
                        maintainAspectRatio: false
                    });

                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            }
        },
        extends: VueCharts.Line,
        mounted() {
            let me = this;
            this.listarResumen();
        }
    }
</script>

<style>
    canvas {
        height: 500px;
    }

</style>