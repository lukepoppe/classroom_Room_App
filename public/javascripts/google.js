function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    var userNameProf = profile.getName();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('profile: ' + profile);

    var userName = profile.getName();
    $('.userNameDom').append(userName);
    console.log("userNameProf: " + userNameProf);

    var userImage = profile.getImageUrl();
    $('.userImageDom').append('<img src=" ' + userImage + ' "id="userImageDom">');
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    hideSignInButton(userNameProf, profile);

    findhuman(profile.getEmail().toLowerCase());

}
function hideSignInButton(userNameProf, profile) {
    //if signed out show nothing
    console.log('prof: ' + profile);
    console.log('nameCheck: ' + userNameProf);

    if (profile === undefined) {
        $('.g-signin2').show();
        $('.signOutButton').hide();
        $('.navBar').children('ul').hide();
        $('.helpModal').hide();
        $('.adminViews').hide();

        //if admin- show everything
    } else if (userNameProf == "Luke Poppe" || userNameProf == "Michael Liquori" || userNameProf == "Mary White" || userNameProf == "Casie Lynch") {
        $('.signOutButton').show();
        $('.g-signin2').hide();
        $('.navBar').children('ul').show();
        $('.helpModal').show();
        $('.adminViews').show();

    } else {
        $('.signOutButton').show();
        $('.g-signin2').hide();
        $('.navBar').children('ul').hide();
        $('.helpModal').show();
        $('.adminViews').hide();
    }
}

// Google Signout
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

$('.g-signin2').on('click', function () {
    $('.g-signin2').hide();
    $('.signOutButton').show();
});

$('.signOutButton').on('click', function () {
    signOut();
    $('.userNameDom').empty();
    $('.userImageDom').empty();
    $('.g-signin2').show();
    $('.signOutButton').hide();
    hideSignInButton();
});
