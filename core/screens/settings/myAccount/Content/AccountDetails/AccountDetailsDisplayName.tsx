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

const AccountDetailsDisplayName = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();

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
                    settingsStore.setAccountDetailsSettingsStatus(
                        AccountDetailsSettingsStatus.HOME
                    )
                }
                title="update name"
                subtitle="account details"
            />
            <View
                style={{
                    display: "flex",
                    width: MAX_WIDTH,
                    marginTop: 22,
                }}
            >
                <HorizontalLine marginVertical={8} />
            </View>
        </View>
    );
};

export default observer(AccountDetailsDisplayName);
