@if(Auth::user()->perfil->m_dashboard)    
    <template v-if="menu==0">  
        <dashboard></dashboard>
    </template>
@endif

@if(Auth::user()->perfil->m_sucursales)
    <template v-if="menu==1"> 
        <sucursal></sucursal>
    </template>
@endif

@if(Auth::user()->perfil->m_usuarios)    
    <template v-if="menu==2">
        <usuario></usuario>
    </template>
@endif

@if(Auth::user()->perfil->m_categorias_productos)
    <template v-if="menu==3">
        <categoria-producto></categoria-producto>
    </template>
@endif

@if(Auth::user()->perfil->m_productos)
    <template v-if="menu==4">
        <producto></producto>
    </template>
@endif

@if(Auth::user()->perfil->m_clientes)
    <template v-if="menu==5">
        <cliente></cliente>
    </template>
@endif

@if(Auth::user()->perfil->m_categorias_clientes)
    <template v-if="menu==6">
        <categoria-cliente></categoria-cliente>
    </template>
@endif

@if(Auth::user()->perfil->m_ventas)
    <template v-if="menu==7">
        <detalle-ventas></detalle-ventas>
    </template>
@endif

@if(Auth::user()->perfil->m_sin_Stock)
    <template v-if="menu==8">
        <productos-criticos></productos-criticos>
    </template>
@endif

@if(Auth::user()->perfil->m_stock)
    <template v-if="menu==9">
        <productos-stock></productos-stock>
    </template>
@endif

@if(Auth::user()->perfil->m_empresas)
    <template v-if="menu==10">
        <empresa></empresa>
    </template>
@endif

@if(Auth::user()->perfil->m_cotizaciones)
    <template v-if="menu==11">
        <cotizacion></cotizacion>
    </template>
@endif
@if(Auth::user()->perfil->m_ordenes_compra)
    <template v-if="menu==12">
        <orden-compra></orden-compra>
    </template>
@endif
@if(Auth::user()->perfil->m_normal)
    <template v-if="menu==13">
        <venta-normal></venta-normal>
    </template>
@endif
@if(Auth::user()->perfil->m_premium)
    <template v-if="menu==14">
        <venta-premium></venta-premium>
    </template>
@endif
@if(Auth::user()->perfil->m_pendientes)
    <template v-if="menu==15">
        <pendientes></pendientes>
    </template>
@endif
@if(Auth::user()->perfil->m_stock_manual)
    <template v-if="menu==16">
        <stock-manual></stock-manual>
    </template>
@endif
@if(Auth::user()->perfil->m_perfiles)
    <template v-if="menu==17">
        <perfiles></perfiles>
    </template>
@endif
