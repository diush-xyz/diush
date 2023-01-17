import React from "react";
import CustomText from "../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { View } from "react-native";
import ScreenHeader from "../../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../../state/auth/Settings.store";
import { MyAccountSettingsStatus } from "../../../../@types/GlobalTypes";

const Deactivate = () => {
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
                    settingsStore.setMyAccountSettingsStatus(
                        MyAccountSettingsStatus.HOME
                    )
                }
                title="deactivate"
                subtitle="my account"
            />
        </View>
    );
};

export default observer(Deactivate);
