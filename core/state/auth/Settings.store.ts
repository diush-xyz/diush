import { makeAutoObservable } from "mobx";
import React from "react";
import {
    AccountDetailsSettingsStatus,
    IConversation,
    MyAccountSettingsStatus,
    SettingsStatus,
} from "../../@types/GlobalTypes";

/**
 * A store to handle anything signup-related.
 */
export default class SettingsStore {
    constructor() {
        makeAutoObservable(this);
    }

    settingsStatus: SettingsStatus = SettingsStatus.HOME;

    setSettingsStatus(newStatus: SettingsStatus) {
        this.settingsStatus = newStatus;
    }

    myAccountSettingsStatus: MyAccountSettingsStatus =
        MyAccountSettingsStatus.HOME;

    setMyAccountSettingsStatus(newStatus: MyAccountSettingsStatus) {
        this.myAccountSettingsStatus = newStatus;
    }

    accountDetailsSettingsStatus: AccountDetailsSettingsStatus =
        AccountDetailsSettingsStatus.HOME;

    setAccountDetailsSettingsStatus(newStatus: AccountDetailsSettingsStatus) {
        this.accountDetailsSettingsStatus = newStatus;
    }
}

const StoreContext = React.createContext<SettingsStore>(new SettingsStore());

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useSettingsStore = (): SettingsStore =>
    React.useContext(StoreContext);
