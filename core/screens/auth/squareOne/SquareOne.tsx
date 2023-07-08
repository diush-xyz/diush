import React from "react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import { Animated, Easing, View } from "react-native";
import { AuthStatus } from "../../../@types/GlobalTypes";
import CustomText from "../../../components/lib/CustomText";
import LargeButton from "../../../components/lib/LargeButton";
import NoBackgroundLogo from "../../../icons/auth/NoBackgroundLogo";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { observer } from "mobx-react";

const SquareOne = () => {
    const authStore = useAuthStore();

    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const [isTop, setIsTop] = React.useState(true);

    const startAnimation = toValue => {
        Animated.timing(animatedValue, {
            toValue,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setIsTop(!isTop);
        });
    };

    React.useEffect(() => {
        startAnimation(isTop ? 1 : 0);
    }, [isTop]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10],
        extrapolate: "clamp",
    });

    const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1.15, 0.9],
        extrapolate: "clamp",
    });

    React.useEffect(() => {
        authStore.setAuthStatus(AuthStatus.SQUARE_ONE);
    }, []);

    return (
        <>
            <View style={GLOBAL_STYLES.page}>
                <Animated.View
                    style={{
                        transform: [{ translateY }, { scale }],
                        marginBottom: 15,
                    }}
                >
                    <NoBackgroundLogo fill="#ffffff" />
                </Animated.View>
                <CustomText
                    primary
                    font="Bold"
                    fontSize={24}
                    style={{ marginTop: 24, marginBottom: 12 }}
                >
                    hey there!
                </CustomText>
                <CustomText
                    secondary
                    font="Semibold"
                    fontSize={16}
                    textAlign="center"
                    style={{ marginBottom: 80 }}
                >
                    welcome to the easy way for teenagers {"\n"} to sell items
                    to their friends and network.
                </CustomText>
                <LargeButton
                    title="get started"
                    onPress={() => {
                        authStore.setAuthStatus(AuthStatus.SIGNUP);
                        // handleSnapPress(0);
                    }}
                    footer
                    footerButtonPrimary
                    footerButtonTitle="i already have an account"
                    footerButtonOnPress={() => {
                        authStore.setAuthStatus(AuthStatus.LOGIN);
                        // handleSnapPress(0);
                    }}
                />
            </View>
            <View style={{ position: "absolute", bottom: 70 }}>
                <CustomText secondary font="Bold" textAlign="center">
                    made with ❤️ by Filippo Fonseca{"\n"} and the diush
                    contributors.
                </CustomText>
            </View>
        </>
    );
};

export default observer(SquareOne);
