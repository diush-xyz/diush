import { View, Text } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import CustomText from "../../../lib/CustomText";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { useUtilStore } from "../../../../state/Util.store";

const PermissionsSignup = () => {
    const signupStore = useSignupStore();
    const utilStore = useUtilStore();

    // async function allowsNotificationsAsync() {
    //     const settings = await Notifications.getPermissionsAsync();
    //     return Notifications.IosAuthorizationStatus
    // }

    // async function requestPermissionsAsync() {
    //     return await Notifications.requestPermissionsAsync({
    //         ios: {
    //             allowAlert: true,
    //             allowBadge: true,
    //             allowSound: true,
    //             allowAnnouncements: true,
    //         },
    //     });
    // }

    async function registerForPushnotifications() {
        const { status } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        if (status != "granted") {
            const { status } = await Permissions.askAsync(
                Permissions.NOTIFICATIONS
            );
        }
        if (status != "granted") {
            console.log("Failed to get the poush token");
            return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;

        return token;
    }

    const handleNotifications = async () => {
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== "granted") {
            return "Notifications not granted";
        } else {
            return "granted!";
        }
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
        } else {
            let location = await Location.getCurrentPositionAsync({});
            utilStore.setLocation(location);
            console.log("GOT IT!!!!");
            console.log(utilStore.location);
        }
    };

    React.useEffect(() => {
        // requestPermissionsAsync();
        getLocation();
    }, []);

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    signupStore.setCurrentStep(signupStore.currentStep - 1)
                }
                title="password"
                subtitle="signup"
                progressIndicator
                currentStep={3}
                totalSteps={6}
            />
            <FlowTemplate
                circleEmoji="🔐"
                title="password"
                desc="make sure it's difficult for others to guess."
            >
                <CustomText primary>Permissions</CustomText>
            </FlowTemplate>
        </BottomSheetView>
    );
};

export default PermissionsSignup;
