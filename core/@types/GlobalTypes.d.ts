export interface User {
    id: string;
    displayName: string;
    email: string;
    createdAt: string;
    photoURL: string;
    lastSignIn: string;
    username: string;
}

export interface Listing {
    text: string;
    /* Creator user id */
    uid: string;
    postedAt: Date;
}
