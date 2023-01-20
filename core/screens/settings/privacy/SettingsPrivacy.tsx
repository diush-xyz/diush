import React from "react";
import { View } from "react-native";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../state/auth/Settings.store";
import { SettingsStatus } from "../../../@types/GlobalTypes";
import LargeButton from "../../../components/lib/LargeButton";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { useAuthStore } from "../../../state/auth/Auth.store";

const SettingsPrivacy = () => {
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
                    settingsStore.setSettingsStatus(SettingsStatus.HOME)
                }
                // backArrow
                // backArrowOnPress={() =>
                //     utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME)
                // }
                title="password"
                subtitle="privacy & safety"
            />
            <LargeButton
                title="change password"
                onPress={() => sendPasswordResetEmail(auth, user.email)}
            />
        </View>
    );
};

export default observer(SettingsPrivacy);
