// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => {
    preParent.classList.remove('flashing');
  }, 300);
}

function showResponse(response) {
  response.json().then(data => {
    showObject({
      data,
      status: response.status,
      statusText: response.statusText
    });
  });
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 *
 * Native browser Fetch API documentation to fetch resources: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  // user
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  // freet
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
  // follow
  'add-follow': addFollow,
  'delete-follow': deleteFollow,
  'view-all-followers': viewAllFollowers,
  'view-all-following': viewAllFollowing,
  // like
  'like-freet': likeFreet,
  'unlike-freet': unlikeFreet,
  'view-likes-of-freet': viewLikesOfFreet,
  'view-likes-by-user': viewLikesByUser,
  // comment
  'comment-freet': commentFreet,
  'uncomment-freet': uncommentFreet,
  'view-comments-of-freet': viewCommentsOfFreet,
  'view-comments-by-user': viewCommentsByUser,
  // circle
  'add-circle': addCircle,
  'delete-circle': deleteCircle,
  'add-user-to-circle': addUserToCircle,
  'delete-user-from-circle': deleteUserFromCircle,
  'view-all-users-in-circle': viewAllUsersInCircle,
  'view-all-circles-of-user': viewAllCirclesOfUser,
  // album
  'add-album': addAlbum,
  'delete-album': deleteAlbum,
  'add-freet-to-album': addFreetToAlbum,
  'delete-freet-from-album': deleteFreetFromAlbum,
  'add-circle-to-album': addCircleToAlbum,
  'delete-circle-from-album': deleteCircleFromAlbum,
  'view-all-circles-in-album': viewAllCirclesInAlbum,
  'view-all-freets-in-album': viewAllFreetsInAlbum,
  'view-all-albums-of-user': viewAllAlbumsOfUser
  
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(form);
      handler(Object.fromEntries(formData.entries()));
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init;
