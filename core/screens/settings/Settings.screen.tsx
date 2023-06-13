import React from "react";
import { useSettingsStore } from "../../state/auth/Settings.store";
import { SettingsStatus } from "../../@types/GlobalTypes";
import SettingsHome from "./home/SettingsHome.screen";
import SettingsPayments from "./payments/SettingsPayments";
import SettingsPrivacy from "./privacy/SettingsPrivacy";
import { observer } from "mobx-react";
import SettingsMyAccount from "./myAccount/SettingsMyAccount";

const SettingsScreen = () => {
    const settingsStore = useSettingsStore();

    const settingsScreenRenderer = () => {
        switch (settingsStore.settingsStatus) {
            case SettingsStatus.HOME:
                return <SettingsHome />;
            case SettingsStatus.MY_ACCOUNT:
                return <SettingsMyAccount />;
            case SettingsStatus.PRIVACY:
                return <SettingsPrivacy />;
            case SettingsStatus.PAYMENTS:
                return <SettingsPayments />;
        }
    };
    return <>{settingsScreenRenderer()}</>;
};

export default observer(SettingsScreen);
