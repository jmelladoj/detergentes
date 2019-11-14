<template>
    <div>
        <div class="form-group row">
            <div class="col-md-12">
                <b-alert show variant="danger" v-show="estado">
                    La fecha de inicio no puede ser mayor a la fecha término.
                </b-alert>
            </div>
        </div>
        <div class="form-group row">                           
            <label for="" class="col-md-2 col-form-label text-right">DESDE</label>
            <div class="col-md-4">
                <input type="date" class="form-control" v-model="fecha_inicio" @change="compararFechas()">
            </div>

            <label for="" class="col-md-2 col-form-label text-right">HASTA</label>
            <div class="col-md-4">
                <input type="date" class="form-control" v-model="fecha_termino" @change="compararFechas()">
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
                fecha_inicio: '',
                fecha_termino: '',
                estado: 0
            }
        },
        watch:{
            fecha_inicio(){
                this.$emit('inicio', this.fecha_inicio);
            },
            fecha_termino(){
                this.$emit('termino', this.fecha_termino);
            }
        },
        methods : {
            hoy(){
                var fecha = new Date();
                let me = this;
                
                me.fecha_inicio = fecha.getFullYear() + "-" + (fecha.getMonth() +1) + "-" +fecha.getDate();
                me.fecha_termino = fecha.getFullYear() + "-" + (fecha.getMonth() +1) + "-" +fecha.getDate();
            },
            compararFechas(){
                let me = this;

                var fecha_inicio = new Date(me.fecha_inicio);
                var fecha_termino = new Date(me.fecha_termino);

                me.estado = fecha_inicio > fecha_termino ? 1 : 0;
            }
        },
        mounted() {
            this.hoy();
        },
        updated(){
            this.$emit('metodo_uno');
            this.$emit('metodo_dos');
        }
    }
</script>

<style>
    canvas {
        height: 500px;
    }

</style>