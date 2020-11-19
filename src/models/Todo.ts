import { Text, Select, DateTimeUtc } from '@keystonejs/fields';
import { AuthedRelationship } from '@keystonejs/fields-authed-relationship';
import { App } from '../controllers/App';
import { atTracking } from '@keystonejs/list-plugins';
import { autoAccess, restrictedToUserAccess, isLoggedAccess } from '../access';

App.keystone.createList('Todo', {
    fields: {
        todo: { type: Text, isRequired: true },
        state: { type: Select, options: 'done, pending', defaultValue: 'pending' },
        user: { type: AuthedRelationship, ref: 'User.todos', access: autoAccess },
        createdAt: { type: DateTimeUtc, access: autoAccess }
    },
    plugins: [
        atTracking({
            format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
        }),
    ],
    access: {
        read: restrictedToUserAccess('user'),
        create: isLoggedAccess,
        update: restrictedToUserAccess('user'),
        delete: restrictedToUserAccess('user'),
    },
});