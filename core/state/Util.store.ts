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

    copyIndicator: boolean = false;

    copyIndicatorText: string = "Copied!";

    setCopyIndicator(copyIndicatorText?: string) {
        this.copyIndicator = !this.copyIndicator;
        this.copyIndicatorText = copyIndicatorText;
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
