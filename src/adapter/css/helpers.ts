export const getUniqueKeyName = (key: string, common: string): string =>
    key.substring(0, key.indexOf(common));