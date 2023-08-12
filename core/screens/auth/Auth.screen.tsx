import { Animated, Easing, View } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText/CustomText.ui";
import NoBackgroundLogo from "../../icons/auth/NoBackgroundLogo";
import { useAuthStore } from "../../state/auth/Auth.store";
import { observer } from "mobx-react";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import LargeButton from "../../components/lib/LargeButton";
import { AuthStatus } from "../../@types/GlobalTypes";
import BottomSheet from "@gorhom/bottom-sheet";
import SignupFlow from "./signup";
import LoginFlow from "./login";
import { BOTTOM_SHEET_SNAP_POINTS } from "../../utils/constants";
import { useTheme } from "../../utils/useTheme.util";
import SquareOne from "./squareOne/SquareOne";

const AuthScreen = () => {
    const authStore = useAuthStore();

    const theme = useTheme();

    const sheetRef = React.useRef<BottomSheet>(null);

    const handleSnapPress = React.useCallback(index => {
        sheetRef.current?.snapToIndex(index);
        authStore.setIsSheetOpen(true);
    }, []);

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

    const populateContent = () => {
        switch (authStore.authStatus) {
            case AuthStatus.SQUARE_ONE:
                return <SquareOne />;
            case AuthStatus.LOGIN:
                return <LoginFlow />;
            case AuthStatus.SIGNUP:
                return <SignupFlow />;
            default:
                return <SquareOne />;
        }
    };

    return <>{populateContent()}</>;
};

export default observer(AuthScreen);
