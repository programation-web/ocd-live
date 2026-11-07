# OCD Live

Site vitrine responsive et prototype de parcours de réservation pour OCD Live.

## Démarrer

```bash
npm install
npm run dev
```

Le site est servi par défaut sur [http://localhost:3000](http://localhost:3000).

## Déployer sur Vercel

Le projet utilise Next.js. Le fichier `vercel.json` fixe le framework et les commandes
d'installation et de build ; aucune variable d'environnement n'est requise pour la maquette.

### Déploiement depuis GitHub

1. Publier le dépôt GitHub qui contient le dossier `ocd-live`.
2. Dans Vercel, importer ce dépôt et définir **Root Directory** sur `ocd-live`.
3. Laisser Vercel détecter le framework **Next.js**.
4. Conserver la commande de build `npm run build` et laisser le champ du dossier de sortie vide.
5. Déployer. Vercel installera les dépendances à partir de `package-lock.json`.

Si `ocd-live` constitue lui-même la racine du dépôt, garder **Root Directory** à `./`.

### Dépendances et sécurité

Next.js est fixé à la version corrective `15.5.28`. Les dépendances transitives PostCSS
et Sharp sont verrouillées sur `8.5.23` et `0.35.5` pour inclure leurs correctifs de
sécurité. Le lockfile est inclus pour que Vercel installe ces mêmes versions.

Vérifier régulièrement les dépendances avant un déploiement :

```bash
npm ci
npm audit
npm run typecheck
npm run build
```

### Déploiement avec la CLI Vercel

Depuis ce dossier, installer la CLI Vercel puis exécuter `vercel` pour un aperçu ou
`vercel --prod` pour publier en production. La CLI doit être liée au bon projet et au
bon compte Vercel avant le déploiement.

### Avant la mise en production

La maquette affiche le formulaire, mais n'enregistre pas les réservations. Ne pas
collecter de véritables coordonnées de clients tant qu'un backend sécurisé, une politique
de confidentialité et un processus de confirmation n'ont pas été mis en place. Les prix
des cinq packages autres que Découverte restent à confirmer.

## Prototype et prochaines étapes

- Le package Découverte affiche le tarif indicatif de 20 000 FCFA. Les cinq autres packages sont affichés « Sur devis », leurs tarifs n'étant pas encore confirmés.
- Le calendrier et les créneaux disponibles sont des données de démonstration pour décembre 2026.
- Le parcours collecte les coordonnées et informations commerciales dans l'interface, mais ne transmet ni ne sauvegarde aucune donnée.
- La confirmation est une démonstration : aucun e-mail, notification WhatsApp, paiement ou numéro de réservation réel n'est généré.
- Avant une mise en production, connecter les tarifs et disponibilités à un backend, définir le flux de confirmation et les règles de réservation, puis intégrer les moyens de paiement et notifications retenus.
