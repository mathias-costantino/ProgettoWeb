"use strict";

// this template creates the musicians page adding all the filters and creating the div where all the cards will be inserted
function creaPaginaInsegnanti() {
    return `
    <br>
    <br>
    <h1 style="margin-left: 100px";>Ricerca Professori per: </h1>

    <form id="form-professori" style="margin-left: 300px; margin-right: 300px";>
      <label for="citta" class="label" for="input">Città</label>
      <input class="input" type="text" id="input" placeholder="Inserire città...">

      <label for="provincia" class="label" for="input">Provincia</label>
      <input class="input" type="text" id="input" placeholder="Inserire provincia...">

      <label for="insegnamenti" class="label" for="input">Insegnamenti</label>
      <input class="input" type="text" id="input" placeholder="Inserire materia...">

      <br><br>
      <button id="login-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login-modal">Filtra</button>
      <br><br>
    


    </form>

    <div id="professori-lista" class="col-xl-3 col-sm-6">
    </div>
    `;
}

// this template creates a group card used to display all informations stored in a group object

function CreaCardProfessori(professore) {
    return `

    <div class="col-xl-3 col-sm-6">
    <div lass="card">
        <div class="card-body">
 
            <div class="d-flex align-items-center">
                <div><img src="${professore.Fotoprofilo}" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
                <div class="flex-1 ms-3">
                    <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">${professore.Nome} ${professore.Cognome}</a></h5>
                    <span class="badge badge-soft-success mb-0">${professore.Citta}</span>
                    <span class="badge badge-soft-success mb-0">${professore.Provincia}</span>
                    <span class="badge badge-soft-success mb-0">${professore.Descrizione}</span>
                </div>
            </div>
            <div class="mt-3 pt-1">
                <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i>${professore.Contatti}</p>
                <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i>${professore.Insegnamento}</p>
            </div>
            <div class="d-flex gap-2 pt-4">
            <button type="button" class="btn btn-soft-primary btn-sm w-50" professoreID=${professore.ProfessoriID} profileType="PROFESSORE"><i class="bx bx-user me-1"></i> Vedi profilo</button>       
            </div>
        </div>
    </div>
    </div>
    `;
}

    /*
    <div class="card">
    <img src="${avvocato.foto}" alt="Foto Avvocato">
    <h3>${avvocato.nome}</h3>
    <p>${avvocato.studio}</p>
    <p>Classe ${avvocato.classe}</p>
    <p>${avvocato.sede}</p>
  </div>
}
*/

/*

function CreaCardProfessori(professore) {
    return `
    <div class="card">
    <img src="${professore.Fotoprofilo}" alt="Foto Avvocato">
    <h3>${professore.Nome}</h3>
    <p>${professore.Cognome}</p>
    <p>Classe ${professore.Citta}</p>
    <p>${professore.Provincia}</p>
    </div>
    `;
}*/
