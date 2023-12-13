CREATE TABLE "Annunci" (
	"AnnuncioID"	INTEGER NOT NULL UNIQUE,
	"AutoreID"	INTEGER NOT NULL,
	"AutoreTipo"	TEXT NOT NULL,
	"Pubblicazione"	TEXT NOT NULL,
	"Titolo"	TEXT NOT NULL,
	"Descrizione"	TEXT DEFAULT 'Descrizione non presente',
	"Citta"	TEXT NOT NULL,
	"Provincia"	TEXT NOT NULL,
	PRIMARY KEY("AnnuncioID" AUTOINCREMENT)
);

CREATE TABLE "Professori" (
	"ProfessoriID"	INTEGER NOT NULL UNIQUE,
	"Nome"	TEXT NOT NULL,
	"Cognome"	TEXT NOT NULL,
	"Eta"	INTEGER NOT NULL,
	"Email"	TEXT NOT NULL,
	"Citta"	TEXT NOT NULL,
	"Provincia"	TEXT NOT NULL,
	"Telefono"	INTEGER NOT NULL,
	"Descrizione"	TEXT DEFAULT 'Descrizione non presente',
	"Insegnamento"	TEXT NOT NULL,
	"Fotoprofilo"	TEXT NOT NULL DEFAULT null,
	PRIMARY KEY("ProfessoriID" AUTOINCREMENT),
	FOREIGN KEY("ProfessoriID") REFERENCES "ProfessoriCredenziali"("ProfessoriID")
);

CREATE TABLE "ProfessoriCredenziali" (
	"ProfessoriID"	INTEGER NOT NULL UNIQUE,
	"Email"	TEXT NOT NULL UNIQUE,
	"Password"	TEXT NOT NULL,
	PRIMARY KEY("ProfessoriID" AUTOINCREMENT)
);

CREATE TABLE "Studenti" (
	"StudentiID"	INTEGER NOT NULL UNIQUE,
	"Nome"	TEXT NOT NULL,
	"Cognome"	TEXT NOT NULL,
	"Email"	TEXT NOT NULL,
	"Eta"	INTEGER NOT NULL,
	"Citta"	TEXT NOT NULL,
	"Provincia"	TEXT NOT NULL,
	"Telefono"	INTEGER NOT NULL,
	"Fotoprofilo"	TEXT NOT NULL DEFAULT null,
	PRIMARY KEY("StudentiID" AUTOINCREMENT),
	FOREIGN KEY("StudentiID") REFERENCES "StudentiCredenziali"("StudentiID")
);

CREATE TABLE "StudentiCredenziali" (
	"StudentiID"	INTEGER NOT NULL UNIQUE,
	"Email"	TEXT NOT NULL UNIQUE,
	"Password"	TEXT NOT NULL,
	PRIMARY KEY("StudentiID" AUTOINCREMENT)
);




