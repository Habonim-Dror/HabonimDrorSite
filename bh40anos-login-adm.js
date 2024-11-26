var firebaseConfig = {
  apiKey: "AIzaSyBxcD12AKt1pPVwmAY6RjHyPGKql13vOA0",
  authDomain: "habonim-dror-br.firebaseapp.com",
  databaseURL: "https://habonim-dror-br.firebaseio.com",
  projectId: "habonim-dror-br",
  storageBucket: "habonim-dror-br.appspot.com",
  messagingSenderId: "221051152021",
  appId: "1:221051152021:web:d2b64193c600a9f456dd9c"
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location = "./bh40anos-fotos-adm.html"
  }
});


function toast_alerta(alerta, mensagem) {
  el = $('#toasts').children().length
  if (el == 0)
    $('body').append(`<div id="toasts" class="fixed-top m-2"></div>`)
  $('#toasts').append(`
    <div id="${"toast_" + el}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay=10000>   
      <div class="toast-header">
      <strong class="me-auto">${alerta}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body"><p>${mensagem}</p></div>
    </div>
      `)

  $("#toast_" + el).toast('show')
}

$(() => {
  $('#login_form').on("submit", (e) => {
    e.preventDefault()
    var email = $('#login_email').val()
    var senha = $('#login_senha').val()
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(() => {
        window.location = "./bh40anos-fotos-adm.html"
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        (errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password") ? toast_alerta("Erro ao logar", "Usuario ou senha invalidos") :
          console.log(errorCode, errorMessage)
      })
  })
})