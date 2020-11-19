import { Checkbox, Password, Text, Relationship, DateTimeUtc } from '@keystonejs/fields';
import { App } from '../controllers/App';
import { atTracking } from '@keystonejs/list-plugins';
import { isLoggedAccess, restrictedToUserAccess, autoAccess } from '../access';

App.keystone.createList('User', {
    labelField: 'email',
    fields: {
        email: {
            type: Text,
            isUnique: true,
            access: ({ existingItem, authentication: { item } }) => {
                return process.env.DISABLE_AUTH === 'true' 
                    || item === undefined 
                    || !!item.isAdmin 
                    || existingItem.id === item.id;
            },
        },
        isAdmin: { type: Checkbox },
        password: { type: Password, isRequired: false },
        name: { type: Text, isRequired: true },
        todos: { type: Relationship, ref: 'Todo.user', many: true, access: autoAccess },
        createdAt: { type: DateTimeUtc, access: autoAccess },
    },
    plugins: [
        atTracking({
            format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
        }),
    ],
    access: {
        read: process.env.DISABLE_AUTH === 'true' || isLoggedAccess,
        create: true,
        auth: true,
        update: restrictedToUserAccess('user'),
        delete: restrictedToUserAccess('user'),
    },
});