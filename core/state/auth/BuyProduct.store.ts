import { makeAutoObservable } from "mobx";
import React from "react";
import {
    CatalogStatus,
    IProduct,
    ProductCondition,
} from "../../@types/GlobalTypes";
import { productConditionToDb } from "../../utils/productCondition.util";

/**
 * A store to handle anything catalog-related.
 */
export default class BuyProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    activeProductId: string = null;

    setActiveProductId(newActiveProductId: string) {
        this.activeProductId = newActiveProductId;
    }

    activeProduct: IProduct = null;

    setActiveProduct(newProduct: IProduct) {
        this.activeProduct = newProduct;
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
