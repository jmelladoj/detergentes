<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Documento;
use PDF;
use Illuminate\Database\Eloquent\Collection;

class cotizacion extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Documento $documento, Collection $detalle_documento, String $valido)
    {
        //
        $this->documento = $documento;
        $this->detalle_documento = $detalle_documento;
        $this->valido = $valido;
        $this->pdf = PDF::loadView('pdf/cotizacion', ['documento' => $documento,
                                                      'detalle_documento' => $detalle_documento,
                                                      'valido' => $valido
                                                      ])
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
                    ->subject('Cotización')
                    ->view('emails/cotizacion')
                    ->attachData($this->pdf, 'Cotización.pdf', [
                        'mime' => 'application/pdf',
                    ]);
    }
}
