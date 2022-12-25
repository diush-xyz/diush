export interface IUser {
    id: string;
    displayName: string;
    email: string;
    photoURL: string;
    location?: string;
    // products?: IProduct[];
}

export interface IProduct {
    id: string;
    linkedUID: string;
    title: string;
    blurb: string;
    askingPrice: number;
    imageURL: string;
    offers?: IOffer[];
    createdAt?: Date;
    categories?: ICategory[];
    condition: number;
    additionalInfo?: string;
    //TODO: Add more
}

export interface IConversation {
    id: string;
    sellerUID: string;
    buyerUID: string;
    linkedProductID: string;
}

export interface IOffer {
    placedByUID: string;
    id: string;
    timestamp: Date;
    linkedConversationID: string;
    amount: number;
    isCounterOffer?: boolean;
    isReadByRecipient: boolean;
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
    NEW_WITH_BOX = "new with box",
    NEW_WITHOUT_BOX = "new without box",
    NEW_WITH_DEFECTS = "new with defects",
    USED_GOOD_CONDITION = "used (good condition)",
    USED_DECENT_CONDITION = "used (decent condition)",
}

export enum CatalogStatus {
    ACTIVE_DASH,
    SOLD_DASH,
    CREATE,
    VIEW,
    EDIT,
    DELETE,
}
