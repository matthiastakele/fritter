/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

 function commentFreet(fields) {
    fetch(`/api/comments`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function uncommentFreet(fields) {
    fetch(`/api/comments/${fields.commentId}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewCommentsOfFreet(fields) {
    fetch(`/api/comments/freets/${fields.freetId}`)
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewCommentsByUser(fields) {
    fetch(`/api/comments/users/${fields.userId}`)
      .then(showResponse)
      .catch(showResponse);
  }