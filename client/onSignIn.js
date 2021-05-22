function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const oAuth = profile.getId() + "";
  const userName = profile.getEmail().split("@")[0];
  const reqBody = { oauth: oAuth, username: userName };
  fetch("/api/oauthLogin", {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(reqBody),
  })
  .catch((err) => console.log("could not login"));
  let idToken = googleUser.getAuthResponse().id_token;
}
