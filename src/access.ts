export const isLoggedAccess = ({ authentication: { item } }) => {
    return !!item
};

export const restrictedToUserAccess = (key: string) => {
    return ({ authentication: { item } }) =>
        item === undefined ? false : (!!item.isAdmin || { [key]: item.id });
};

export const autoAccess = { create: false, update: false, read: true };
