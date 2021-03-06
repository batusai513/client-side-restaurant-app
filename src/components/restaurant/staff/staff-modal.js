import React, {createClass, PropTypes} from 'react';
import Modal from 'components/modal/';
const {func, shape, object, bool, string} = PropTypes;

export default createClass({
  displayName: 'staff-modal',
  propTypes: {
    openStaffModal: func.isRequired,
    closeStaffModal: func.isRequired,
    addOrEditStaffMember: func.isRequired,
    resetForm: func.isRequired,
    handleSubmit: func.isRequired,
    destroyForm: func.isRequired,
    fields: shape({
      name: object,
      email: object
    }).isRequired,
    restaurantId: string.isRequired,
    invalid: bool,
    isOpen: bool,
    isEditting: bool,
    submitting: bool
  },
  clearFormAndCloseModal(){
    var {closeStaffModal, resetForm} = this.props;
    closeStaffModal();
    this.props.destroyForm();
  },
  render(){
    var {
      fields: {name, email, role, uid},
      invalid,
      handleSubmit,
      submitting,
      openStaffModal,
      restaurantId,
      closeStaffModal,
      isEditting,
      isOpen,
      addOrEditStaffMember
    } = this.props;
    var modalTitle = isEditting ? 'Editar Empleado' : 'Nuevo Empleado';
    return(
      <span>
      <button onClick={openStaffModal} className="button button--secondary button--small">
        {'Crear Empleado'}
      </button>
        <Modal
          isOpen={isOpen}
          onCloseHandler={this.clearFormAndCloseModal}>
          <article id="new-restaurant" className="panel panel--full-space panel--medium mfp-with-anim" style={{clear: 'both'}}>
            <form onSubmit={handleSubmit((data) => addOrEditStaffMember(data, restaurantId))}>
              <input type="hidden" {...uid}/>
              <div className="panel__body">
                <h1 className="popup__title delta">{modalTitle}</h1>
                  <div className={`form-group has-feedback has-feedback--reverse ${name.touched && name.error && 'has-error'}`}>
                    <input name="name" className="form-control form-control-material" placeholder="Nombre del empleado" type="text" {...name} />
                    <span className="form-control-feedback icon-user"></span>
                  </div>
                  {
                    !isEditting ? (
                      <div className={`form-group has-feedback has-feedback--reverse ${email.touched && email.error && 'has-error'}`}>
                        <input name="email" className="form-control form-control-material" placeholder="Email" type="email" {...email} />
                        <span className="form-control-feedback icon-user"></span>
                      </div>
                    ) : null
                  }
              </div>
              <div className="grid grid--full">
                <div className="grid__item one-half">
                  <button className="button button--block button--secondary" disabled={submitting || invalid} type="submit">Guardar</button>
                </div>
                <div className="grid__item one-half">
                  <button className="button button--block button--danger" disabled={submitting} onClick={this.clearFormAndCloseModal} type="button">Cancelar</button>
                </div>
              </div>
            </form>
          </article>
        </Modal>
        </span>
    );
  }
});
