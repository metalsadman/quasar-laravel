# Laravel 8x + Quasar Framework v2.+

## Setup

> rename or copy .env.example to .env

```bash
backend $ cp .env.example .env
```

```bash
# install php dependencies
backend $ composer install

# Node.js >= 12.22.x is required.
frontend $ npm install -g @quasar/cli
# install yarn
frontend $ npm install -g yarn
# install node dependencies
frontend $ yarn

# generate key
backend $ php artisan key:generate

# set privileges to node_modules folder (optional)
# frontend $ chmod -R u+x node_modules/
```

## Dev

```bash
#first start the back-end (don't use the artisan's serve url in this mode)
backend $ php artisan serve

#then build for development mode

frontend $ quasar dev | -m <mode>
```

## Production

```bash
#build for production (it'll generate and copy the necessary files)

frontend $ quasar build | -m <mode>
backend $ php artisan serve
```

> `Check out`quasar.conf.js``

## Sample App

> Examples in this repo (except auth implementations) are taken from my codesandbox examples https://codesandbox.io/s/quasar-v1-samples-0ybb3

```bash
#install laravel passport dependency
backend $ composer require laravel/passport
#migration
backend $ php artisan migrate
#generate laravel passport keys
backend $ php artisan passport:install
```

## Laravel License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Quasar License

Copyright (c) 2016-2019 Razvan Stoenescu
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
