import { File, Text } from '@keystonejs/fields';
import { LocalFileAdapter } from '@keystonejs/file-adapters';
import { App } from '../controllers/App';
import { isLoggedAccess } from '../access';

const fileAdapter = new LocalFileAdapter({ src: process.env.STORAGE_PATH || '../storage' });

App.keystone.createList('MediaFile', {
    fields: {
        name: { type: Text },
        file: { type: File, adapter: fileAdapter }
    },
    access: {
        read: isLoggedAccess,
        create: isLoggedAccess,
        update: false,
        delete: false,
    },
});