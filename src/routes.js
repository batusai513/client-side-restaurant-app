import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from './pages/main-layout';
import RestaurantLayout from './pages/restaurant-layout';
import Restaurant from './pages/restaurant';
import DishesList from './pages/dishes-list';
import TablesList from './pages/tables-list';
import Order from './pages/orders-new';
import UsersList from './pages/users-list';
import AdminLayout from './pages/admin-layout';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AdminRestaurantList from './pages/admin-restaurant-list';
import AdminRestaurantNew from './pages/admin-restaurant-new';
import AdminRestaurantShow from './pages/admin-restaurant-show';
import KitchenLayout from './pages/kitchen-layout';
import KitchenPage from './pages/kitchen';


export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={LoginPage} />
    {/*<Route path="register" component={RegisterPage} />*/}
    <Route path="restaurante/:id" component={RestaurantLayout}>
      <IndexRoute component={Restaurant} />
      <Route path="menu" component={DishesList} />
      <Route path="mesas" component={TablesList} />
      <Route path="personal" component={UsersList} />
      <Route path="reportes" component={Order} />
    </Route>
    <Route path="restaurante/:id/cocina" component={KitchenLayout}>
      <IndexRoute component={KitchenPage} />
    </Route>
    <Route path="restaurante/:id/ordenes" component={"div"}>
    </Route>
    <Route path="admin" component={AdminLayout}>
      <IndexRoute component={AdminRestaurantList} />
      <Route path="restaurante/:id" component={AdminRestaurantShow} />
    </Route>
  </Route>
);