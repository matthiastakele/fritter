/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function addAlbum(fields){
    fetch(`/api/albums`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function deleteAlbum(fields){
    fetch(`/api/albums/${fields.albumId}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function addCircleToAlbum(fields){
    fetch(`/api/albums/${fields.albumId}/circles`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function deleteCircleFromAlbum(fields){
    fetch(`/api/albums/${fields.albumId}/circles/${fields.circleId}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }

function addFreetToAlbum(fields){
    fetch(`/api/albums/${fields.albumId}/freets`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function deleteFreetFromAlbum(fields){
    fetch(`/api/albums/${fields.albumId}/freets/${fields.freetId}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
function viewAllCirclesInAlbum(fields){
    fetch(`/api/albums/${fields.albumId}/circles`)
      .then(showResponse)
      .catch(showResponse);
  }

function viewAllFreetsInAlbum(fields){
    fetch(`/api/albums/${fields.albumId}/freets`)
      .then(showResponse)
      .catch(showResponse);
  }
  
function viewAllAlbumsOfUser(fields){
    fetch(`/api/albums/user`)
      .then(showResponse)
      .catch(showResponse);
  }