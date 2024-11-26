var firebaseConfig = {
  apiKey: "AIzaSyBxcD12AKt1pPVwmAY6RjHyPGKql13vOA0",
  authDomain: "habonim-dror-br.firebaseapp.com",
  databaseURL: "https://habonim-dror-br.firebaseio.com",
  projectId: "habonim-dror-br",
  storageBucket: "habonim-dror-br.appspot.com",
  messagingSenderId: "221051152021",
  appId: "1:221051152021:web:d2b64193c600a9f456dd9c"
}

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

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
  $('#redefinirSenha_email').on("change", () => {
    $('#redefinirSenha_aviso').attr('hidden', true)
  })

  $('#redefinirSenha_form').submit((e) => {
    e.preventDefault()
    email = $('#redefinirSenha_email').val()
    auth.sendPasswordResetEmail(email).then(function () {
      toast_alerta("Email enviado", "Verifique seu email e siga os passos para redefinição de senha")
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == "auth/user-not-found") {
        $('#redefinirSenha_aviso').attr('hidden', false)
        toast_alerta("Email não enviado", "O email digitado não está cadastrado. Verifique o email e tente novamente")
      } else
        console.log(errorCode, errorMessage)
    });
  })
})