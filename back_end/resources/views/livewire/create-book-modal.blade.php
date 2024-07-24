<div>
    <button wire:click="showModal" class="btn btn-primary">
        Create Book
    </button>

    <x-modal id="create-book-modal" :show="$showModal">
        <x-slot name="title" class="text-lg font-semibold">
            {{ __('Create Book') }}
        </x-slot>
    </x-modal>
</div>
