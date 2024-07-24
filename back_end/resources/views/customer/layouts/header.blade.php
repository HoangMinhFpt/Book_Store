<nav class="navbar navbar-expand-sm bg-dark">
    <div class="container-fluid">
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link {{ request()->is('/') ? 'active' : '' }}" href="/">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->is('about') ? 'active' : '' }}" href="/about">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ request()->is("{$route}/products") || request()->is("{$route}/products/*") ? 'active' : '' }}"
                    href="/{{ $route }}/products">Product</a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ $route == 'customer' ? 'd-none' : '' }} {{ request()->is('admin/users') || request()->is('admin/users/*') ? 'active' : '' }}"
                    href='/{{ $route }}/users'>User</a>
            </li>
            <li class="nav-item {{ session('logged_in') ? 'd-none' : '' }}">
                <a class="nav-link {{ request()->is('login') ? 'active' : '' }}" href={{ route('login') }}>Login</a>
            </li>
        </ul>
        <div class="bg-white text-black d-flex justify-content-between">
            {{ session('logged_in') ? 'Welcome ' . session('user')->username : '' }}
            <form action="{{ route('logout') }}" method="get">
                <button type="submit" class="btn btn-primary">Logout</button>
            </form>
        </div>
    </div>
</nav>
