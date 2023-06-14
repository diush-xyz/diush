import React from "react";
import { Animated, Easing } from "react-native";
import NoBackgroundLogo from "../../../icons/auth/NoBackgroundLogo";

export const CustomLoeader = () => {
    const spinValue: Animated.Value = new Animated.Value(0);

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 650,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    React.useEffect(() => {
        startAnimation();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.View
            style={{
                transform: [{ rotate: spin }],
            }}
        >
            <NoBackgroundLogo fill="#ffffff" />
        </Animated.View>
    );
};

export default CustomLoeader;
