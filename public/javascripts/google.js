
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

        var userNameProf = profile.getName();

        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('profile: '+ profile);

        var userName = profile.getName();
        $('.userNameDom').append(userName);
            console.log("userNameProf: " + userNameProf);

    var userImage = profile.getImageUrl();
        $('.userImageDom').append('<img src=" ' +userImage+' "id="userImageDom">');
            console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());


    findhuman(profile.getEmail().toLowerCase());

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




