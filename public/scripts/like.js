/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

 function likeFreet(fields) {
    fetch(`/api/likes`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function unlikeFreet(fields) {
    fetch(`/api/likes/${fields.freetId}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewLikesOfFreet(fields) {
    fetch(`/api/likes/freets/${fields.freetId}`)
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewLikesByUser(fields) {
    fetch(`/api/likes/users/${fields.userId}`)
      .then(showResponse)
      .catch(showResponse);
  }