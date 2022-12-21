import { View, Text } from "react-native";
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

const FinalWelcomeSignup = () => {
    const signupStore = useSignupStore();
    const authStore = useAuthStore();

    const displayName = signupStore.displayName;

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
    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <WelcomeIcon />
            <View style={{ width: "100%", marginBottom: 90 }}>
                <CustomText
                    primary
                    font="Bold"
                    fontSize={24}
                    textAlign="center"
                    style={{ marginTop: 24, marginBottom: 12 }}
                >
                    welcome to diush, {signupStore.displayName}!
                </CustomText>
                <CustomText
                    secondary
                    font="Semibold"
                    fontSize={16}
                    textAlign="center"
                    style={{ marginBottom: 40 }}
                >
                    we are thrilled to have you as the newest{"\n"} member of
                    our community.
                </CustomText>
                <LargeButton title="cool, let's go" onPress={() => signUp()} />
            </View>
        </BottomSheetView>
    );
};

export default observer(FinalWelcomeSignup);
