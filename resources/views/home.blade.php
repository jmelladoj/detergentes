<!DOCTYPE html>
<html lang="en">

<head>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('title', 'Detergentes Pro Cleaning - Admin')</title>

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('public_intranet/css/estilos_intranet.css') }}" rel="stylesheet">

        <link rel="shortcut icon" href="">
    </head>
</head>
<body class="skin-blue fixed-layout">
    <div id="app">
        <div id="main-wrapper">
            <header class="topbar">
                <nav class="navbar top-navbar navbar-expand-md navbar-dark">
                    <div class="navbar-header">
                        <center>
                                <a class="navbar-brand" href="{{ url('/') }}">
                                    <b>
                                        <img src="" alt="" class="dark-logo" />
                                    </b>
                                </a>
                        </center>
                    </div>
                    <div class="navbar-collapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item"> <a class="nav-link nav-toggler d-block d-sm-none waves-effect waves-dark" href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
                            <li class="nav-item"> <a class="nav-link sidebartoggler d-none d-lg-block d-md-block waves-effect waves-dark" href="javascript:void(0)"><i class="icon-menu"></i></a> </li>
                        </ul>
                        <ul class="navbar-nav my-lg-0">
                            <!--<li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bell-o" aria-hidden="true"></i>
                                </i>
                                    <div class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
                                </a>
                            </li>-->
                            <li class="nav-item right-side-toggle"> <a class="nav-link  waves-effect waves-light" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();"><i class="fa fa-sign-out" aria-hidden="true"></i><form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">@csrf</form></a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <aside class="left-sidebar">
                <!-- Sidebar scroll-->
                <div class="scroll-sidebar">
                    <nav class="sidebar-nav">
                        <ul id="sidebarnav">
                            <li class="nav-small-cap">--- MENÚ</li>
                            <li @if(!Auth::user()->perfil->m_dashboard && !Auth::user()->perfil->m_dashboard_especifico) class="d-none" @endif>
                                <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-line-chart"></i><span class="hide-menu"> DASHBOARD</span></a>
                                <ul aria-expanded="false" class="collapse">
                                    @if(Auth::user()->perfil->m_dashboard)<li @click="menu=0"><a href="javascript:void(0)">GENERAL</a></li>@endif
                                    @if(Auth::user()->perfil->m_dashboard_especifico)<li @click="menu=19"><a href="javascript:void(0)">ESPECIFICO</a></li>@endif
                                </ul>
                            </li>

                            @if(Auth::user()->perfil->m_sucursales)<li @click="menu=1"> <a class="waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-building"></i><span class="hide-menu"> SUCURSALES</span></a></li>@endif

                            <li @if(!Auth::user()->perfil->m_perfiles && !Auth::user()->perfil->m_usuarios) class="d-none" @endif>
                                <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-users"></i><span class="hide-menu"> USUARIOS</span></a>
                                <ul aria-expanded="false" class="collapse">
                                    @if(Auth::user()->perfil->m_perfiles)<li @click="menu=17"><a href="javascript:void(0)">PERFILES</a></li>@endif
                                    @if(Auth::user()->perfil->m_usuarios)<li @click="menu=2"><a href="javascript:void(0)">USUARIOS</a></li>@endif
                                </ul>
                            </li>

                            <li @if(!Auth::user()->perfil->m_categorias_productos && !Auth::user()->perfil->m_productos && !Auth::user()->perfil->m_stock_manual) class="d-none" @endif>
                                <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-product-hunt"></i><span class="hide-menu"> PRODUCTOS</span></a>
                                <ul aria-expanded="false" class="collapse">
                                    @if(Auth::user()->perfil->m_categorias_productos)<li @click="menu=3"><a href="javascript:void(0)">CATEGORÍAS</a></li>@endif
                                    @if(Auth::user()->perfil->m_productos)<li @click="menu=4"><a href="javascript:void(0)">PRODUCTOS</a></li>@endif
                                    @if(Auth::user()->perfil->m_stock_manual)<li @click="menu=16"><a href="javascript:void(0)"> STOCK MANUAL</a></li>@endif
                                </ul>
                            </li>


                            <li @if(!Auth::user()->perfil->m_clientes && !Auth::user()->perfil->m_categorias_clientes) class="d-none" @endif>
                                <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-users"></i><span class="hide-menu"> CLIENTES</span></a>
                                <ul aria-expanded="false" class="collapse">
                                    @if(Auth::user()->perfil->m_clientes)<li @click="menu=5"><a href="javascript:void(0)">CLIENTE</a></li>@endif
                                    @if(Auth::user()->perfil->m_categorias_clientes)<li @click="menu=6"><a href="javascript:void(0)">CATEGORÍAS</a></li>@endif
                                </ul>
                            </li>

                            <li @if(!Auth::user()->perfil->m_ventas && !Auth::user()->perfil->m_sin_Stock && !Auth::user()->perfil->m_stock && !Auth::user()->perfil->por_categoria) class="d-none" @endif>
                                <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-list"></i><span class="hide-menu"> INFORMES</span></a>
                                <ul aria-expanded="false" class="collapse">
                                    @if(Auth::user()->perfil->m_ventas)<li @click="menu=7"><a href="javascript:void(0)"> VENTAS</a></li>@endif
                                    @if(Auth::user()->perfil->m_sin_Stock)<li @click="menu=8"><a href="javascript:void(0)"> SIN STOCK</a></li>@endif
                                    @if(Auth::user()->perfil->m_stock)<li @click="menu=9"><a href="javascript:void(0)"> STOCK</a></li>@endif
                                    @if(Auth::user()->perfil->por_categoria)<li @click="menu=18"><a href="javascript:void(0)"> VENTAS CATEGORÍA</a></li>@endif
                                    <li @click="menu=21"><a href="javascript:void(0)"> FACTURAS</a></li>
                                </ul>
                            </li>

                            <li @if(!Auth::user()->perfil->m_empresas && !Auth::user()->perfil->m_cotizaciones && !Auth::user()->perfil->m_ordenes_compra) class="d-none" @endif>
                                <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-folder"></i><span class="hide-menu"> DOCUMENTOS</span></a>
                                <ul aria-expanded="false" class="collapse">
                                    @if(Auth::user()->perfil->m_empresas)<li @click="menu=10"><a href="javascript:void(0)"> EMPRESAS</a></li>@endif
                                    @if(Auth::user()->perfil->m_cotizaciones)<li @click="menu=11"><a href="javascript:void(0)"> COTIZACIONES</a></li>@endif
                                    @if(Auth::user()->perfil->m_ordenes_compra)<li @click="menu=12"><a href="javascript:void(0)"> ORDENES DE COMPRA</a></li>@endif
                                </ul>
                            </li>

                            <li @if(!Auth::user()->perfil->m_normal && !Auth::user()->perfil->m_premium && !Auth::user()->perfil->m_pendientes) class="d-none" @endif>
                                <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-usd"></i><span class="hide-menu"> VENTAS</span></a>
                                <ul aria-expanded="false" class="collapse">
                                    @if(Auth::user()->perfil->m_normal)<li @click="menu=13"><a href="javascript:void(0)"> NORMAL</a></li>@endif
                                    @if(Auth::user()->perfil->m_premium)<li @click="menu=14"><a href="javascript:void(0)"> PREMIUM</a></li>@endif
                                    @if(Auth::user()->perfil->m_pendientes)<li @click="menu=15"><a href="javascript:void(0)"> PENDIENTES</a></li>@endif
                                    @if(Auth::user()->perfil->m_desglose_ventas)<li @click="menu=20"><a href="javascript:void(0)"> DESGLOCE</a></li>@endif
                                </ul>
                            </li>

                            <li> <a class="waves-effect waves-dark" href="{{ route('logout') }}" aria-expanded="false" onclick="event.preventDefault();document.getElementById('logout-form').submit();"><i class="fa fa-sign-out" aria-hidden="true"></i> <span class="hide-menu">CERRAR SESIÓN</span> </a><form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">@csrf</form></li>
                        </ul>
                    </nav>
                </div>
            </aside>

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
                    <venta-normal :usuario="{{ json_encode($usuario) }}"></venta-normal>
                </template>
            @endif
            @if(Auth::user()->perfil->m_premium)
                <template v-if="menu==14">
                    <venta-premium :usuario="{{ json_encode($usuario) }}"></venta-premium>
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
            @if(Auth::user()->perfil->por_categoria)
                <template v-if="menu==18">
                    <ventas-categoria></ventas-categoria>
                </template>
            @endif
            @if(Auth::user()->perfil->m_dashboard_especifico)
                <template v-if="menu==19">
                    <dashboard-especifico></dashboard-especifico>
                </template>
            @endif

            @if(Auth::user()->perfil->m_desglose_ventas)
                <template v-if="menu==20">
                    <desgloce-ventas></desgloce-ventas>
                </template>
            @endif

            <template v-if="menu==21">
                <detalle-ventas-factura></detalle-ventas-factura>
            </template>


            <br>
            <br>

            <footer class="footer">
                Detergentes Pro Cleaning © 2019. Todos los derechos reservados.
            </footer>

        </div>
    </div>

    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('public_intranet/js/plugins_intranet.js') }}"></script>
</body>

</html>
