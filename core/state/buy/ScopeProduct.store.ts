import { makeAutoObservable } from "mobx";
import React from "react";
import { AuthStatus, IUser } from "../../@types/GlobalTypes";

/**
 * A store to handle anything auth-related.
 */
export default class ScopeProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    imageModal: boolean = false;

    setImageModal() {
        this.imageModal = !this.imageModal;
    }

    productId: string;

    setProductId(newProductId: string) {
        this.productId = newProductId;
    }

    fetchedActiveProduct: any;

    setFetchedActiveProduct(newFetchedActiveProduct: any) {
        this.fetchedActiveProduct = newFetchedActiveProduct;
    }

    productOptionsPopup: boolean = false;

    setProductOptionsPopup() {
        this.productOptionsPopup = !this.productOptionsPopup;
    }
}

const StoreContext = React.createContext<ScopeProductStore>(
    new ScopeProductStore()
);

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useScopeProductStore = (): ScopeProductStore =>
    React.useContext(StoreContext);
