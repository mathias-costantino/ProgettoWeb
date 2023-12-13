"use strict";

class App{
    constructor(appContainer, navBtnToolBar){
        this.appContainer = appContainer;
        this.navBtnToolBar = navBtnToolBar;
        this.userLoggedIn = null;
        this.userProfile = null;

        //per non inviare richieste multiple ad ogni pagina ricaricata
        this.homeListenersDefined = false;

        page('/home', () => {
            this.appContainer.innerHTML = '';
            this.MostraHomePage();
        });

        page('/professori', () => {
            this.appContainer.innerHTML = '';
            this.MostraPaginaInsegnanti();
        });

      

        //altri url non validi portano direttamente alla home page
        page('*', () => {
            page('/home');
        });

        page();
    }



    MostraHomePage(){
        this.appContainer.innerHTML = createHomePage();

        if(this.homeListenersDefined == true) return;

        document.getElementById('homebtn').addEventListener('click', () => {
            page('/home');
        });

        document.getElementById('professoribtn').addEventListener('click', () => {
            page('/professori');
        });

        this.homeListenersDefined = true;
        
    }

    async MostraPaginaInsegnanti(){
        this.appContainer.innerHTML = creaPaginaInsegnanti();
        const listaInsegnanti = document.getElementById("professori-lista");


        let professori = await Api.TuttiProfessori();
        console.log("ecco i tuoi professori ", professori);
        //  let professori = await Api.TuttiProfessori();

        if(professori.length == 0){
            listaInsegnanti.innerHTML = "Non ci sono Professori.";
        }

        this.MostraCardProfili(professori, listaInsegnanti, CreaCardProfessori);

        const filters = document.forms["form-professori"];

        filters.addEventListener('submit', async (event) => {
            event.preventDefault();

            const citta = filters.elements['citta'].value;
            const provincia = filters.elements['provincia'].value;
            const insegnamenti = filters.elements['insegnamenti'].value;

            // use a filtering query based on values received from the form to filter data (filtering is done server-side)
            let filtroProfessori = await Api.TuttiProfessori(`Città=${citta}&Provincia=${provincia}&Insegnamenti=${insegnamenti}`);
            filtroProfessori = filtroProfessori;

            if (filtroProfessori.length == 0) {
                professorilista.innerHTML = "Nessun professore trovato con questi valori";
                return;
            }

            // reset page's content
            professorilista.innerHTML = "";

            // calls a custom function to generate and insert in the grid layout all musicians's profile cards
            this.MostraCardProfili(filtroProfessori, listaInsegnanti, CreaCardProfessori);
        });
    }

    MostraCardProfili(utenti, listacontainer, creaCard, colsNum, colClass){
        const numeroColonne = colsNum || 2;
        const numRighe = Math.ceil(utenti.length / numeroColonne);

        let righe = [];
        for(let i=0; i<numRighe; i++){
            righe[i] = document.createElement('div');
            righe[i].classList = "row list-row";
        }

        let count = 0;
        let righeindex = 0;

        for(let utente of utenti){
            alert(utente);
            console.log(utente);
            let card = creaCard(utente);

            let col = document.createElement('div');
            col.classList = colClass || "col-md-5";

            col.innerHTML = card;

            let bottone = col.getElementsByClassName('btn')[0];
            bottone.addEventListener('click', event => {
                event.preventDefault();
                let profileID = bottone.getAttribute('profileID');
                let profileType = bottone.getAttribute('profileType')
                this.showProfile(profileID, profileType);
            });
        

        righe[righeindex].appendChild(col);

        if(count%numeroColonne == numeroColonne-1){
            listacontainer.appendChild(righe[righeindex]);
            righeindex=righeindex+1;
            if(righeindex>righe.length) return;
        }
        else if(count==utenti.length-1){
            listacontainer.appendChild(righe[righeindex]);
            return;
        }
        count=count+1;
        }
    }

}
