import React, {createClass, PropTypes} from 'react';

const STATES = {
  'QUEUED': 'En Cola'
};

export default createClass({
  displayName: 'orders-list',
  propTypes: {
    waiterId: PropTypes.string.isRequired,
    orders: PropTypes.array,
    fetchOrders: PropTypes.func.isRequired,
    fetchOrdersForWaiter: PropTypes.func.isRequired,
    restaurantId: PropTypes.string.isRequired,
    listenForWaiterOrders: PropTypes.func.isRequired,
    stopListenningForWaiterOrders: PropTypes.func.isRequired
  },
  componentDidMount(){
    this.props.fetchOrdersForWaiter(this.props.waiterId, this.props.restaurantId);
    this.props.listenForWaiterOrders(this.props.restaurantId);
  },
  componentWillUnmount(){
    this.props.stopListenningForWaiterOrders(this.props.restaurantId);
  },
  renderOrder(order){
    var createdAtDateObj = new Date(order.createdAt);
    var createdAtDate = [createdAtDateObj.getDate(), createdAtDateObj.getMonth(), createdAtDateObj.getFullYear()].join('/');
    var createdAtTime = [createdAtDateObj.getHours(), createdAtDateObj.getMinutes(), createdAtDateObj.getSeconds()].join(':');

    return (
      <article className="tile" key={order.id} index={order.id}>
        <p>{STATES[order.state]}</p>
        <div className="tile__footer">
          <h1 className="zeta flush--top tile__title">Orden #1</h1>
          <p className="tile__text">
            Fecha de creación: {createdAtDate}
            <br />
            Hora de creación: {createdAtTime}
          </p>
          <p className="tile__text">Mesa {order.table}</p>
        </div>
      </article>
    );
  },
  render(){
    var {orders, restaurantId} = this.props;
    return (
      <div className="grid-tiles">
        {this.props.orders.map(this.renderOrder)}
      </div>
    );
  }
});
