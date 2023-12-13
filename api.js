"use strict";

class Api{


      static TuttiProfessori = async (filterQuery) => {

        /*
        let url = "/api/professori";
        if (filterQuery) url += "?" + filterQuery;

        let response = await fetch(url, {
            method : 'get',
            headers : {
                'Accept': 'application/json'
            }
        });

        return await response.json();
        */

        const debugResponse = {
            professor1: {
                Nome: 'John Doe',
                Insegnamento: 'Computer Science',
            },
            professor2: {
                Nome: 'Jane Smith',
                Insegnamento: 'Mathematics',
            },
        };
        return await debugResponse;
    };

    
    

    static getProssoriID = async (ProfessoriID) => {
        let response = await fetch('/api/professori/' + ProfessoriID, {
            method : 'get',
            headers : {
                'Accept': 'application/json'
            }
        });

        return await response.json();
    };

    filtraDati(Arrayparametri, data) {

        if (Arrayparametri.length == 0) return data;
    
        for (let param in Arrayparametri) {
            data = data.filter(row => {
                if (row[param] === undefined) return true;    
                return row[param].toLowerCase().includes(Arrayparametri[param].toLowerCase());
            });
        }
        return data;
    }
    

    

}