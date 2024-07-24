<x-modal id="create-book-modal" :show="$store . state . isCreatingBook">
    <x-slot name="title" class="text-lg font-semibold">
        {{ __('Create Book') }}
    </x-slot>

    <form method="POST" action="{{ route('admin.books.store') }}" class="space-y-6">
        @csrf

        <div>
            <x-input-label for="title" :value="__('Title')" />

            <x-text-input id="title" class="block mt-1 w-full" type="text" name="title" required autofocus />
            <x-input-error :messages="$errors->get('title')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-input-label for="author" :value="__('Author')" />

            <select id="author" name="author_id" class="block mt-1 w-full" required>
                <option value="" disabled selected>{{ __('Select Author') }}</option>
                @foreach ($authors as $author)
                    <option value="{{ $author->author_id }}">{{ $author->author_name }}</option>
                @endforeach
            </select>
            <x-input-error :messages="$errors->get('author_id')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-input-label for="genre" :value="__('Genre')" />

            <select id="genre" name="genre_id" class="block mt-1 w-full" required>
                <option value="" disabled selected>{{ __('Select Genre') }}</option>
                @foreach ($genres as $genre)
                    <option value="{{ $genre->genre_id }}">{{ $genre->genre_name }}</option>
                @endforeach
            </select>
            <x-input-error :messages="$errors->get('genre_id')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-input-label for="stock_quantity" :value="__('Stock Quantity')" />

            <x-text-input id="stock_quantity" class="block mt-1 w-full" type="number" name="stock_quantity" required />
            <x-input-error :messages="$errors->get('stock_quantity')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-input-label for="price" :value="__('Price')" />

            <x-text-input id="price" class="block mt-1 w-full" type="number" name="price" required />
            <x-input-error :messages="$errors->get('price')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-input-label for="book_image" :value="__('Book Image')" />

            <x-text-input id="book_image" class="block mt-1 w-full" type="text" name="book_image" required />
            <x-input-error :messages="$errors->get('book_image')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Create') }}
            </x-primary-button>
        </div>
    </form>
</x-modal>
