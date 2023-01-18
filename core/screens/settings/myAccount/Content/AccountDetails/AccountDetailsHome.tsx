import React from "react";
import CustomText from "../../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { View } from "react-native";
import ScreenHeader from "../../../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../../../state/auth/Settings.store";
import {
    AccountDetailsSettingsStatus,
    MyAccountSettingsStatus,
} from "../../../../../@types/GlobalTypes";
import { MAX_WIDTH } from "../../../../../utils/constants";
import HorizontalLine from "../../../../../components/lib/HorizontalLine";
import { ISettingsData } from "../../../home/SettingsHome.screen";
import MenuElem from "../../../../../components/settings/MenuElem";
import { useAuthStore } from "../../../../../state/auth/Auth.store";

const AccountDetailsHome = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();

    const SETTINGS_MYACCOUNT_DETAILS_DATA: ISettingsData[] = [
        {
            text: "full name",
            onClick: () =>
                settingsStore.setAccountDetailsSettingsStatus(
                    AccountDetailsSettingsStatus.CHANGE_DISPLAY_NAME
                ),
            rightText: user.displayName,
        },
        {
            text: "location",
            onClick: () =>
                settingsStore.setAccountDetailsSettingsStatus(
                    AccountDetailsSettingsStatus.CHANGE_LOCATION
                ),
            rightText: user.location,
        },
        {
            text: "profile picture",
            onClick: () =>
                settingsStore.setAccountDetailsSettingsStatus(
                    AccountDetailsSettingsStatus.CHANGE_PFP
                ),
            cta: true,
            rightText: user.photoURL ? "change" : "add",
        },
    ];

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                backArrow
                backArrowOnPress={() =>
                    settingsStore.setMyAccountSettingsStatus(
                        MyAccountSettingsStatus.HOME
                    )
                }
                title="account details"
                subtitle="my account"
            />
            <View
                style={{
                    display: "flex",
                    width: MAX_WIDTH,
                    marginTop: 22,
                }}
            >
                <HorizontalLine marginVertical={8} />
                {SETTINGS_MYACCOUNT_DETAILS_DATA.map(
                    (elem: ISettingsData, idx: number) => {
                        return <MenuElem key={idx} idx={idx} {...elem} />;
                    }
                )}
            </View>
        </View>
    );
};

export default observer(AccountDetailsHome);
