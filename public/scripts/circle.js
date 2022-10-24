/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function addCircle(fields){
    fetch(`/api/circles`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function deleteCircle(fields){
    fetch(`/api/circles/${fields.circleId}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function addUserToCircle(fields){
    fetch(`/api/circles/${fields.circleId}/users`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function deleteUserFromCircle(fields){
    fetch(`/api/circles/${fields.circleId}/users/${fields.username}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function viewAllUsersInCircle(fields){
    fetch(`/api/circles/${fields.circleId}/users`)
      .then(showResponse)
      .catch(showResponse);
  }
  
function viewAllCirclesOfUser(fields){
    fetch(`/api/circles`)
      .then(showResponse)
      .catch(showResponse);
  }