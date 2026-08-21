import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import OrderFood from '../pages/food-partner/OrderFood ';
import FoodPartnerProfile from '../pages/food-partner/FoodPartnerProfile';
import UserOrders from '../pages/general/UserOrders';
import PartnerOrders from '../pages/food-partner/PartnerOrders';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/" element={<Navigate to="/user/login" />} />
                <Route path="/home" element={<><Home /><BottomNav /></>} />
                <Route path="/saved" element={<><Saved /><BottomNav /></>} />
                <Route path="/orders" element={<><UserOrders /><BottomNav /></>} />
                <Route path="/create-food" element={<CreateFood />} />
                <Route path="/food-partner/:id" element={<Profile />} />
                <Route path='/order' element={<OrderFood />} />
                <Route path="/food-partner/profile/:id" element={<FoodPartnerProfile />} />
                <Route path="/food-partner/orders" element={<PartnerOrders />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes