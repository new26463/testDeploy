var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Uesr Model
 * ==========
 */
var Uesr = new keystone.List('Uesr');

Uesr.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Uesr.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Uesr.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Uesr.defaultColumns = 'name, email, isAdmin';
Uesr.register();
