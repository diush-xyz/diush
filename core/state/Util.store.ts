import { makeAutoObservable } from "mobx";
import React from "react";
import * as Location from "expo-location";
import { LoggedInScreen } from "../@types/GlobalTypes";

/**
 * A store to handle anything auth-related.
 */
export default class UtilStore {
    constructor() {
        makeAutoObservable(this);
    }

    currentLoggedInScreen: LoggedInScreen = LoggedInScreen.HOME;

    setCurrentLoggedInScreen(screen: LoggedInScreen) {
        this.currentLoggedInScreen = screen;
    }

    location: Location.LocationObject;

    setLocation(location: Location.LocationObject) {
        this.location = location;
    }

    isKeyboardOpen: boolean = false;

    setIsKeyboardOpen(isOpen: boolean) {
        this.isKeyboardOpen = isOpen;
    }

    msgIndicator: boolean = false;

    msgIndicatorText: string = "Copied!";

    setMsgIndicator(msgIndicatorText?: string) {
        this.msgIndicator = !this.msgIndicator;
        this.msgIndicatorText = msgIndicatorText;
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
