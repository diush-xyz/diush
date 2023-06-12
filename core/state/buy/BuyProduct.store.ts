import { makeAutoObservable } from "mobx";
import React from "react";
import { AuthStatus, BuyFlowStatus, IUser } from "../../@types/GlobalTypes";

/**
 * A store to handle anything auth-related.
 */
export default class BuyProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    status: BuyFlowStatus = BuyFlowStatus.SCOPE;

    setStatus(newStatus: BuyFlowStatus) {
        this.status = newStatus;
    }

    seller: IUser = null;

    setSeller(newSeller: IUser) {
        this.seller = newSeller;
    }
}

const StoreContext = React.createContext<BuyProductStore>(
    new BuyProductStore()
);

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useBuyProductStore = (): BuyProductStore =>
    React.useContext(StoreContext);
