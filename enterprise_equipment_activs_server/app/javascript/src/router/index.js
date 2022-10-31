import Bids from "../pages/Bids";
import Login from "../pages/Login";
import Users from "../pages/Users";
import Units from "../pages/Units";
import Profile from "../pages/Profile";
import Statistics from "../pages/Statistics";
import AdminLoader from "../pages/AdminLoader";

export const privateRoutes = [
    {path: '/bids_list', component: Bids, exact: true},
    {path: '/bids_list/:id', component: Bids, exact: true},
    {path: '/users_list', component: Users, exact: true},
    {path: '/units_list', component: Units, exact: true},
    {path: '/units_list/:id', component: Units, exact: true},
    {path: '/statistics', component: Statistics, exact: true},
    {path: '/admin', component: AdminLoader, exact: true},
]

export const publicRoutes = [
    {path: '/sign_in', component: Login, exact: true},
]
