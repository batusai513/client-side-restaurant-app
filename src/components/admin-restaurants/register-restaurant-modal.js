import React, {createClass, PropTypes} from 'react';


export default createClass({
  displayName: 'register-restaurant-modal',
  propTypes: {
    closeCreateRestaurantModal: PropTypes.func.isRequired,
    addRestaurant: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.shape({
      name: PropTypes.object,
      address: PropTypes.object,
      phone: PropTypes.object
    }).isRequired,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool
  },
  clearFormAndCloseModal(){
    var {closeCreateRestaurantModal, resetForm} = this.props;
    resetForm();
    closeCreateRestaurantModal();
  },
  render(){
    var {fields: {name, address, phone}, invalid, handleSubmit, submitting, addRestaurant} = this.props;
    return(
      <article id="new-restaurant" className="panel panel--full-space panel--medium mfp-with-anim" style={{clear: 'both'}}>
        <form onSubmit={handleSubmit(addRestaurant)}>
          <div className="panel__body">
            <h1 className="popup__title delta">Nuevo Restaurante</h1>
              <div className={`form-group has-feedback has-feedback--reverse ${name.touched && name.error && 'has-error'}`}>
                <input name="name" className="form-control form-control-material" placeholder="Nombre del restaurante" type="text" {...name} />
                <span className="form-control-feedback icon-user"></span>
              </div>
              <div className={`form-group has-feedback has-feedback--reverse ${address.touched && address.error && 'has-error'}`}>
                <input name="address" className="form-control form-control-material" placeholder="Direccion" type="text" {...address} />
                <span className="form-control-feedback icon-user"></span>
              </div>
              <div className="form-group has-feedback has-feedback--reverse">
                <input name="phone" className="form-control form-control-material" placeholder="Telefono" type="tel" {...phone}/>
                <span className="form-control-feedback icon-phone"></span>
              </div>
          </div>
          <div className="grid grid--full">
            <div className="grid__item one-half">
              <button className="button button--block button--secondary" disabled={submitting || invalid} type="submit">Crear</button>
            </div>
            <div className="grid__item one-half">
              <button className="button button--block button--danger" disabled={submitting} onClick={this.clearFormAndCloseModal} type="button">Cancelar</button>
            </div>
          </div>
        </form>
      </article>
    );
  }
});