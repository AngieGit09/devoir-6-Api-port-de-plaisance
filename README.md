API Port de plaisance
Mini-appli Node/Express + MongoDB pour gérer Catways, Réservations et Utilisateurs.
Front HTML/CSS servi par Express. Doc interactive via Swagger.

LIENS
Application : https://devoir-6-api-port-de-plaisance.onrender.com/
Documentation API (Swagger) : https://devoir-6-api-port-de-plaisance.onrender.com/api-docs

IDENTIFIANT 
Email : plaisance@port.local
Mot de passe : 123456
Email : admin@port.local
Mot de passe : un_vrai_mot_de_passe

FONCTIONNALITES
Authentification : login / logout
Dashboard : réservations en cours (date du jour, identité de l’utilisateur)
CRUD complet :
Catways : numéro unique, type (long | short), état
Réservations : catway, client, bateau, dates (validation : endDate > startDate)
Utilisateurs : création, liste, détail par email, mise à jour, suppression
Validation côté serveur (Mongoose + contrôleurs)
Doc API interactive (Swagger)

PREREQUIS
Node.js ≥ 18
MongoDB Atlas (URI de connexion)

LANCEMENT
Front : http://localhost:3000/
: http://localhost:3000/_health (renvoie { state|mongoState: 1 })
Doc : http://localhost:3000/api-docs

ROUTES

AUTHENTIFICATION
POST /login
GET /logout

CATWAYS
GET /catways
POST /catways
GET /catways/:id
PUT /catways/:id
PATCH /catways/:id
DELETE /catways/:id

RESERVATION
GET /reservations
POST /reservations
GET /reservations/:id
PUT /reservations/:id
PATCH /reservations/:id
DELETE /reservations/:id

UTILIDATEURS
GET /users
POST /users
GET /users/:email
PUT /users/:email
DELETE /users/:email

TECHNOLOGIES UTILISEES
Backend : Node.js, Express
Base de données : MongoDB Atlas, Mongoose
Documentation : Swagger (swagger-ui-express, swagger-jsdoc)
Frontend : HTML / CSS (statique, servi par Express)

DEPLOIEMENT (RENDER)
Build : npm install
Start : npm start
Variables d’environnement : MONGO_URI, NODE_ENV=production
Le serveur écoute process.env.PORT (fallback 3000)

VALIDATION
Catway : catwayNumber unique & entier ≥ 1 ; catwayType ∈ {long,short}; catwayState trim + longueur bornée.
Réservation : endDate > startDate ; champs requis ; (optionnel) contrôle de chevauchement.
