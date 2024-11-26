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

var storageRef = storage.ref()

var listRef = storageRef.child("/bh40anos-fotos/");

function abrirModal(id) {

  $(".carousel-item.active").removeClass("active")
  $("#" + id).addClass("active")

  $("#fotoModal").modal("show")
}

listRef.listAll().then(function (res) {
  $("#fotos").html("")
  var count = 1
  res.items.forEach(function (itemRef) {
    itemRef.getDownloadURL().then(function (url) {
      $("#fotos").append(`
      <img src="${url}" onclick="abrirModal('${'foto' + count}')" class="img-thumbnail m-1 img-responsive foto-album">
    `)
      $("#foto-carousel").append(`
      <div class="carousel-item" id='${'foto' + count++}'>
       <img src="${url}" class="d-block w-100" style="max-height: 85vh">
      </div>
      `)
    })
  });
})


