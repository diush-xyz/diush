import { makeAutoObservable } from "mobx";
import React from "react";
import { ProductCondition } from "../../@types/GlobalTypes";

/**
 * A store to handle anything related to creating a product.
 */
export default class SellerViewProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    imageModal: boolean = false;

    setImageModal() {
        this.imageModal = !this.imageModal;
    }

    highestOfferAmount: number = null;

    setHighestOfferAmount(newHighestOfferAmount: number) {
        this.highestOfferAmount = newHighestOfferAmount;
    }

    productOptionsPopup: boolean = false;

    setProductOptionsPopup() {
        this.productOptionsPopup = !this.productOptionsPopup;
    }

    deleteConfirmation: boolean = false;

    setDeleteConfirmation() {
        this.deleteConfirmation = !this.deleteConfirmation;
        this.productOptionsPopup = false;
    }
}

const StoreContext = React.createContext<SellerViewProductStore>(
    new SellerViewProductStore()
);

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useSellerViewProductStore = (): SellerViewProductStore =>
    React.useContext(StoreContext);
