firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location = "./bh40anos-login-adm.html"
  }
});

function logout() {
  firebase.auth().signOut()
}