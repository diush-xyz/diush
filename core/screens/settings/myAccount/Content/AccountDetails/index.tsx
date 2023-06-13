import { observer } from "mobx-react";
import React from "react";
import { useSettingsStore } from "../../../../../state/auth/Settings.store";
import { AccountDetailsSettingsStatus } from "../../../../../@types/GlobalTypes";
import AccountDetailsHome from "./AccountDetailsHome";
import AccountDetailsDisplayName from "./AccountDetailsDisplayName";
import AccountDetailsLocation from "./AccountDetailsLocation";
import AccountDetailsPfp from "./AccountDetailsPfp";

const AccountDetails = () => {
    const settingsStore = useSettingsStore();

    const accountDetailsRenderer = () => {
        switch (settingsStore.accountDetailsSettingsStatus) {
            case AccountDetailsSettingsStatus.HOME:
                return <AccountDetailsHome />;
            case AccountDetailsSettingsStatus.CHANGE_DISPLAY_NAME:
                return <AccountDetailsDisplayName />;
            case AccountDetailsSettingsStatus.CHANGE_LOCATION:
                return <AccountDetailsLocation />;
            case AccountDetailsSettingsStatus.CHANGE_PFP:
                return <AccountDetailsPfp />;
        }
    };

    return <>{accountDetailsRenderer()}</>;
};

export default observer(AccountDetails);
