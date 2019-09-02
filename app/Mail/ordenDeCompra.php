<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Documento;
use PDF;
use Illuminate\Database\Eloquent\Collection;

class ordenDeCompra extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
     public function __construct(Documento $documento, Collection $detalle_documento)
     {
         //
         $this->documento = $documento;
         $this->detalle_documento = $detalle_documento;
         $this->pdf = PDF::loadView('pdf/ordenCompra', ['documento' => $documento,
                                                       'detalle_documento' => $detalle_documento])
                          ->setPaper('A4', 'portrait')->output();
     }

    /**
     * Build the message.
     *
     * @return $this
     */
     public function build()
     {
         return $this->from('ventas@detergentesprocleaning.cl')
                     ->subject('Orden de Compra')
                     ->view('emails/ordenDeCompra')
                     ->attachData($this->pdf, 'OrdenDeCompra.pdf', [
                         'mime' => 'application/pdf',
                     ]);
     }
}
