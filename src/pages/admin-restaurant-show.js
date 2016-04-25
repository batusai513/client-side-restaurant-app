import React, {createClass, PropTypes} from 'react';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import RestaurantStaffList from 'components/admin-restaurants/restaurant-staff-list';
import RestaurantDetail from 'containers/admin-restaurants/restaurant-detail';

const AdminRestaurantShow = createClass({
  displayName: 'Admin-restaurant-show',
  render(){
    return(
      <div>
        <h1 className="delta weight--light">Restaurante Las Comidas</h1>
        <Tabs>
          <TabList>
            <Tab>General</Tab>
            <Tab>Staff</Tab>
          </TabList>
          <TabPanel title="General">
            <h1>General</h1>
            <RestaurantDetail restaurantId={this.props.params.id} />
          </TabPanel>
          <TabPanel title="staff">
            <h1>Staff</h1>
            <RestaurantStaffList />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
});

export default AdminRestaurantShow;
