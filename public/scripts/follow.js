/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function addFollow(fields){
    fetch(`/api/follows`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function deleteFollow(fields){
    fetch(`/api/follows${fields.userId}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function viewAllFollowers(fields){
    fetch(`/api/follows/${fields.userId}/followers`)
      .then(showResponse)
      .catch(showResponse);
  }
  
function viewAllFollowing(fields){
    fetch(`/api/follows/${fields.userId}/following`)
      .then(showResponse)
      .catch(showResponse);
  }