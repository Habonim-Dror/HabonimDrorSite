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
var db = firebase.firestore()
var auth = firebase.auth()

async function deletar(id) {
    await db.collection("messages").doc(id).delete().then(alert("Mensagem apagada")).catch((error) => alert(error))
}

async function aprovar(nome, mensagem, data, id) {
    try {
        await db.collection("messagesApproved").doc().set({
            nome,
            mensagem,
            data
        })
        await db.collection("messages").doc(id).delete()
    } catch (error) {
        alert(error)
    } finally {
        alert("Mensagem aprovada!")
    }
}

$(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        $("#login_form").on("submit", async function (e) {
            e.preventDefault()

            var email = $("#login_email").val()
            var senha = $("#login_senha").val()

            auth.signInWithEmailAndPassword(email, senha).then(function () {
                $('#login_email').val("")
                $("#login_senha").val("")
            }).catch(function (error) {
                var errorCode = error.code
                var errorMessage = error.message
                // ...
                alert(errorCode + " : " + errorMessage)
            })
        })
    })

    auth.onAuthStateChanged(function (user) {
        if (user) {
            db.collection("messages").orderBy("data").onSnapshot(function (querySnapshot) {
                if (querySnapshot.size == 0)
                    $("body").html(`<div id="mensagens"><h1>Não há novas mensagens</h1></div>`)
                else
                    $("body").html(`<div id="mensagens"></div>`)

                querySnapshot.forEach(function (doc) {
                    $("#mensagens").append(`
                        <div class="card mb-3">
                            <div id=${doc.id + "_nome"} class="card-header">
                                ${doc.data().nome}
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p id=${doc.id + "_mensagem"}>
                                    ${doc.data().mensagem}
                                    </p>
                                    <footer id=${doc.id + "_data"} class="blockquote-footer">
                                    ${doc.data().data}
                                    </footer>
                                </blockquote>
                                <div id=${doc.id} class="float-right">
                                    <button class="aprovar btn btn-sm btn-success mt-2")">Aprovar</button>
                                    <button class="deletar btn btn-sm btn-danger mt-2">Excluir</button>
                                </div>
                            </div>
                        </div>
                    `)
                })
                $(".aprovar").on("click", (e) => {
                    var id = (e.target.parentElement.getAttribute('id'))
                    var nome = $("#" + id + "_nome").html()
                    var mensagem = $("#" + id + "_mensagem").html()
                    var data = $("#" + id + "_data").html()

                    aprovar(nome, mensagem, data, id)
                })
                $(".deletar").on("click", (e) => {
                    var id = e.target.parentElement.getAttribute('id')
                    deletar(id)
                })
            })
        }
    })
})