import React from "react";
import { View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { auth, db } from "../../../../config/firebase";
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
import { doc, updateDoc } from "firebase/firestore";

export interface ISettingsData {
    text: string;
    onClick: () => void;
    rightText?: string;
    isRightSideEmpty?: boolean;
    cta?: boolean;
    isToggle?: boolean;
    toggleValue?: boolean;
    onToggleChange?: (value: boolean) => void;
    isNotPressable?: boolean;
    isComingSoon?: boolean;
}

const SettingsHome = () => {
    const authStore = useAuthStore();
    const homeStore = useHomeStore();
    const logInStore = useLoginStore();
    const signUpStore = useSignupStore();
    const settingsStore = useSettingsStore();

    const updateNotificationSettings = async (value: boolean) => {
        const userRef = doc(db, "users", authStore.user.id);

        await updateDoc(userRef, {
            notifications: value,
        });
    };

    const PREFERENCES_SETTINGS_DATA: ISettingsData[] = [
        {
            text: "my account",
            onClick: () =>
                settingsStore.setSettingsStatus(SettingsStatus.MY_ACCOUNT),
        },
        {
            text: "change password",
            onClick: () =>
                settingsStore.setSettingsStatus(SettingsStatus.PRIVACY),
        },
        {
            text: "payments",
            onClick: () => null,
            isComingSoon: true,
        },
        {
            text: "notifications",
            onClick: () => null,
            isToggle: true,
            toggleValue: authStore.user.notifications,
            onToggleChange: value => updateNotificationSettings(value),
            isNotPressable: true,
        },
    ];

    const CONNECT_SETTINGS_DATA: ISettingsData[] = [
        {
            text: "follow us on twitter 🐦",
            onClick: () => Linking.openURL("https://twitter.com/diushxyz"),
            // isRightSideEmpty: true,
        },
        // {
        //     text: "rate us ⭐",
        //     onClick: () => null,
        //     // isRightSideEmpty: true,
        // },
        {
            text: "terms & privacy policy 🔐",
            onClick: () => Linking.openURL("https://diush-legal.super.site/"),
            // isRightSideEmpty: true,
        },
        {
            text: "contribute 🎧",
            onClick: () => Linking.openURL("https://github.com/diush-xyz"),
            // isRightSideEmpty: true,
        },
        // {
        //     text: "about 🎧",
        //     onClick: () => null,
        //     // isRightSideEmpty: true,
        // },
        {
            text: "give feedback ❤️",
            onClick: () =>
                Linking.openURL("mailto:filifonsecacagnazzo@gmail.com"),
            // isRightSideEmpty: true,
        },
        {
            text: "help center 🌳",
            onClick: () => null,
            // isRightSideEmpty: true,
            isComingSoon: true,
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
                <View style={{ marginBottom: 80 }} />
                <CustomText textAlign="center" secondary>
                    Copyright © {new Date().getFullYear()} Filippo Fonseca |
                    version 0.0.1
                </CustomText>
                <View style={{ marginBottom: 40 }} />
            </ScrollView>
        </View>
    );
};

export default observer(SettingsHome);
