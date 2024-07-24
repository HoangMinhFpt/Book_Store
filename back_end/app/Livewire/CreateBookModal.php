<?php

namespace App\Livewire;

use Livewire\Component;

class CreateBookModal extends Component
{
    public function render()
    {
        return view('livewire.create-book-modal');
    }

    public $showModal = false;

    public function showModal()
    {
        $this->showModal = true;
    }
}
