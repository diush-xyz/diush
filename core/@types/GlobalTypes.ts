export interface IUser {
    id: string;
    displayName: string;
    email: string;
    photoURL: string;
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

export enum SignupMethod {
    EMAIL,
    PHONE,
}

export enum LoggedInScreen {
    HOME,
    CATALOG,
}
