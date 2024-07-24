@php
    $route = Auth::user()->role_name == 'admin' ? 'admin' : 'customer';
@endphp
<link rel="stylesheet" href="{{ asset('css/sidebar.css') }}">
<div class="side-bar">
    <header>
        <img src="{{ asset('image/bootstrap.png') }}" alt="logo">
        <h1>Logo Here</h1>
    </header>

    <div class="menu">
        <div class="item">
            <a class="nav-link {{ request()->is('admin/dashboard') ? 'active' : '' }}" href="/admin/dashboard">
                <i class="fas fa-desktop"></i>
                Dashboard
            </a>
        </div>
        <div class="item"><a class="sub-btn"><i class="fas fa-table"></i>Tables
                <i class="fas fa-angle-right dropdown"></i>
            </a>
            <div class="sub-menu">
                <a class="sub-item nav-link {{ request()->is("{$route}/books") || request()->is("{$route}/books/*") ? 'active' : '' }}"
                    href="/{{ $route }}/books">Book</a>
                <a class="sub-item nav-link {{ $route == 'customer' ? 'd-none' : '' }} {{ request()->is('admin/users') || request()->is('admin/users/*') ? 'active' : '' }}"
                    href='/{{ $route }}/users' class="sub-item">User</a>
            </div>
        </div>
        <div class="item"><a href=""><i class="fas fa-th"></i>Forms</a></div>
        <div class="item"><a class="sub-btn"><i class="fas fa-cog"></i>Settings
                <i class="fas fa-angle-right dropdown"></i>
            </a>
            <div class="sub-menu">
                <a href="" class="sub-item">Sub Item 01</a>
                <a href="" class="sub-item">Sub Item 02</a>
            </div>
        </div>
        <div class="item"><a href=""><i class="fas fa-info-circle"></i> About</a></div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

<script>
    $(document).ready(function() {
        $('.sub-btn').click(function() {
            $(this).next('.sub-menu').slideToggle();
            $(this).find('.dropdown').toggleClass('rotate');
        });

        $('.close-btn').click(function() {
            $('.side-bar').removeClass('active');
            $('.menu-btn').css('visibility', 'visible');
        });
    });

    $(window).on('load', function() {
        $('.sub-btn').each(function() {
            if ($(this).next('.sub-menu').find('a.active').length > 0) {
                $(this).next('.sub-menu').css("display", "block");
                $(this).find('.dropdown').toggleClass('rotate');
            }
        });
    });
</script>
