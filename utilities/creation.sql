CREATE TABLE ventes
(
    "num_vente"  serial PRIMARY KEY ,
    "np_portion" integer,
    "date_vente" date
);

CREATE TABLE utilisateurs
(
    "num_utilisateur" serial PRIMARY KEY ,
    "nom_utilisateur" varchar(100) NOT NULL,
    "prenom_utilisateur" varchar(100) NOT NULL,
    "mail" varchar(100) NOT NULL,
    "is_admin" boolean DEFAULT false
);

CREATE TABLE categories(
    "libelle_categorie" varchar(100) PRIMARY KEY
);

CREATE TABLE types_ingredients(
    "libelle_type" varchar(100) PRIMARY KEY
);

CREATE TABLE unites(
    "libelle_unite" varchar(100) PRIMARY KEY
);

CREATE TABLE allergenes(
    "code_allergene" int PRIMARY KEY,
    "libelle_allergene" varchar(100)
);

CREATE TABLE ingredients(
    num_ingredient serial PRIMARY KEY,
    nom_ingredient varchar(100),
    prix_unitaire real,
    stock real,
    code_allergene int,
    libelle_unite varchar(100),
    libelle_type varchar(100),
    FOREIGN KEY (code_allergene)
                        REFERENCES allergenes (code_allergene),
    FOREIGN KEY (libelle_unite)
                        REFERENCES unites (libelle_unite),
    FOREIGN KEY (libelle_type)
                        REFERENCES types_ingredients (libelle_type)
);

CREATE TABLE fiches(
                       num_fiche serial PRIMARY KEY,
                       nom_fiche varchar(200),
                       nb_couvert int,
                       auteur int,
                       FOREIGN KEY (auteur)
                           REFERENCES utilisateurs (num_utilisateur)
);

CREATE TABLE etapes_generales (
    num_etape serial PRIMARY KEY,
    nom_etape varchar(100),
    ordre int,
    fiche_proprietaire int,
    FOREIGN KEY (fiche_proprietaire)
                              REFERENCES fiches(num_fiche)
);

CREATE TABLE etapes_description(
    description varchar(500)
) INHERITS (etapes_generales);

CREATE TABLE etapes_fiche(
    num_fiche int,
    FOREIGN KEY (num_fiche)
                         REFERENCES fiches(num_fiche)
) INHERITS (etapes_generales);

CREATE TABLE couts(
    num_cout serial PRIMARY KEY,
    cout_horaire_moyen real,
    cout_horaire_forfaitaire real,
    temps_total int,
    coeff_multiplicateur real,
    num_fiche int,
    FOREIGN KEY (num_fiche)
                 REFERENCES fiches (num_fiche)
);

CREATE TABLE contenir(
    num_fiche int,
    num_ingredient int,
    quantite real,
    FOREIGN KEY (num_fiche)
                     REFERENCES fiches(num_fiche),
    FOREIGN KEY (num_ingredient)
                     REFERENCES ingredients(num_ingredient)
);

CREATE TABLE etre_categorie(
    num_fiche int,
    libelle_categorie varchar(100),
    FOREIGN KEY (num_fiche)
                           REFERENCES fiches(num_fiche),
   FOREIGN KEY (libelle_categorie)
                           REFERENCES categories(libelle_categorie)
)



