export interface IUser {
    id: string;
    displayName: string;
    email: string;
    photoURL: string;
    location?: string;
    notifications?: boolean;
    // products?: IProduct[];
}

export interface IProduct {
    id: string;
    linkedUID: string;
    title: string;
    blurb: string;
    askingPrice: number;
    imageURL: string;
    createdAt?: Date;
    categories?: ICategory[];
    condition: number;
    additionalInfo?: string;
    dealReached?: boolean;
    //TODO: Add any more props if they are necessary/needed
}

export interface IConversation {
    id: string;
    sellerUID: string;
    buyerUID: string;
    linkedProductID: string;
    dealReached?: boolean;
}

export interface IOffer {
    id: string;
    placedByUID: string;
    timestamp: Date;
    linkedConversationID: string;
    amount: number;
    isCounterOffer?: boolean;
    isReadByRecipient: boolean;
    status: OfferStatus;
    linkedProductID: string;
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
    SETTINGS,
    BUY,
}

export enum BuyFlowStatus {
    SCOPE,
    PLACE_OFFER,
    SUCCESS,
}

export enum SettingsStatus {
    HOME,
    MY_ACCOUNT,
    PRIVACY,
    PAYMENTS,
}

export enum MyAccountSettingsStatus {
    HOME,
    ACCOUNT_DETAILS,
    DEACTIVATE,
}

export enum AccountDetailsSettingsStatus {
    HOME,
    CHANGE_DISPLAY_NAME,
    // CHANGE_EMAIL,
    CHANGE_LOCATION,
    CHANGE_PFP,
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

export enum OfferStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    DECLINED = "DECLINED",
}
