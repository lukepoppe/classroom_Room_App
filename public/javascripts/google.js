var userName, userImage, userEmail;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    userName = profile.getName();
    userImage = profile.getImageUrl();
    userEmail = profile.getEmail().toLowerCase();
    // Initialize Arrays of all data (DUMMY data for now, will be from DB)
    getAllClassrooms();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

$('.signOutButton').on('click', function () {
    signOut();
    location.reload();
    $('.g-signin2').removeClass('hidden');
    $('.signOutButton').addClass('hidden');
    $('.userNameDom').empty();
    $('.userImageDom').empty();
});
