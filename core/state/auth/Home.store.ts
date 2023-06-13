import { makeAutoObservable } from "mobx";
import React from "react";
import { IConversation } from "../../@types/GlobalTypes";

/**
 * A store to handle anything signup-related.
 */
export default class HomeStore {
    constructor() {
        makeAutoObservable(this);
    }

    controlCenter: boolean = false;

    setControlCenter(newStatus: boolean) {
        this.controlCenter = newStatus;
    }

    controlCenterOptionsSelector: boolean = false;

    setControlCenterOptionsSelector(newStatus: boolean) {
        this.controlCenterOptionsSelector = newStatus;
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
