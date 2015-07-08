//var userName, userImage, userEmail;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    userName = profile.getName();
    userImage = profile.getImageUrl();
    userEmail = profile.getEmail().toLowerCase();
    APP.user.find(userEmail);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

$('.signOutButton').on('click', function () {
    signOut();
    $('.g-signin2').removeClass('hidden');
    $('.signOutButton').addClass('hidden');
    $('.userNameDom').empty();
    $('.userImageDom').empty();
});
