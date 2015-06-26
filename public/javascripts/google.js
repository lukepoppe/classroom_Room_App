// Google Login Authorization Function
var profile;
var signInShowing;

function onSignIn(googleUser) {
     profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.

    var userName = profile.getName();
        $('.userNameDom').append(userName);
            console.log('Name: ' + profile.getName());

    var userImage = profile.getImageUrl();
        $('.userImageDom').append('<img src=" ' +userImage+' "id="userImageDom">');
            console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    hideSignInButton();


}
function hideSignInButton() {
            //console.log(profile +': inFunction');
        if (profile != null) {
            $('.g-signin2').hide();
            $('.signOutButton').show();
        } else {
            $('.signOutButton').hide();
        }
            //console.log(profile + "profile2");
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
        //console.log("signOutButton");
        signOut();
        $('.userNameDom').empty();
        $('.userImageDom').empty();
        $('.g-signin2').show();
        $('.signOutButton').hide();
});


