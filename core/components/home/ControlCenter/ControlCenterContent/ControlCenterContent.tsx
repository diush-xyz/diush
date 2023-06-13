import React from "react";
import { useTheme } from "../../../../utils/useTheme.util";
import CustomText from "../../../lib/CustomText";
import { View, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import RoundedMoreIcon from "../../../../icons/common/RoundedMore";
import DealsIcon from "../../../../icons/home/controlCenter/deals";
import HorizontalLine from "../../../lib/HorizontalLine";
import { observer } from "mobx-react";
import ControlCenterContentScrollWrapper from "./ControlCenterContentScrollWrapper";
import { useUtilStore } from "../../../../state/Util.store";
import { LoggedInScreen } from "../../../../@types/GlobalTypes";
import { useHomeStore } from "../../../../state/auth/Home.store";
import ProfileImage from "../../../lib/ProfileImage";
import { auth } from "../../../../../config/firebase";
import { useLoginStore } from "../../../../state/auth/Login.store";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import CatalogIcon from "../../../../icons/home/controlCenter/catalog";
import MetricsIcon from "../../../../icons/home/controlCenter/metrics";
import SettingsIcon from "../../../../icons/home/controlCenter/settings";
import MyProfileIcon from "../../../../icons/home/controlCenter/myprofile";
import CopyIcon from "../../../../icons/catalog/Copy";
import OptionsSelector, {
    IOptionsSelectorElement,
} from "../../../lib/OptionsSelector";
import NoBackgroundLogo from "../../../../icons/auth/NoBackgroundLogo";

export interface ICONTROL_CENTER_DATA {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
    isComingSoon?: boolean;
}

const ControlCenterContent = () => {
    const theme = useTheme();
    const authStore = useAuthStore();
    const utilStore = useUtilStore();
    const homeStore = useHomeStore();
    const logInStore = useLoginStore();
    const signUpStore = useSignupStore();

    const CONTROL_CENTER_DATA: ICONTROL_CENTER_DATA[] = [
        {
            icon: <DealsIcon />,
            text: "deals",
            onClick: () =>
                utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME),
        },
        {
            icon: <CatalogIcon />,
            text: "my catalog",
            onClick: () =>
                utilStore.setCurrentLoggedInScreen(LoggedInScreen.CATALOG),
        },
        {
            icon: <MetricsIcon />,
            text: "metrics",
            onClick: () => null,
            isComingSoon: true,
        },
        {
            icon: <SettingsIcon />,
            text: "settings",
            onClick: () =>
                utilStore.setCurrentLoggedInScreen(LoggedInScreen.SETTINGS),
        },
        {
            icon: <MyProfileIcon />,
            text: "my profile",
            onClick: () => null,
            isComingSoon: true,
        },
    ];

    // const OPTIONS_DATA: IOptionsSelectorElement[] = [
    //     {
    //         text: "Log out",
    //         icon: <CopyIcon />,
    //         onClick: () => {
    //             auth.signOut();
    //             //TODO: still must fix blank popup that comes up after the user signs out of their acc
    //             //reset stuff
    //             homeStore.setControlCenter(false);
    //             logInStore.cancel();
    //             signUpStore.cancel();
    //             homeStore.setIsIncomingChatsActive(true);
    //             homeStore.setIsOutboundChatsActive(false);
    //             homeStore.setControlCenter(false);
    //         },
    //     }, //TODO: Properly make this url link to something once the buyer flow is built out
    // ];

    return (
        <View
            style={{
                zIndex: 1000,
                backgroundColor: theme.popupBackground,
                flex: 1,
                // position: "absolute",
                // left: 0,
                width: "100%",
                height: "100%",
                paddingHorizontal: 25,
            }}
        >
            <ControlCenterContentScrollWrapper>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <View style={{ display: "flex" }}>
                        <ProfileImage
                            specificUser={authStore.user}
                            size={55}
                            style={{ marginBottom: 12 }}
                        />
                        <CustomText font="Bold" fontSize={19}>
                            {authStore.user.displayName}
                        </CustomText>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            // homeStore.setControlCenterOptionsSelector(true)
                            null;
                        }}
                    >
                        {/* <RoundedMoreIcon /> */}
                        <NoBackgroundLogo height={24} width={24} />
                    </TouchableOpacity>
                    {/* {homeStore.controlCenterOptionsSelector && (
                        <OptionsSelector
                            visible={homeStore.controlCenterOptionsSelector}
                            data={OPTIONS_DATA}
                        />
                    )} */}
                </View>
                <View
                    style={{
                        display: "flex",
                        marginTop: 30,
                    }}
                >
                    {CONTROL_CENTER_DATA.map(
                        (elem: ICONTROL_CENTER_DATA, idx: number) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={elem.isComingSoon ? 1 : 0.5}
                                    key={idx}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        marginBottom:
                                            idx !==
                                                CONTROL_CENTER_DATA.length -
                                                    1 && 30,
                                    }}
                                    onPress={() => {
                                        if (!elem.isComingSoon) {
                                            elem.onClick();
                                            homeStore.setControlCenter(false);
                                            logInStore.cancel();
                                            signUpStore.cancel();
                                            authStore.setIsSheetOpen(false);
                                        }
                                    }}
                                >
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            opacity: elem.isComingSoon
                                                ? 0.5
                                                : 1,
                                        }}
                                    >
                                        {elem.icon}
                                        <CustomText
                                            font="Bold"
                                            fontSize={18}
                                            style={{ marginLeft: 18 }}
                                        >
                                            {elem.text}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            backgroundColor: "#ffffff0d",
                                            padding: 5,
                                            borderRadius: 6,
                                            opacity: elem.isComingSoon ? 1 : 0,
                                        }}
                                    >
                                        <CustomText fontSize={14}>
                                            SOON
                                        </CustomText>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    )}
                </View>
                <HorizontalLine />
                <View style={{ display: "flex" }}>
                    <TouchableOpacity
                        onPress={() => null}
                        style={{ marginBottom: 30 }}
                    >
                        <CustomText font="Bold">help center</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => null}
                        style={{ marginBottom: 30 }}
                    >
                        <CustomText font="Bold">give feedback ❤️</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => null}
                        style={{ marginBottom: 30 }}
                    >
                        <CustomText>referral program</CustomText>
                    </TouchableOpacity>
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
                        <CustomText style={{ color: "#FF453A" }}>
                            log out
                        </CustomText>
                    </TouchableOpacity>
                </View>
                {/*spacer*/}
                <View style={{ height: 100, width: "100%" }} />
            </ControlCenterContentScrollWrapper>
        </View>
    );
};

export default observer(ControlCenterContent);
