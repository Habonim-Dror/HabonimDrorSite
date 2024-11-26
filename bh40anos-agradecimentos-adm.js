var firebaseConfig = {
  apiKey: "AIzaSyBxcD12AKt1pPVwmAY6RjHyPGKql13vOA0",
  authDomain: "habonim-dror-br.firebaseapp.com",
  databaseURL: "https://habonim-dror-br.firebaseio.com",
  projectId: "habonim-dror-br",
  storageBucket: "habonim-dror-br.appspot.com",
  messagingSenderId: "221051152021",
  appId: "1:221051152021:web:d2b64193c600a9f456dd9c",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function removerAgradecimento() {
  var categoria = $("#agradecimento-categoria").val();
  var nome = $("#agradecimento-nome").val();
  if (categoria != "") {
    if (nome !== "") {
      $("#modalConfirmarAgradecimento").modal("show");
      $("#modalConfirmarBtnAgradecimento").on("click", async () => {
        var data = {};
        data[nome] = firebase.firestore.FieldValue.delete();
        var docRef = db.collection("agradecimentos").doc(categoria);
        var doc = await docRef.get();
        doc.exists ? docRef.update(data) : alert("Categoria não existe");
        $("#modalConfirmarAgradecimento").modal("hide");
      });
    } else {
      $("#modalConfirmarCategoria").modal("show");
      $("#modalConfirmarBtnCategoria").on("click", async () => {
        var docRef = db.collection("agradecimentos").doc(categoria);
        var doc = await docRef.get();
        doc.exists ? docRef.delete() : alert("Categoria não existe");
        $("#modalConfirmarCategoria").modal("hide");
      });
    }
  } else {
    alert("Preencha todos os campos!");
  }
  $("#agradecimento-nome").val("");
}

async function adicionarAgradecimento() {
  var categoria = $("#agradecimento-categoria").val();
  var nome = $("#agradecimento-nome").val();
  if (categoria != "" && nome != "") {
    var data = {};
    data["nome"] = categoria;
    data[nome] = null;
    var docRef = db.collection("agradecimentos").doc(categoria);
    var doc = await docRef.get();
    doc.exists ? docRef.update(data) : docRef.set(data);
  } else {
    alert("Preencha todos os campos!");
  }
  $("#agradecimento-nome").val("");
}

$(() => {
  db.collection("agradecimentos")
    .orderBy("nome")
    .onSnapshot(function (querySnapshot) {
      $("#agradecimentos").html("");
      querySnapshot.forEach(function (doc) {
        $("#agradecimentos").append(`
        <div id=${
          "agradecimentos-linha-" + doc.id.replace(/\s/g, "")
        } class="row my-2 my-lg-4 w-100 text-center mx-0">
            <div class="col-12 col-sm-4 border-right border-secondary d-flex align-items-center justify-content-center">
                <p class="h1 text-center text-red m-0 text-break">${doc.id}</p>
            </div>
            <div class="col-12 col-sm-2 d-flex flex-column justify-content-center" id="${
              "name-col-" + doc.id.replace(/\s/g, "")
            }"></div>
        </div>
        <div class="dropdown-divider"></div>
            `);
        var colId = "#name-col-" + doc.id.replace(/\s/g, "");
        var len = Object.entries(doc.data()).length;
        for (var i = 0; i < len; i++) {
          var name = Object.entries(doc.data())[i];
          if (i != 0 && i % Math.ceil(len / 4) == 0) {
            $("#agradecimentos-linha-" + doc.id.replace(/\s/g, "")).append(`
                <div class="col-12 col-sm-2 d-flex flex-column justify-content-center" id="${
                  "name-col-" + doc.id.replace(/\s/g, "") + i
                }"></div>
            `);
            colId = "#name-col-" + doc.id.replace(/\s/g, "") + i;
          }
          if (name[0] != "nome") {
            $(colId).append(`
              <p class="text-center text-body m-0">${name[0]}</p>
              `);
          }
        }
      });
    });
});
