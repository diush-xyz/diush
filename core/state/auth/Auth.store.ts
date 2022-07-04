import { makeAutoObservable } from "mobx";
import React from "react";
import { AuthStatus } from "../../@types/GlobalTypes";

/**
 * A store to handle anything auth-related.
 */
export default class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    // user: IUser;

    // setUser(newUser: IUser) {
    //     this.user = newUser;
    // }

    isSheetOpen: boolean = false;

    setIsSheetOpen(newIsSheetOpen: boolean) {
        this.isSheetOpen = newIsSheetOpen;
    }

    authStatus: AuthStatus = AuthStatus.SQUARE_ONE;

    setAuthStatus(newAuthStatus: AuthStatus) {
        this.authStatus = newAuthStatus;
    }
}

const StoreContext = React.createContext<AuthStore>(new AuthStore());

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useAuthStore = (): AuthStore => React.useContext(StoreContext);
