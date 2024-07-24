@extends('admin.layouts.app')
@section('content')
    <h1 style="color: red">This is books page</h1>
    {{-- <livewire:create-book-modal /> --}}
    {{-- <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#create-book-modal">
        Create Book
    </button>
    <x-modal id="create-book-modal" :show="$store . state . isCreatingBook">
        <x-slot name="title" class="text-lg font-semibold">
            {{ __('Create Book') }}
        </x-slot>

        <form method="POST" action="{{ route('admin.books.create') }}" class="space-y-6">
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
    </x-modal> --}}

    <table class="table table-bordered border-primary table-striped table-hover">
        <thead>
            <tr class="text-capitalize text-center">
                <th class="col-2" scope="col">book name</th>
                <th class="col-1" scope="col">author</th>
                <th class="col-1" scope="col">genre</th>
                <th class="col-1" scope="col">count</th>
                <th class="col-1" scope="col">price</th>
                <th class="col-2" scope="col">book image</th>
                <th class="col-2" scope="col">book description</th>
                <th class="col-1" scope="col">action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($books as $book)
                <tr>
                    <td><a href="/admin/books/{{ $book->book_id }}" class="text-decoration-none">
                            {{ $book->title }}
                        </a></td>
                    <td class="text-center">{{ $book->author->author_name }}</td>
                    <td class="text-center">{{ $book->genre->genre_name }}</td>
                    <td class="text-center">{{ $book->stock_quantity }}</td>
                    <td class="text-center">{{ $book->price }}</td>
                    <td class="text-center align-middle">
                        <img class="img-fluid" src="{{ asset('image/books/Harry1.jpg') }}" height="50%" width="50%"
                            {{ $book->book_image === '' ? 'hidden' : '' }}>
                    </td>

                    <td class="description-cell text-center">
                        <p class="description-content"
                            style="display: {{ $book->bookDescription === '' ? 'none' : 'inline' }}">
                            <span class="description-less">
                                {{ substr($book->bookDescription, 0, 100) }}...
                            </span>
                            <span>
                                <span class="full-description" style="display: none;">
                                    {{ $book->bookDescription }}
                                </span>
                                <button class="show-more-btn btn btn-link text-decoration-none"
                                    style=" border: 0; outline: 0; box-shadow: none;">Show
                                    more</button>
                            </span>
                        </p>
                    </td>
                    <script>
                        document.addEventListener("DOMContentLoaded", function() {
                            var descriptionCells = document.querySelectorAll('.description-cell');
                            descriptionCells.forEach(function(cell) {
                                var descriptionContent = cell.querySelector('.description-content');
                                var descriptionLess = cell.querySelector('.description-less');
                                var fullDescription = cell.querySelector('.full-description');
                                var showMoreBtn = cell.querySelector('.show-more-btn');

                                function toggleDescription() {
                                    if (fullDescription.style.display === 'none') {
                                        descriptionLess.style.display = 'none';
                                        fullDescription.style.display = 'inline';
                                        showMoreBtn.textContent = 'Show less';
                                    } else {
                                        descriptionLess.style.display = 'inline';
                                        fullDescription.style.display = 'none';
                                        showMoreBtn.textContent = 'Show more';
                                    }
                                }

                                showMoreBtn.addEventListener('click', toggleDescription);
                            });
                        });
                    </script>
                    <td>
                        <div class="d-flex align-items-center justify-content-around">
                            <button class="btn btn-primary bg-none">
                                <a href="/admin/books/{{ $book->book_id }}/edit" role="button"
                                    class="text-decoration-none text-white">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </a>
                            </button>

                            <form action="/admin/books/{{ $book->book_id }}" method="POST" style="margin-block-end: 0">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger bg-none"><i
                                        class="fa-solid fa-trash"></i></button>
                            </form>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
