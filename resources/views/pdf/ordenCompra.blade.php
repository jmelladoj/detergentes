<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Orden de Compra</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <style>
        body {
            text-align: justify;
        }

        h2 {
            font-family: 'Lucida Sans Unicode';
            font-size: 25px;
            color: #799F06;
            font-weight: bold;
        }

        h3 {
            font-family: 'Lucida Sans Unicode';
            font-size: 14px;
            color: #799F06;
            font-weight: bold;
        }

        .subTitulo {
            font-family:'Verdana';
            color: #276D9E;
            font-weight: bold;
            font-style: italic;
            font-size: 12px;
        }

        .textoHeader {
            font-family:'Myriad Pro'; 
            font-size:12px; 
            color:#276D9E;
        }

        .header {
            width: 100%; 
        }

        .cuerpo {
            margin-top: 20px;
            width: 100%;
            clear: both;
            font-size: 12px;
        }

        .izquierda {
            float: left;
            align-content: center;
            width: 25%;
        }

        .centro {
            float: left;
            align-content: center;
            width: 40%;
        }

        .derecha {
            float: left;
            width: 35%;
            align-content: center;
        }

        hr {
            clear: both;
            size: 0.5;
            color: #73A811;
            display: block;
        }

        .uno {
            float: left;
            width: 50%;
        }
        
        .dos {
            float: right;
            width: 50%;
        }

        table th {
            text-align: center;
        }

        footer{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 40px;
        }

        p{
            text-align: center;
        }

        .table td{
            padding: 0.30rem;
        }

        .table th{
            padding: 0.50rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <center><h2>ORDEN DE COMPRA</h2></center>
        <br>
        <div class="izquierda">
            <center><img src="{{ asset('public_intranet/images/Logo-procleaning.png') }}" alt="" height="70px"></center>
        </div>
        <div class="centro">
            <span class="subTitulo">Detergentes Procleaning Limitada</span><br>
            <span class="textoHeader">
                Rut: 76.433.817-0 <br>
                Giro:  Distribuidora de Productos de Aseo <br>
                Dirección: Ejercito 361, Concepción <br>
                Teléfono: 41-3230617
            </span>
        </div>
        <div class="derecha">
            <label for="">Fecha &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b> {{ $documento->fecha }} </b></label><br>
        </div>
    </div>
    <hr>
    <div class="cuerpo">
        <h3>EMPRESA</h3>
        <br>
        <div class="uno">
            <table>
                <tr>
                    <td>Razón Social</td>
                    <td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>
                    <td>{{ $documento->empresa->nombre }}</td>
                </tr>
                <tr>
                    <td>Giro</td>
                    <td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>
                    <td>{{ $documento->empresa->giro }}</td>
                </tr>
                <tr>
                    <td>Rut</td>
                    <td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>
                    <td>{{ $documento->empresa->rut }}</td>
                </tr>
                <tr>
                    <td>Dirección</td>
                    <td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>
                    <td>{{ $documento->empresa->direccion }}</td>
                </tr>
            </table>
        </div>
        <div class="dos">
            <table>
                <tr>
                    <td>Teléfono</td>
                    <td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>
                    <td>{{ $documento->empresa->telefono }}</td>
                </tr>
                <tr>
                    <td>Correo</td>
                    <td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>
                    <td>{{ $documento->empresa->correo }}</td>
                </tr>
                <tr>
                    <td>Comuna</td>
                    <td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>
                    <td>{{ $documento->empresa->comuna }}</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="cuerpo">
        <h3>DETALLE ORDEN DE COMPRA</h3>
        <br>
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>DESCRIPCIÓN</th>
                        <th>CANTIDAD</th>
                        <th>UNIDAD</th>
                        <th>VALOR UNITARIO</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($detalle_documento as $item)
                        <tr>
                            <td>{{ $item->producto }}</td>
                            <td>{{ $item->cantidad }}</td>
                            <td>{{ $item->unidad }}</td>
                            <td>${{ str_replace(",", ".", number_format($item->valor))  }}</td>
                            <td>${{ str_replace(",", ".", number_format((int)($item->cantidad) * (int)($item->valor))) }}</td>
                        </tr>
                    @endforeach

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td align="right">Neto :  </td>
                        <td align="center"><b>${{ str_replace(",", ".", number_format($documento->subtotal)) }}</b></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td align="right">IVA :  </td>
                        <td align="center"><b>${{ str_replace(",", ".", number_format($documento->total - $documento->subtotal)) }}</b></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td align="right">Total :  </td>
                        <td align="center"><b>${{ str_replace(",", ".", number_format($documento->total)) }}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="cuerpo">
        <h3>TÉRMINOS Y CONDICIONES</h3><br>
        @if(empty($documento->observacion))
            Sin observaciones.
        @else
            {{ $documento->observacion }}
        @endif
    </div>
    <footer>
        <p>
            Si usted tiene alguna pregunta sobre esta orden de compra, por favor, póngase en contacto con nosotros <br>
            41-3230617 - detergentesprocleaningltda@gmail.com<br>
            <b>Gracias por hacer negocios con nosotros!</b>
        </p>
    </footer>
</body>
</html>
