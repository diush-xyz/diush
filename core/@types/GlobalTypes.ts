export interface IUser {
    id: string;
    displayName: string;
    email: string;
    photoURL: string;
    username: string;
    products?: IProduct[];
}

export interface IProduct {
    id: string;
    uid: string;
    title: string;
    //TODO: Add more
}

export enum AuthStatus {
    SQUARE_ONE,
    LOGIN,
    SIGNUP,
    AUTHENTICATED,
}

export enum SignupMethods {
    EMAIL,
    PHONE,
}
