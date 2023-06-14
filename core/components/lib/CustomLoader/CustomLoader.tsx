import React from "react";
import { View, Text, Animated, Easing } from "react-native";
import { WebView } from "react-native-webview";
import NoBackgroundLogo from "../../../icons/auth/NoBackgroundLogo";

export const CustomLoeader = () => {
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
    return (
        <Animated.View
            style={{
                transform: [{ translateY }, { scale }],
            }}
        >
            <NoBackgroundLogo fill="#ffffff" />
        </Animated.View>
    );
};

export default CustomLoeader;
