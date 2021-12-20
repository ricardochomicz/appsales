<?php

namespace App\Listeners;

use App\Events\UserCreatedEvent;

class SendEmailToDefinePassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreatedEvent  $event
     * @return void
     */
    public function handle(UserCreatedEvent $event)
    {
        //enviar e-mail para redefinir a senha
        echo $event->getUser()->name;
    }
}
