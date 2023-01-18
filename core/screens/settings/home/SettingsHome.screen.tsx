import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { auth } from "../../../../config/firebase";
import CustomText from "../../../components/lib/CustomText";
import CustomTextInput from "../../../components/lib/CustomTextInput";
import HorizontalLine from "../../../components/lib/HorizontalLine";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import ChevronRight from "../../../icons/catalog/ChevronRight";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { useHomeStore } from "../../../state/auth/Home.store";
import { useLoginStore } from "../../../state/auth/Login.store";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { MAX_WIDTH } from "../../../utils/constants";
import { useSettingsStore } from "../../../state/auth/Settings.store";
import { SettingsStatus } from "../../../@types/GlobalTypes";
import { observer } from "mobx-react";
import MenuElem from "../../../components/settings/MenuElem";

export interface ISettingsData {
    text: string;
    onClick: () => void;
    rightText?: string;
    cta?: boolean;
    isToggle?: boolean;
}

const SettingsHome = () => {
    const authStore = useAuthStore();
    const homeStore = useHomeStore();
    const logInStore = useLoginStore();
    const signUpStore = useSignupStore();
    const settingsStore = useSettingsStore();

    const PREFERENCES_SETTINGS_DATA: ISettingsData[] = [
        {
            text: "my account",
            onClick: () =>
                settingsStore.setSettingsStatus(SettingsStatus.MY_ACCOUNT),
        },
        {
            text: "privacy & safety",
            onClick: () => null,
        },
        {
            text: "payments",
            onClick: () => null,
        },
        {
            text: "notifications",
            onClick: () => null,
            isToggle: true,
        },
    ];

    const CONNECT_SETTINGS_DATA: ISettingsData[] = [
        {
            text: "follow us on twitter 🐦",
            onClick: () => null,
        },
        {
            text: "rate us ⭐",
            onClick: () => null,
        },
        {
            text: "about 🎧",
            onClick: () => null,
        },
        {
            text: "help center 🌳",
            onClick: () => null,
        },
        {
            text: "give feedback ❤️",
            onClick: () => null,
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
                pfp
                photoURL={
                    authStore.user.photoURL ??
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                }
                onPfpPress={() => homeStore.setControlCenter(true)}
                // backArrow
                // backArrowOnPress={() =>
                //     utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME)
                // }
                title="settings"
            />
            <View style={{ marginTop: 22, marginBottom: 22 }}>
                <CustomTextInput
                    placeholder="search settings"
                    onChangeText={text => null}
                    isSearch
                />
            </View>
            <ScrollView
                contentContainerStyle={{ width: MAX_WIDTH }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        display: "flex",
                        width: "100%",
                    }}
                >
                    <CustomText secondary font="Heavy" fontSize={14}>
                        PREFERENCES
                    </CustomText>
                    <HorizontalLine marginVertical={8} />
                    {PREFERENCES_SETTINGS_DATA.map(
                        (elem: ISettingsData, idx: number) => {
                            return <MenuElem key={idx} idx={idx} {...elem} />;
                        }
                    )}
                </View>
                <View
                    style={{
                        display: "flex",
                        width: "100%",
                    }}
                >
                    <CustomText
                        secondary
                        font="Heavy"
                        fontSize={14}
                        style={{ marginTop: 22 }}
                    >
                        CONNECT
                    </CustomText>
                    <HorizontalLine marginVertical={8} />
                    {CONNECT_SETTINGS_DATA.map(
                        (elem: ISettingsData, idx: number) => {
                            return <MenuElem key={idx} idx={idx} {...elem} />;
                        }
                    )}
                    <TouchableOpacity
                        onPress={() => {
                            auth.signOut();
                            //TODO: still must fix blank popup that comes up after the user signs out of their acc
                            //reset stuff
                            homeStore.setControlCenter(false);
                            logInStore.cancel();
                            signUpStore.cancel();
                            homeStore.setIsIncomingChatsActive(true);
                            homeStore.setIsOutboundChatsActive(false);
                            homeStore.setControlCenter(false);
                        }}
                    >
                        <CustomText accent>log out</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 100 }} />
            </ScrollView>
        </View>
    );
};

export default observer(SettingsHome);
