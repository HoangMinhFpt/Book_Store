@php
    $currentUrl = url()->current();
    $path = parse_url($currentUrl, PHP_URL_PATH);
    $path = rtrim($path, '/');
    $segments = explode('/', $path);
    $lastSegment = end($segments);
@endphp
<link rel="stylesheet" href="{{ asset('css/header.css') }}">

<div class ="header-admin ">
    <div class="header-left">
        <button>
            <i class="fas fa-angles-left"></i>
        </button>
    </div>
    <div class="header-center">
        <input type="search" name="search" id="" placeholder="Search for..." class="search">
    </div>
    <div class="header-right">
        <div class="lang-menu">
            <nav class="nav-lang">
                <div class="selected-lang">
                    <a href="" class="vi">
                        <img src="{{ asset('image/usa.png') }}" alt="" class="img-lang">
                        English</a>
                </div>
                <ul class="lang-list">
                    <li>
                        <a href="" class="vi">
                            <img src="{{ asset('image/vietnam.png') }}" alt="" class="img-lang">
                            VietNam</a>
                    </li>
                    <li>
                        <a href="" class="en">
                            <img src="{{ asset('image/usa.png') }}" alt="" class="img-lang">
                            English</a>
                    </li>
                    <li>
                </ul>
            </nav>
        </div>
        <div class="header-right-content">
            <div class="header-right-content-mode">
                <i class='bx bx-moon' id="icon"></i>
            </div>
            <div class="header-right-content-setting">
                <i class="fas fa-cog"></i>
            </div>
            <div class="header-right-content-account">
                <img src="{{ asset('image/bootstrap.png') }}" alt="logo">
            </div>
        </div>
    </div>
</div>

<script>
    var icon = document.getElementById('icon');
    icon.onclick = function() {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            icon.classList = 'bx bx-sun';
        } else {
            icon.classList = 'bx bx-moon';
        }
    }
</script>
