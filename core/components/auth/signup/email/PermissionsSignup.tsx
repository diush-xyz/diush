import { View, Text, Platform, Button } from "react-native";
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
import * as Device from "expo-device";
import { useTheme } from "../../../../utils/useTheme.util";
import { MAX_WIDTH } from "../../../../utils/constants";
import PermissionsTicker from "../../PermissionsTicker/PermissionsTicker";
import LargeButton from "../../../lib/LargeButton";
import { observer } from "mobx-react";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const PermissionsSignup = () => {
    const signupStore = useSignupStore();
    const utilStore = useUtilStore();
    const [expoPushToken, setExpoPushToken] = React.useState("");
    const [notification, setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    const theme = useTheme();
    const [isNotificationsChecked, setIsNotificationsChecked] =
        React.useState<boolean>(true);
    const [isLocationChecked, setIsLocationChecked] =
        React.useState<boolean>(true);

    const handleLocationActions = async () => {
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

    const handleNotificationActions = async () => {
        let { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access notifications was denied");
            await Notifications.requestPermissionsAsync();
            return;
        } else {
            await schedulePushNotification();
            console.log("Sent!!");
        }
    };

    React.useEffect(() => {
        // requestPermissionsAsync();
        handleLocationActions();
        handleNotificationActions();

        // registerForPushNotificationsAsync().then(token =>
        //     setExpoPushToken(token)
        // );

        // //@ts-ignore
        // notificationListener.current =
        //     Notifications.addNotificationReceivedListener(notification => {
        //         //@ts-ignore
        //         setNotification(notification);
        //     });

        // //@ts-ignore
        // responseListener.current =
        //     Notifications.addNotificationResponseReceivedListener(response => {
        //         console.log(response);
        //     });

        // return () => {
        //     Notifications.removeNotificationSubscription(
        //         notificationListener.current
        //     );
        //     Notifications.removeNotificationSubscription(
        //         responseListener.current
        //     );
        // };
    }, []);

    const askPermissions = () => {
        if (isNotificationsChecked) {
            handleNotificationActions();
        }
        if (isLocationChecked) {
            handleLocationActions();
        }

        signupStore.setCurrentStep(signupStore.currentStep + 1);
    };

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    signupStore.setCurrentStep(signupStore.currentStep - 1)
                }
                title="permissions"
                subtitle="signup"
                progressIndicator
                currentStep={4}
                totalSteps={6}
            />
            <FlowTemplate
                circleEmoji="🔑"
                title="it's your choice..."
                desc={
                    "although strongly discourgaed, you can opt-out of notifications and location settings."
                }
            >
                <PermissionsTicker
                    data={[
                        {
                            text: "notifications",
                            isChecked: isNotificationsChecked,
                            onTap: () =>
                                setIsNotificationsChecked(
                                    !isNotificationsChecked
                                ),
                            desc: "notifications keep you up-to-date with new offers for your items, chats, and other interactions with users.",
                        },
                        {
                            text: "location",
                            isChecked: isLocationChecked,
                            onTap: () =>
                                setIsLocationChecked(!isLocationChecked),
                            desc: "sharing your location allows other users to see where each item is located in the world. this informs their decision about whether or not to make an offer if they don’t know you personally.",
                        },
                    ]}
                />
                <LargeButton
                    title="continue"
                    onPress={() => askPermissions()}
                    footer
                    footerButtonTitle="cancel"
                    footerButtonOnPress={() => signupStore.cancel()}
                />
                {/* <View style={{ marginTop: 20 }}>
                    <Button
                        title="next"
                        onPress={() => {
                            signupStore.setCurrentStep(
                                signupStore.currentStep + 1
                            );
                        }}
                    />
                </View> */}
            </FlowTemplate>
        </BottomSheetView>
    );
};

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "💰 New offer: $120 for 'Jordan Socks'",
            body: "A new offer has been placed for one of your items. View it now!",
            data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}

export default observer(PermissionsSignup);
