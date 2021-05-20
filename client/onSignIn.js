// called upon successful user authentication and login
// logs basic profile info and id token
// will not work in Incognito tabs
let idToken;

function onSignIn(googleUser) {
  console.log("onSignIn");
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  const oAuth = profile.getId() + "";
  const userName = profile.getEmail().split("@")[0];
  console.log("ID sent to server: ", oAuth);
  console.log("userName sent to server: ", userName);
  const reqBody = { oauth: oAuth, username: userName };
  fetch("/api/oauthLogin", {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(reqBody),
  })
    // .then(response => response.json())
    .catch((err) => console.log("could not login"));
  idToken = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + idToken);
}
