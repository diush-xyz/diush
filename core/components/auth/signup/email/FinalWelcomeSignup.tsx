import { View, Text, Image, Animated, Easing } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import { observer } from "mobx-react";
import CustomText from "../../../lib/CustomText";
import WelcomeIcon from "../../../../icons/auth/Welcome";
import LargeButton from "../../../lib/LargeButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../config/firebase";
import { createUserInDb } from "../../../../utils/user.utils";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import { AuthStatus } from "../../../../@types/GlobalTypes";
import DiagramIcon from "../../../../icons/auth/Diagram";

const FinalWelcomeSignup = () => {
    const signupStore = useSignupStore();
    const authStore = useAuthStore();

    const displayName = signupStore.displayName;
    const location = signupStore.location;

    const signUp = () => {
        createUserWithEmailAndPassword(
            auth,
            signupStore.email,
            signupStore.password
        )
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log("Created: " + user.email);

                createUserInDb({
                    id: user.uid,
                    displayName: displayName,
                    email: user.email,
                    photoURL: null,
                    location: location,
                }).then(() => {
                    console.log(displayName);
                });

                authStore.setAuthStatus(AuthStatus.AUTHENTICATED);
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const [isTop, setIsTop] = React.useState(true);

    const startAnimation = toValue => {
        Animated.timing(animatedValue, {
            toValue,
            duration: 750,
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
        outputRange: [1.02, 0.9],
        extrapolate: "clamp",
    });
    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            {/* <WelcomeIcon style={{ marginTop: 45 }} /> */}
            <Animated.View
                style={{
                    transform: [{ translateY }, { scale }],
                    marginBottom: 15,
                }}
            >
                <Image
                    source={{
                        uri: "https://i.ibb.co/3Ty5ySw/heart.png",
                        height: 67,
                        width: 84,
                    }}
                    style={{ marginTop: 45 }}
                />
            </Animated.View>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginBottom: 60,
                }}
            >
                <CustomText
                    primary
                    font="Bold"
                    fontSize={24}
                    textAlign="center"
                    style={{ marginTop: 6, marginBottom: 12 }}
                >
                    welcome to diush, {signupStore.displayName.split(" ")[0]}!
                </CustomText>
                <CustomText
                    secondary
                    font="Semibold"
                    fontSize={16}
                    textAlign="center"
                    style={{ marginBottom: 20 }}
                >
                    we are thrilled to have you as the newest{"\n"} member of
                    our community.
                </CustomText>
                <Image
                    source={{
                        uri: "https://i.ibb.co/L6HW4yy/ddhjhh.png",
                        height: 430,
                        width: 315,
                    }}
                    style={{ marginBottom: 15 }}
                />
                <LargeButton title="cool, let's go" onPress={() => signUp()} />
            </View>
        </BottomSheetView>
    );
};

export default observer(FinalWelcomeSignup);
