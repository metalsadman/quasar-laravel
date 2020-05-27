# Laravel 7x + Quasar Framework v1.+

## Setup

> rename or copy .env.example to .env

```bash
$ cp .env.example .env
```

```bash
# install php dependencies
$ composer install

# Node.js >= 8.9.0 is required.
$ npm install -g @quasar/cli
# install yarn
$ npm install -g yarn
# install node dependencies
$ yarn

# generate key
$ php artisan key:generate

# set privileges to node_modules folder (optional)
#$ chmod -R u+x node_modules/
```

## Dev

```bash
#first start the back-end (don't use the artisan's serve url in this mode)
$ php artisan serve

#then build for development mode

$ quasar dev | -m <mode>
```

## Production

```bash
#build for production (it'll generate and copy the necessary files)

$ quasar build | -m <mode>
$ php artisan serve
```

> `Check out`quasar.conf.js``

## Sample App

> Examples in this repo (except auth implementations) are taken from my codesandbox examples https://codesandbox.io/s/quasar-v1-samples-0ybb3

```bash
#install laravel passport dependency
$ composer require laravel/passport
#migration
$ php artisan migrate
#generate laravel passport keys
$ php artisan passport:install
```

## Laravel License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Quasar License

Copyright (c) 2016-2019 Razvan Stoenescu
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
