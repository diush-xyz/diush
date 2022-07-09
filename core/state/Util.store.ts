import { makeAutoObservable } from "mobx";
import React from "react";

/**
 * A store to handle anything auth-related.
 */
export default class UtilStore {
    constructor() {
        makeAutoObservable(this);
    }

    isKeyboardOpen: boolean = false;

    setIsKeyboardOpen(isOpen: boolean) {
        this.isKeyboardOpen = isOpen;
    }
}

const StoreContext = React.createContext<UtilStore>(new UtilStore());

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useUtilStore = (): UtilStore => React.useContext(StoreContext);
