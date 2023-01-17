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

export interface ICONTROL_CENTER_DATA {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
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
            onClick: () => null,
        },
        {
            icon: <CatalogIcon />,
            text: "my catalog",
            onClick: () =>
                utilStore.setCurrentLoggedInScreen(LoggedInScreen.CATALOG),
        },
        {
            icon: <DealsIcon />,
            text: "metrics",
            onClick: () => null,
        },
        {
            icon: <DealsIcon />,
            text: "settings",
            onClick: () => null,
        },
        {
            icon: <DealsIcon />,
            text: "my profile",
            onClick: () => null,
        },
    ];

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
                    <TouchableOpacity onPress={() => null}>
                        <RoundedMoreIcon />
                    </TouchableOpacity>
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
                                    key={idx}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginBottom:
                                            idx !==
                                                CONTROL_CENTER_DATA.length -
                                                    1 && 30,
                                    }}
                                    onPress={() => {
                                        elem.onClick();
                                        homeStore.setControlCenter(false);
                                        logInStore.cancel();
                                        signUpStore.cancel();
                                        authStore.setIsSheetOpen(false);
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
