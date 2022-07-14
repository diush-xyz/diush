export interface IUser {
    id: string;
    displayName: string;
    email: string;
    photoURL: string;
    location?: string;
    products?: IProduct[];
}

export interface IProduct {
    id: string;
    linkedUID: string;
    title: string;
    blurb: string;
    askingPrice: number;
    offers?: IOffer[];
    createdAt?: Date;
    categories?: ICategory[];
    condition?: ProductCondition;
    //TODO: Add more
}

export interface IOffer {
    id: string;
    placedByUID: string;
    linkedProductID: string;
    amount: number;
    isCounterOffer?: boolean;
}

export interface ICategory {
    id: string;
    linkedProductID: string;
    text: string;
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

export enum ProductCondition {
    NEW_WITH_BOX,
    NEW_WITHOUT_BOX,
    NEW_WITH_DEFECTS,
    USED,
}
