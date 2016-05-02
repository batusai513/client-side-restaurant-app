import Firebase from 'firebase';
import * as actionTypes from 'constants/action-types';
import {closeDishesModal} from './dishes-modal';
import {ref} from 'constants/firebase';

export function fetchDishes(restaurantId){
  return function fetchDishesThunk(dispatch){
    const dishesRef = ref.child(`restaurants/${restaurantId}/dishes`);
    dishesRef.once('value')
      .then(snapshot => {
        dispatch({ type: actionTypes.FETCH_DISHES, payload: snapshot.val() });
      });
  };
}

export function removeDish(item, restaurantId){
  return function removeDishThunk(dispatch){
    const {id} = item;
    ref.child(`restaurants/${restaurantId}/dishes/${id}`)
      .remove()
      .then(() => dispatch({type: actionTypes.REMOVE_DISH, payload: item}))
      .catch(error => {throw new Error(error);} );
  };
}

export function addOrEditDish(dish, restaurantId){
  return function addOrEditDishThunk(dispatch, getState){
    const {name, id} = dish;
    const dishesRef = ref.child(`restaurants/${restaurantId}/dishes`);

    if(!id){
      addDish(dish, dispatch, dishesRef);
    }else{
      editDish(dish, dispatch, dishesRef);
    }
  };
}

function addDish(dish, dispatch, ref) {
  const newDishRef = ref.push();
  const dishId = newDishRef.key();

  delete dish.id;

  newDishRef.set(dish)
    .then(() => {
      dispatch({ type: actionTypes.ADD_DISH, payload: {[dishId]: dish} });
      dispatch(closeDishesModal());
    })
    .catch(error => {throw new Error(error);} );
}

function editDish(dish, dispatch, ref){
  const id = dish.id;
  delete dish.id;

  ref.child(id)
    .update(dish)
    .then(() => dispatch(updateDish({ [id]: dish })))
    .then(() => dispatch(closeDishesModal()))
    .catch(error => {throw new Error(error);} );
}

function updateDish(ingredient) {
  return {
    type: actionTypes.UPDATE_DISH,
    payload: ingredient
  };
}
