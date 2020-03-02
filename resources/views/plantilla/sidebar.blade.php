<aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar">
        <nav class="sidebar-nav">
            <ul id="sidebarnav">
                <li class="nav-small-cap">--- MENÚ</li>
                @if(Auth::user()->perfil->m_dashboard)<li @click="menu=0"> <a class="waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-line-chart"></i><span class="hide-menu"> DASHBOARD</span></a></li>@endif
                @if(Auth::user()->perfil->m_sucursales)<li @click="menu=1"> <a class="waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-building"></i><span class="hide-menu"> SUCURSALES</span></a></li>@endif

                <li>
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-users"></i><span class="hide-menu"> USUARIOS</span></a>
                    <ul aria-expanded="false" class="collapse">
                        @if(Auth::user()->perfil->m_perfiles)<li @click="menu=17"><a href="javascript:void(0)">PERFILES</a></li>@endif
                        @if(Auth::user()->perfil->m_usuarios)<li @click="menu=2"><a href="javascript:void(0)">USUARIOS</a></li>@endif
                    </ul>
                </li>

                <li>
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-product-hunt"></i><span class="hide-menu"> PRODUCTOS</span></a>
                    <ul aria-expanded="false" class="collapse">
                        @if(Auth::user()->perfil->m_categorias_productos)<li @click="menu=3"><a href="javascript:void(0)">CATEGORÍAS</a></li>@endif
                        @if(Auth::user()->perfil->m_productos)<li @click="menu=4"><a href="javascript:void(0)">PRODUCTOS</a></li>@endif
                        @if(Auth::user()->perfil->m_stock_manual)<li @click="menu=16"><a href="javascript:void(0)"> STOCK MANUAL</a></li>@endif
                    </ul>
                </li>


                <li>
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-users"></i><span class="hide-menu"> CLIENTES</span></a>
                    <ul aria-expanded="false" class="collapse">
                        @if(Auth::user()->perfil->m_clientes)<li @click="menu=5"><a href="javascript:void(0)">CLIENTE</a></li>@endif
                        @if(Auth::user()->perfil->m_categorias_clientes)<li @click="menu=6"><a href="javascript:void(0)">CATEGORÍAS</a></li>@endif
                    </ul>
                </li>

                <li>
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-list"></i><span class="hide-menu"> INFORMES</span></a>
                    <ul aria-expanded="false" class="collapse">
                        @if(Auth::user()->perfil->m_ventas)<li @click="menu=7"><a href="javascript:void(0)"> VENTAS</a></li>@endif
                        @if(Auth::user()->perfil->m_sin_Stock)<li @click="menu=8"><a href="javascript:void(0)"> SIN STOCK</a></li>@endif
                        @if(Auth::user()->perfil->m_stock)<li @click="menu=9"><a href="javascript:void(0)"> STOCK</a></li>@endif
                        <li @click="menu=18"><a href="javascript:void(0)"> FACTURAS</a></li>
                    </ul>
                </li>

                <li>
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-folder"></i><span class="hide-menu"> DOCUMENTOS</span></a>
                    <ul aria-expanded="false" class="collapse">
                        @if(Auth::user()->perfil->m_empresas)<li @click="menu=10"><a href="javascript:void(0)"> EMPRESAS</a></li>@endif
                        @if(Auth::user()->perfil->m_cotizaciones)<li @click="menu=11"><a href="javascript:void(0)"> COTIZACIONES</a></li>@endif
                        @if(Auth::user()->perfil->m_ordenes_compra)<li @click="menu=12"><a href="javascript:void(0)"> ORDENES DE COMPRA</a></li>@endif
                    </ul>
                </li>

                <li>
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-usd"></i><span class="hide-menu"> VENTAS</span></a>
                    <ul aria-expanded="false" class="collapse">
                        @if(Auth::user()->perfil->m_normal)<li @click="menu=13"><a href="javascript:void(0)"> NORMAL</a></li>@endif
                        @if(Auth::user()->perfil->m_premium)<li @click="menu=14"><a href="javascript:void(0)"> PREMIUM</a></li>@endif
                        @if(Auth::user()->perfil->m_pendientes)<li @click="menu=15"><a href="javascript:void(0)"> PENDIENTES</a></li>@endif
                    </ul>
                </li>

                <li> <a class="waves-effect waves-dark" href="{{ route('logout') }}" aria-expanded="false" onclick="event.preventDefault();document.getElementById('logout-form').submit();"><i class="fa fa-sign-out" aria-hidden="true"></i> <span class="hide-menu">CERRAR SESIÓN</span> </a><form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">@csrf</form></li>
            </ul>
        </nav>
    </div>
</aside>
