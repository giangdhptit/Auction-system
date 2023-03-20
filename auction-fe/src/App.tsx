import React from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import 'antd/dist/antd.min.css';
import "./styles/app.scss";
import Home from "./features/home/Home";
import AdminLogin from "./features/admin/AdminLogin";
import {connect} from "react-redux";
import {RootState} from "./store";
import {User} from "./model/user";
import Admin from "./features/admin/Admin";
import UserManage from "./features/admin/user_manage/UserManage";
import ItemManage from "./features/admin/item_manage/ItemManage";
import AuctionManage from "./features/admin/auction_manage/AuctionManage";

const mapState = (state: RootState) => ({
    user:state.auth.user || state.authAdmin.user,
});
type Props = {
    user: User|null;
};

const UserRoute=({user}:Props)=>{
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return  <Outlet />;
}

const AdminRoute=({user}:Props)=>{
    if (user?.role!=="admin") {
        return <Navigate to="/admin/login" replace />;
    }
    return <Outlet />;
}
const App = ({user}:Props) =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route element={<UserRoute user={user}/>}>
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route path="/admin" element={<AdminRoute user={user}/>}>
                    <Route path="/admin/home" element={<Admin/>}/>
                    <Route path="/admin/user-manage" element={<UserManage/>}/>
                    <Route path="/admin/item-manage" element={<ItemManage/>}/>
                    <Route path="/admin/auction-manage" element={<AuctionManage userCurrent={user}/>}/>
                </Route>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default connect(mapState,{})(App);