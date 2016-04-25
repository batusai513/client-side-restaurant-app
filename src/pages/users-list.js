import React, {createClass, PropTypes} from 'react';
import RestaurantStaffList from 'components/admin-restaurants/restaurant-staff-list';
import Modal from 'components/modal';
import RegisterPersonelModal from 'components/register-personel-modal';
import ModalMixin from 'components/modal-mixin'; //remove when implement redux

const UsersList = createClass({
  displayName: 'Users-list',
  mixins: [ModalMixin],
  render(){
    return(
      <div>
        <div className="grid grid--middle push--bottom">
          <div className="grid__item medium--one-eighth">
            <h1 className="delta flush weight--light">Personal</h1>
          </div><div className="grid__item medium--seven-eighths">
            <div className="grid">
              <div className="grid__item medium--one-half">
                <form action="" className="form-inline">
                  <div className="form-group has-feedback has-feedback--reverse">
                    <input className="form-control form-control-material input--small" placeholder="Buscar Empleado" type="text" />
                    <span className="form-control-feedback icon-search icon-lg"></span>
                  </div>
                </form>
              </div><div className="grid__item medium--one-half text--end">
                <a href="#" onClick={this.openModal} className="button button--secondary button--wide button--small simple-modal">Registrar Empleado</a>
              </div>
            </div>
          </div>
        </div>
        <RestaurantStaffList />
        <Modal
            open={this.state.isModalOpen}
            onClose={this.closeModal}
            className="panel--medium">
            <RegisterPersonelModal />
        </Modal>
      </div>
    );
  }
});

export default UsersList;
