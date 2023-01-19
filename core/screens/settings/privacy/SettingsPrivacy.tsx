import React from "react";
import { View } from "react-native";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../state/auth/Settings.store";
import { SettingsStatus } from "../../../@types/GlobalTypes";

const SettingsPrivacy = () => {
    const settingsStore = useSettingsStore();
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
                    settingsStore.setSettingsStatus(SettingsStatus.HOME)
                }
                // backArrow
                // backArrowOnPress={() =>
                //     utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME)
                // }
                title="password"
                subtitle="privacy & safety"
            />
        </View>
    );
};

export default observer(SettingsPrivacy);
