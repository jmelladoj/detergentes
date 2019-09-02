<aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar">
        <nav class="sidebar-nav">
            <ul id="sidebarnav">
                <li class="nav-small-cap">--- MENÚ</li>
                <li @click="menu=0"> <a class="waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-line-chart"></i><span class="hide-menu"> DASHBOARD</span></a></li>
                <li @click="menu=1"> <a class="waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-building"></i><span class="hide-menu"> SUCURSALES</span></a></li>
                <li @click="menu=2"> <a class="waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-users"></i><span class="hide-menu"> USUARIOS</span></a></li>

                <li> 
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-product-hunt"></i><span class="hide-menu"> PRODUCTOS</span></a>
                    <ul aria-expanded="false" class="collapse">
                        <li @click="menu=3"><a href="javascript:void(0)">CATEGORÍAS</a></li>
                        <li @click="menu=4"><a href="javascript:void(0)">PRODUCTOS</a></li>
                        <li @click="menu=16"><a href="javascript:void(0)"> STOCK MANUAL</a></li>
                    </ul>
                </li>

                
                <li> 
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-users"></i><span class="hide-menu"> CLIENTES</span></a>
                    <ul aria-expanded="false" class="collapse">
                        <li @click="menu=5"><a href="javascript:void(0)">CLIENTE</a></li>
                        <li @click="menu=6"><a href="javascript:void(0)">CATEGORÍAS</a></li>
                    </ul>
                </li>

                <li> 
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-list"></i><span class="hide-menu"> INFORMES</span></a>
                    <ul aria-expanded="false" class="collapse">
                        <li @click="menu=7"><a href="javascript:void(0)"> VENTAS</a></li>
                        <li @click="menu=8"><a href="javascript:void(0)"> SIN STOCK</a></li>
                        <li @click="menu=9"><a href="javascript:void(0)"> STOCK</a></li>
                    </ul>
                </li>

                <li> 
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-folder"></i><span class="hide-menu"> DOCUMENTOS</span></a>
                    <ul aria-expanded="false" class="collapse">
                        <li @click="menu=10"><a href="javascript:void(0)"> EMPRESAS</a></li>
                        <li @click="menu=11"><a href="javascript:void(0)"> COTIZACIONES</a></li>
                        <li @click="menu=12"><a href="javascript:void(0)"> ORDENES DE COMPRA</a></li>
                    </ul>
                </li>
                
                <li> 
                    <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa fa-usd"></i><span class="hide-menu"> VENTAS</span></a>
                    <ul aria-expanded="false" class="collapse">
                        <li @click="menu=13"><a href="javascript:void(0)"> NORMAL</a></li>
                        <li @click="menu=14"><a href="javascript:void(0)"> PREMIUM</a></li>
                        <li @click="menu=15"><a href="javascript:void(0)"> PENDIENTES</a></li>
                    </ul>
                </li>

                <li> <a class="waves-effect waves-dark" href="{{ route('logout') }}" aria-expanded="false" onclick="event.preventDefault();document.getElementById('logout-form').submit();"><i class="fa fa-sign-out" aria-hidden="true"></i> <span class="hide-menu">CERRAR SESIÓN</span> </a><form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">@csrf</form></li>
            </ul>
        </nav>
    </div>
</aside>
