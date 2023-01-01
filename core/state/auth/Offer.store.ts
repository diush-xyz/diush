import { makeAutoObservable } from "mobx";
import React from "react";
import {
    IConversation,
    IOffer,
    IProduct,
    IUser,
} from "../../@types/GlobalTypes";

/**
 * A store to handle anything signup-related.
 */
export default class OfferStore {
    constructor() {
        makeAutoObservable(this);
    }

    offerBeingReviewed: IOffer = null;

    setOfferBeingReviewed(offer: IOffer) {
        this.offerBeingReviewed = offer;
    }
}

const StoreContext = React.createContext<OfferStore>(new OfferStore());

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useOfferStore = (): OfferStore => React.useContext(StoreContext);
