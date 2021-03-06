import { normalize, Schema, valuesOf } from 'normalizr';
import Firebase, { ref } from 'constants/firebase';
import { createUserWithEmail, resetMemberPassword } from 'helpers/auth';
import {getInnerDataFromUrl, ArrayToObject} from 'helpers/format-helpers';

var staffSchema = new Schema('staff', {idAttribute: 'uid'});

export function fetchStaffFromRestaurant(restaurantId){
  var promise = ref.child(`restaurants/${restaurantId}/staff`)
    .once('value');
  return getInnerDataFromUrl(promise, ref, `restaurants_staff/`)
    .then(response => normalize(response, valuesOf(staffSchema)));
}

export function getMember(uid) {
  return ref.child(`restaurants_staff/${uid}`)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(member => normalize(member, staffSchema));
}

export function updateMember(userData) {
  var uid = userData.uid;
  return ref.child(`restaurants_staff/${uid}`)
    .update(Object.assign({}, {...userData}, {
      updatedAt: Firebase.ServerValue.TIMESTAMP
    }))
    .then(() => getMember(uid));
}

export function logout() {
  return ref.unauth();
}

export function destroyMember(uid, restaurantId){
  return Promise.all([
    removeMemberFromRestaurant(uid, restaurantId),
    removeMember(uid),
    addUserToBlackList(uid)
  ]);
}

function addUserToBlackList(uid){
  return ref.child(`blocked_users/${uid}`)
    .set(true);
}

function removeMember(uid){
  return ref.child(`restaurants_staff/${uid}`)
    .remove();
}

function removeMemberFromRestaurant(uid, restaurantId){
  var promise1 = ref.child(`restaurants/${restaurantId}/staff/${uid}`)
    .remove();
  var promise2 = ref.child(`restaurants/${restaurantId}/waiters/${uid}`)
    .remove();
  return Promise.all([promise1, promise2]);
}

export function createAndSaveWaiter(member, restaurantId){
  return createAndSaveMember(Object.assign({}, member, {role: 'waiter'}), restaurantId)
    .then(member => {
      var uid = member.uid;
      saveAsRestaurantWaiter(uid, restaurantId);
      return member;
    })
    .then((member) => getMember(member.uid));
}

export function createAndSaveAdmin(member, restaurantId){
  return createAndSaveMember(Object.assign({}, member, {role: 'admin'}), restaurantId)
    .then(member => {
      var uid = member.uid;
      saveAsRestaurantAdmin(uid, restaurantId);
      return member;
    })
    .then((member) => getMember(member.uid));
}

function createAndSaveMember(staffMember, restaurantId){
  var email = staffMember.email;
  return createUserWithEmail(email)
    .then(({uid}) => uid)
    .then(uid => {
      var object = Object.assign({}, staffMember, {
        createdAt: Firebase.ServerValue.TIMESTAMP,
        updatedAt: Firebase.ServerValue.TIMESTAMP,
        restaurant: restaurantId,
        uid
      });
      delete object.id;
      ref.child(`restaurants_staff/${uid}`)
        .set(object);
      return object;
    })
    .then(member => {
      var uid = member.uid;
      saveToRestaurantStaff(uid, restaurantId);
      return member;
    });
}

function saveToRestaurantStaff(uid, restaurantId){
  return ref.child(`restaurants/${restaurantId}/staff/${uid}`)
    .set(true);
}

function saveAsRestaurantAdmin(adminId, restaurantId){
  return ref.child(`restaurants/${restaurantId}/admin`)
    .set(adminId);
}

function saveAsRestaurantWaiter(uid, restaurantId) {
  return ref.child(`restaurants/${restaurantId}/waiters/${uid}`)
    .set(true);
}
