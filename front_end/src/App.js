import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerHomePage from './pages/CustomerHomePage';
import BookPage from './pages/admin/BookPage';
import BookPageCus from './pages/customer/BookPageCus';
import PrivateRoute from './utils/PrivateRoute';
import AdminLayout from './layouts/AdminLayout';
import UserPage from './pages/admin/UserPage';
import AuthorPage from './pages/admin/AuthorPage';
import GenrePage from './pages/admin/GenrePage';
import BookDetail from './pages/admin/BookDetail';
import AuthorDetail from './pages/admin/AuthorDetail';
import UserDetail from './pages/admin/UserDetail';
import Auth from './pages/Auth';
import OrderPage from './pages/admin/OrderPage';
import OrderDetail from './pages/admin/OrderDetail';
import CustomerLayout from './layouts/CustomerLayout';
import AuthorPageCus from './pages/customer/AuthorPageCus';
import GenrePageCus from './pages/customer/GenrePageCus';
import CartPageCus from './pages/customer/CartPageCus';
import WishlistPageCus from './pages/customer/WishlistPageCus';
import ProfilePageCus from './pages/customer/ProfilePageCus';
import BookDetailCus from './pages/customer/BookDetailCus';
import ToastNotification from './components/ToastNotification';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss'
import { useSelector } from 'react-redux';
import SearchResults from './components/search/SearchResults';

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <AuthProvider>
      <div className={`app ${theme}`}>
        <Router>
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute role="customer" />}>
              <Route element={<CustomerLayout />} >
                <Route path="" element={<CustomerHomePage />} />
                <Route path="book" element={<BookPageCus />} />
                <Route path="book/:id" element={<BookDetailCus />} />
                <Route path="author" element={<AuthorPageCus />} />
                <Route path="genre" element={<GenrePageCus />} />
                <Route path="cart" element={<CartPageCus />} />
                <Route path="profile" element={<ProfilePageCus />} />
                <Route path="wishlist" element={<WishlistPageCus />} />
                {/* <Route path="/search" element={<SearchResults />} /> */}
              </Route>
            </Route>
            <Route path="/admin/*" element={<PrivateRoute role="admin" />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="books" element={<BookPage />} />
                <Route path="books/:id" element={<BookDetail />} />
                <Route path="users" element={<UserPage />} />
                <Route path="users/:id" element={<UserDetail />} />
                <Route path="authors" element={<AuthorPage />} />
                <Route path="authors/:id" element={<AuthorDetail />} />
                <Route path="genres" element={<GenrePage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="orders/:id" element={<OrderDetail />} />
              </Route>
            </Route>
          </Routes>
          <ToastNotification />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;