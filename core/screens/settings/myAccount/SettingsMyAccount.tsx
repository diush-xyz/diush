import { observer } from "mobx-react";
import React from "react";
import { useSettingsStore } from "../../../state/auth/Settings.store";
import { MyAccountSettingsStatus } from "../../../@types/GlobalTypes";
import MyAccountHome from "./Content/MyAccountHome";
import Deactivate from "./Content/Deactivate";
import AccountDetails from "./Content/AccountDetails";

const SettingsMyAccount = () => {
    const settingsStore = useSettingsStore();

    const myAccountRenderer = () => {
        switch (settingsStore.myAccountSettingsStatus) {
            case MyAccountSettingsStatus.HOME:
                return <MyAccountHome />;
            case MyAccountSettingsStatus.ACCOUNT_DETAILS:
                return <AccountDetails />;
            case MyAccountSettingsStatus.DEACTIVATE:
                return <Deactivate />;
        }
    };

    return <>{myAccountRenderer()}</>;
};

export default observer(SettingsMyAccount);
