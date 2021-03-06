import React, {PropTypes} from 'react';
import CartaItem  from './carta-item';

const WaiterCarta = React.createClass({
  propTypes: {
    addToOrder: PropTypes.func.isRequired,
    dishes: PropTypes.array
  },
  renderDish(item, index){
    return (
      <CartaItem key={item.id} index={item.id} details={item} addToOrder={this.props.addToOrder} />
    );
  },
  render(){
    return (
      <section>
        <h1 className="delta weight--light">Carta</h1>
        <ul className="carta">
          {this.props.dishes.map(this.renderDish)}
        </ul>
      </section>
    );
  }
});

export default WaiterCarta;
