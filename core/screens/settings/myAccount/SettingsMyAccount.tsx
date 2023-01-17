import { observer } from "mobx-react";
import React from "react";
import { useSettingsStore } from "../../../state/auth/Settings.store";
import { MyAccountSettingsStatus } from "../../../@types/GlobalTypes";
import MyAccountHome from "./Content/MyAccountHome";

const SettingsMyAccount = () => {
    const settingsStore = useSettingsStore();

    const myAccountRenderer = () => {
        switch (settingsStore.myAccountSettingsStatus) {
            case MyAccountSettingsStatus.HOME:
                return <MyAccountHome />;
        }
    };

    return <>{myAccountRenderer()}</>;
};

export default observer(SettingsMyAccount);
