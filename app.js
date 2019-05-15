// https://www.npmjs.com/package/i18n-nodejs
// var config = {
//     "lang": "en",
//     "langFile": "./i18n/language.json"//relative path to index.js file of i18n-nodejs module
// }
// var i18n_module = require('./i18n.js');
// var i18n = new i18n_module(config.lang, config.langFile);
// console.log(i18n.__('hi'));
require('./i18n.js');
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

keystone.init({
	'name': 'i18n',
	'brand': 'i18n',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Uesr',
});


keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	uesrs: 'uesrs',
});

keystone.start();