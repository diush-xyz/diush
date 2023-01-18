import React from "react";
import CustomText from "../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { TouchableOpacity, View } from "react-native";
import ScreenHeader from "../../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../../state/auth/Settings.store";
import {
    MyAccountSettingsStatus,
    SettingsStatus,
} from "../../../../@types/GlobalTypes";
import ProfileImage from "../../../../components/lib/ProfileImage";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import { MAX_WIDTH } from "../../../../utils/constants";

const Deactivate = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
                justifyContent: "space-between",
            }}
        >
            <View style={{ display: "flex", alignItems: "center" }}>
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
                <View
                    style={{
                        display: "flex",
                        width: MAX_WIDTH,
                        marginTop: 22,
                    }}
                >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <ProfileImage
                            size={27}
                            specificUser={user}
                            style={{ marginRight: 8 }}
                        />
                        <View>
                            <CustomText font="Bold">
                                {user.displayName}
                            </CustomText>
                            <CustomText secondary fontSize={14}>
                                {user.email}
                            </CustomText>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 22, width: MAX_WIDTH }}>
                    <CustomText
                        font="Bold"
                        fontSize={18}
                        style={{ marginBottom: 11 }}
                    >
                        we are heartbroken to see you go. 💔
                    </CustomText>
                    <CustomText secondary font="Bold">
                        we'd love to{" "}
                        <CustomText
                            accent
                            onPress={() => {
                                settingsStore.setMyAccountSettingsStatus(
                                    MyAccountSettingsStatus.ACCOUNT_DETAILS
                                );
                            }}
                        >
                            hear from you
                        </CustomText>{" "}
                        if you have any feedback, comments, or questions about
                        the platform.
                    </CustomText>
                </View>
                <View style={{ marginTop: 22, width: MAX_WIDTH }}>
                    <CustomText
                        font="Bold"
                        fontSize={18}
                        style={{ marginBottom: 11 }}
                    >
                        this action will deactivate your account.
                    </CustomText>
                    <CustomText secondary font="Bold">
                        you are beginning the process for deactivating and
                        deleting your diush account. Your display name,
                        username, public profile, products, and other data will
                        no longer be visible on diush.xyz or any of our
                        services.
                    </CustomText>
                </View>
                <View style={{ marginTop: 22, width: MAX_WIDTH }}>
                    <CustomText
                        font="Bold"
                        fontSize={18}
                        style={{ marginBottom: 11 }}
                    >
                        what you should know
                    </CustomText>
                    <CustomText secondary font="Bold">
                        once deleted, your account and all of its data will not
                        be able to be restored. ever.
                    </CustomText>
                    <CustomText secondary font="Bold" style={{ marginTop: 18 }}>
                        if you simply want to change your email or any other
                        account property, there is no need to deactivate your
                        account - you can edit these things in{" "}
                        <CustomText
                            accent
                            onPress={() => {
                                settingsStore.setMyAccountSettingsStatus(
                                    MyAccountSettingsStatus.ACCOUNT_DETAILS
                                );
                            }}
                        >
                            settings.
                        </CustomText>
                    </CustomText>
                    {/* <CustomText secondary font="Bold" style={{ marginTop: 18 }}>
                    to use your current username with a different diush account
                    you create in the future,{" "}
                    <CustomText
                        accent
                        onPress={() => {
                            settingsStore.setMyAccountSettingsStatus(
                                MyAccountSettingsStatus.ACCOUNT_DETAILS
                            );
                        }}
                    >
                        change them
                    </CustomText>{" "}
                    here before you deactivate your account.
                </CustomText> */}
                </View>
            </View>
            <TouchableOpacity onPress={() => null}>
                <CustomText accent font="Bold" style={{ marginBottom: 60 }}>
                    Deactivate
                </CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default observer(Deactivate);
