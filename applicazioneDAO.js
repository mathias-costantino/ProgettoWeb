"use strict";

const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

class ApplicazioneDAO{
    constructor(){
        this.DBSOURCE = './data/DataBase.db';
        this.db = new sqlite.Database(this.DBSOURCE, (err) => {
            if(err){
                console.log(err);
                throw err;
            }
            console.log("Database acquisito con successo");
        });
    }


    NuovoProfessore(professore) {
        console.log("received:", professore);
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Professore VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            this.db.run(sql, [professore.ProfessoriID, professore.Nome, professore.Cognome, professore.Eta, professore.Citta, professore.Provincia, professore.Telefono,, professore.Descrizione, professore.Insegnamento, professore.Fotoprofilo], function (err) {
                if (err) return reject({"error" : err});
                return resolve({"profileID" : this.ultimoID});
            });
        });
    }

    ModificaProfessore(ProfessoriID, professore) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Professore SET Nome = ?, Cognome = ?, Eta = ?, Citta = ?, Provincia = ?, Telefono = ?, Descrizione = ?, Insegnamento = ?, Fotoprofilo = ?";
            this.db.run(sql, [professore.Nome, professore.Cognome, professore.Eta, professore.Citta, professore.Provincia, professore.Telefono, professore.Descrizione, professore.Insegnamento, professore.Fotoprofilo, ProfessoriID], function (err) {
                if (err) return reject({"error" : err});
                return resolve({"modifiche" : this.modifiche});
            });
        });
    }

    TuttiProfessori() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Professori";
            this.db.all(sql, function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : "Nessun professore trovato"});
                return resolve(row);
            });
        });
    }

    getProfessoridaID(ProfessoriID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Professori WHERE ProfessoriID = ?";
            this.db.get(sql, [ProfessoriID], function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : `Non sono presenti Professori con ProfessoriID (${ProfessoriID})`});
                return resolve(row);
            });
        });
    }

    NuovoStudente(studente) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Studenti VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            this.db.run(sql, [studente.StudentiID, studente.Nome, studente.Cognome, studente.Email, studente.Eta, studente.Citta, studente.Provincia, studente.Telefono, studente.Fotoprofilo], function (err) {
                if (err) return reject({"error" : err});
                return resolve({"StudentiID" : this.ultimoID});
            });
        });
    }

    modificaStudente(StudentiID, studente) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Studenti SET Nome = ?, Cognome = ?, Email = ?, Eta = ?, Citta = ?, Provincia = ?, Telefono = ?, Fotoprofilo = ? WHERE StudentiID = ?";
            this.db.run(sql, [studente.Nome, studente.Cognome, studente.Email, studente.Eta, studente.Citta, studente.Provincia, studente.Telefono, studente.Fotoprofilo, StudentiID], function (err) {
                if (err) return reject({"error" : err});
                return resolve({"modifiche" : this.modifiche});
            });
        });
    }

    TuttiStudenti() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Studenti";
            this.db.all(sql, function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : "Nessun studente trovato"});
                return resolve(row);
            });
        });
    }

    getStudentidaID(StudentiID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Studenti WHERE StudentiID = ?";
            this.db.get(sql, [StudentiID], function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : `Nessun studente trovato con (${StudentiID})`});
                return resolve(row);
            });
        });
    }

    NuovoAnnuncio(annunci) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Annunci (AnnuncioID, AutoreID, AutoreTipo, Pubblicazione, Titolo, Descrizione, Citta, Provincia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            this.db.run(sql, [annunci.AnnuncioID, annunci.AutoreID, annunci.AutoreTipo, annunci.Pubblicazione, annunci.Titolo, annunci.Descrizione, annunci.Citta, annunci.Provincia], function(err) {
                if (err) return reject({"error" : err});
                return resolve({"AnnuncioID" : this.ultimoID});
            });
        });
    }

    RimuoviAnnuncio(annuncioID) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Annunci WHERE annuncioID = ?";
            this.db.run(sql, [annuncioID], function(err) {
                if (err) return reject({"error" : err});
                return resolve({"cambiamenti" : this.cambiamenti});
            });
        });
    }

    tuttiAnnunci() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Annunci";
            this.db.all(sql, function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : "Nessun annuncio trovato"});
                return resolve(row);
            });
        });
    }

    RitornaProfiloAnnuncio(AutoreID, AutoreTipo) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Annunci WHERE AutoreID = ? AND AutoreTipo = ?";
            this.db.all(sql, [AutoreID, AutoreTipo], function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : "Nessun annuncio trovato"});
                return resolve(row);
            });
        });
    }

    //Credenziali
    inserisciNuovoProfessore(professore) {
        return new Promise(async (resolve, reject) => {
            const sql = "INSERT INTO ProfessoriCredenziali (Email, Password) VALUES (?, ?)";
            const hash = await bcrypt.hash(professore.Password, 10);

            this.db.run(sql, [professore.Email, hash], function(err) {
                if (err) return reject({"error" : err});
                return resolve(this.ultimoID);
            });
        });
    }

    getCredenzialiProfessori(email, password) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM ProfessoriCredenziali WHERE Email = ?";
            this.db.get(sql, [email], function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : "Professori non presenti"});

                const user = {"ProfessoriID" : row.ProfessoriID, "Email" : row.Email};
                const check = bcrypt.compareSync(password, row.Password);
                return resolve({email, check});
            });
        });
    }

    getCredenzialiProfessoriID(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM ProfessoriCredenziali WHERE ProfessoriID = ?";
            this.db.get(sql, [id], function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : `Nessun professore trovato con ID: (${id})`});
                return resolve({"ProfessoriID" : row.ProfessoriID, "email" : row.Email});  
            });
        });
    }

    inserisciNuovoStudente(studente) {
        return new Promise(async (resolve, reject) => {
            const sql = "INSERT INTO StudentiCredenziali (Email, Password) VALUES (?, ?)";
            const hash = await bcrypt.hash(studente.Password, 10);

            this.db.run(sql, [studente.email, hash], function(err) {
                if (err) return reject({"error" : err});
                return resolve(this.ultimoID);
            });
        });
    }

    getStudentiCredenziali(user, password) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM StudentiCredenziali WHERE Email = ?";
            this.db.get(sql, [email], function(err, row) {
                if (err) return reject({"error" : err});
                if (row === undefined) return resolve({"error" : "Nessun studente trovato"});

                const user = {"StudentiID" : row.StudentiID, "email" : row.Email};
                const check = bcrypt.compareSync(password, row.Password);
                return resolve({email, check});
            });
        });
    }

    getStudentiCredenzialiID(id){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM StudentiCredenziali WHERE StudentiID = ?";
            this.db.get(sql, [id], function(err, row) {
                if(err) return reject({"error" : err});
                if(row==undefined) return resolve ({"error:": `Nessun Studente trovato con ID: (${id})`});
                return resolve({"StudentiID" : row.StudentiID, "email" : row.Email}); 
            })
        })
    }

}

module.exports = ApplicazioneDAO;