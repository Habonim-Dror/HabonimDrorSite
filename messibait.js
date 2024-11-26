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

window.enviar = function () {
    if ($("#nome").val() != "" && $("#mensagem").val() != "")
        $('#formMensagem').submit()
    else
        alert("Preencha todos os campos")
}

$(() => {

    db.collection("messagesApproved").orderBy("data", "desc").onSnapshot(function (querySnapshot) {
        $("#mensagens").html("")
        querySnapshot.forEach(function (doc) {
            $("#mensagens").append(`
                <div class="card mb-3">
                    <div class="card-header texto">
                        ${doc.data().nome}
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>
                            ${doc.data().mensagem}
                            </p>
                            <footer class="blockquote-footer texto">
                            ${doc.data().data}
                            </footer>
                        </blockquote>
                    </div>
                </div>
            `)
        })
    })

    $("#formMensagem").on("submit", async function (e) {
        e.preventDefault()

        var nome = $("#nome").val()
        var mensagem = $("#mensagem").val()
        var data = new Date(Date.now())

        await db.collection("messages").doc().set({
            nome,
            mensagem,
            data: data.toLocaleString()
        }).then(function () {
            alert("Mensagem eviada! Ela será publicada após aprovação de seu conteúdo.")
            $("#nome").val("")
            $("#mensagem").val("")
            $("#modalMensagem").modal("hide")
        }).catch(function (error) {
            alert("Erro ao enviar mensagem: " + error)
        })
    })

    $("#modalMensagem").on("hidden.bs.modal", () => {
        $("#nome").val("")
        $("#mensagem").val("")
    })
})