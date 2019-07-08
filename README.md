# Laravel 5.8 + Quasar Framework v1.0.3 Stable (WIP)
## Build Setup
> rename or copy  .env.example to .env
``` bash
# install php dependencies
$ composer install

# Node.js >= Latest is required.
$ npm install -g @quasar/cli@latest

# install node dependencies
$ npm install
# or yarn
$ yarn

# generate key
$ php artisan key:generate

# set privileges to node_modules folder (optional)
# chmod -R u+x node_modules/

# first start the back-end (don't use the artisan's serve url in this mode)
$ php artisan serve
# run quasar
$ quasar dev

# to run just laravel along with the quasar fe, issue a quasar build then php artisan serve as usual
```
Check out `quasar.conf.js`

## Laravel License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Quasar License

Copyright (c) 2016-2019 Razvan Stoenescu
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
