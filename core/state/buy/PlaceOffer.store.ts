import { makeAutoObservable } from "mobx";
import React from "react";
import { AuthStatus, BuyFlowStatus, IUser } from "../../@types/GlobalTypes";

/**
 * A store to handle anything auth-related.
 */
export default class PlaceOfferStore {
    constructor() {
        makeAutoObservable(this);
    }

    offerAmount: number = null;

    setOfferAmount(newOfferAmount: number) {
        this.offerAmount = newOfferAmount;
    }
}

const StoreContext = React.createContext<PlaceOfferStore>(
    new PlaceOfferStore()
);

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const usePlaceOfferStore = (): PlaceOfferStore =>
    React.useContext(StoreContext);
