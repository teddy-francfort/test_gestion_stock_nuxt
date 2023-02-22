# Test - Interface de gestion de stock

*Développé par Teddy FRANCFORT en Février 2023 dans le cadre d'un processus de recrutement*

- Cette interface est développée avec Nuxt (la première fois que je développe avec).
- Elle a pour objectif de pouvoir interagir avec l'api de gestion de stock développée avec le framework PHP Laravel
- L'authentification se fait au travers de Laravel Sanctum

PS : Je suis conscient qu'une interconnexion entre Vue est Laravel et plus simple à mettre en place avec InertiaJS, 
cependant le but de l'exercice était de pouvoir faire interagir une application Vue avec une api développée avec Laravel 
avec une connexion via Laravel Sanctum.

PS : Beaucoup de console.log que j'ai laissé volontairement, mais bien évidemment dans le cadre d'un 
véritable projet pour la production ces derniers ne seraient pas présents. 

## Setup

Installation des dépendances :

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Connexion à l'API

L'url de connexion à l'api est configurée dans le fichier `app.config.ts` situé à la racine du projet

La configuration par défaut est la suivante :
`apiUrl: 'http://localhost:8000'`

Il s'agit de l'url par défaut lorsque l'on démarre le serveur de développement 
avec la commande `php artisan serve` sur Laravel

## Serveur de développement

Démarrer le serveur de développement sur http://localhost:3000

```bash
npm run dev
```
