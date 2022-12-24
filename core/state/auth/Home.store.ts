import { makeAutoObservable } from "mobx";
import React from "react";

/**
 * A store to handle anything signup-related.
 */
export default class HomeStore {
    constructor() {
        makeAutoObservable(this);
    }

    isSidebarOpen: boolean = false;

    setIsSidebarOpen(newStatus: boolean) {
        this.isSidebarOpen = newStatus;
    }

    isIncomingChatsActive: boolean = true;

    setIsIncomingChatsActive(status: boolean) {
        this.isIncomingChatsActive = status;
    }

    isOutboundChatsActive: boolean = false;

    setIsOutboundChatsActive(status: boolean) {
        this.isOutboundChatsActive = status;
    }
}

const StoreContext = React.createContext<HomeStore>(new HomeStore());

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useHomeStore = (): HomeStore => React.useContext(StoreContext);
