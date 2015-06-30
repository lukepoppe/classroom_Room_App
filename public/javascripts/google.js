var userName, userImage;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    userName = profile.getName();
    userImage = profile.getImageUrl();



    findhuman(profile.getEmail().toLowerCase());
    hideSignInButton();


}

// Google Signout
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
            $('.g-signin2').removeClass('hidden');
            $('.signOutButton').addClass('hidden');
    });
}

//$('.g-signin2').on('click', function () {
//        $('.g-signin2').hide();
//        $('.signOutButton').show();
//});

$('.signOutButton').on('click', function () {
        signOut();
        $('.userNameDom').empty();
        $('.userImageDom').empty();
});




