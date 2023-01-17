import React from "react";
import { View } from "react-native";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import LargeButton from "../../../components/lib/LargeButton";
import { useSettingsStore } from "../../../state/auth/Settings.store";
import { SettingsStatus } from "../../../@types/GlobalTypes";

const SettingsMyAccount = () => {
    const settingsStore = useSettingsStore();
    return (
        <View>
            <CustomText>This is the best.</CustomText>
            <LargeButton
                title="Settings Home"
                onPress={() =>
                    settingsStore.setSettingsStatus(SettingsStatus.HOME)
                }
            />
        </View>
    );
};

export default observer(SettingsMyAccount);
