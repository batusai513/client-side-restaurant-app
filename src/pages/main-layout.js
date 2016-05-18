import React, {createClass, PropTypes} from 'react';
import {Logger} from 'containers/logger';

const MainLayout = createClass({
  displayName: 'Main-layout',
  propTypes: {
    children: PropTypes.node.isRequired
  },
  render(){
    return(
      <div className="main-layout full-height">
        {this.props.children}
        <Logger />
      </div>
    );
  }
});

export default MainLayout;
