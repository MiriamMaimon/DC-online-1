
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export const IS_PUBLIC_KEY = 'isPublic';
export const CLIENT_TYPE_KEY = 'ClientType';
//export const Client = (type: ClientType) => SetMetadata(CLIENT_TYPE_KEY, type);
//const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));