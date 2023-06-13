import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../state/auth/Settings.store";
import { SettingsStatus } from "../../../@types/GlobalTypes";
import LargeButton from "../../../components/lib/LargeButton";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { useAuthStore } from "../../../state/auth/Auth.store";
import SettingsScrollWrapper from "../../../components/settings/SettingsScrollWrapper";
import { MAX_WIDTH } from "../../../utils/constants";
import HorizontalLine from "../../../components/lib/HorizontalLine";
import ProfileImage from "../../../components/lib/ProfileImage";
import SmallButton from "../../../components/lib/SmallButton";
import { useTheme } from "../../../utils/useTheme.util";
import { useUtilStore } from "../../../state/Util.store";

const SettingsPrivacy = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();
    const theme = useTheme();
    const utilStore = useUtilStore();

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
            <SettingsScrollWrapper>
                <View
                    style={{
                        display: "flex",
                        width: MAX_WIDTH,
                        marginTop: 22,
                    }}
                >
                    <HorizontalLine marginVertical={8} />
                    <View style={{ marginTop: 10 }}>
                        <CustomText font="Bold" style={{ marginBottom: 8 }}>
                            change your password
                        </CustomText>
                        <TouchableOpacity
                            onPress={() => {
                                sendPasswordResetEmail(auth, user.email);
                                utilStore.setMsgIndicator("Check your inbox!");
                                setTimeout(() => {
                                    utilStore.setMsgIndicator();
                                }, 2500);
                            }}
                            style={{
                                paddingVertical: 6,
                                paddingHorizontal: 10,
                                display: "flex",
                                alignItems: "center",
                                marginRight: "auto",
                                backgroundColor: theme.accent,
                                borderRadius: 12,
                                marginTop: 8,
                            }}
                        >
                            <CustomText fontSize={16}>
                                send reset email
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*this must be out here for the error bar's width to cover 100% of the screen*/}
            </SettingsScrollWrapper>
        </View>
    );
};

export default observer(SettingsPrivacy);
