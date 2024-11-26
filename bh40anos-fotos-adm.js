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
var storage = firebase.storage()
var auth = firebase.auth()

var storageRef = storage.ref()

var listRef = storageRef.child("/bh40anos-fotos/")

function removerFoto(path) {
  itemRef = storageRef.child(path)
  $("#modalConfirmar").modal("show")
  $("#modalConfirmarBtn").on("click", () => {
    itemRef.delete().catch(function (error) {
      console.log(error)
    }).finally(() => {
      $("#modalConfirmar").modal("hide")
      getFotos()
    })
  })
}

function publicarFoto() {
  var files = $("#fotoPublicar").prop('files')

  if (files.length == 0) {
    alert("Selecione pelo menos 1 foto")
    return
  }

  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    var locRef = storageRef.child("/bh40anos-fotos/" + file.name)

    var task = locRef.put(file)

    task.on("state_changed",
      function progress(snapshot) {
        var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100

        $("#progress-bar").width(percentage + "%")
      },

      function error(error) {
        alert("Erro: " + error.message)
      },

      function success() {
        getFotos()
      }
    )
  }
}

function getFotos() {
  listRef.listAll().then(function (res) {
    var count = 1
    $("#fotos").html("")
    res.items.forEach(function (itemRef) {
      itemRef.getDownloadURL().then(function (url) {
        $("#fotos").append(`
      <div class="card m-2 card-album">
        <img src="${url}" class="card-img-top foto-card-album">
        <div class="card-body">
        <button href="#" class="btn btn-danger w-100" onClick="removerFoto('${itemRef.fullPath}')">Remover</button>
        </div>
      </div>
    `)
      })
    });
  })
}

$(() => {
  getFotos()

  $("#fotoPublicar").on("change", () => { $("#progress-bar").width(0) })
})

