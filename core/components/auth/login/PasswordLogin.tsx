import { View, Text } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import { useLoginStore } from "../../../state/auth/Login.store";
import { useUtilStore } from "../../../state/Util.store";
import CustomTextInput from "../../lib/CustomTextInput";
import FlowTemplate from "../../lib/FlowTemplate";
import LargeButton from "../../lib/LargeButton";
import PopupHeader from "../../lib/PopupHeader";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config/firebase";

const PasswordSignup = () => {
    const loginStore = useLoginStore();
    const utilStore = useUtilStore();
    const [allClear, setAllClear] = React.useState<boolean>(false);
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [errMsg, setErrMsg] = React.useState<string>("");

    const login = () => {
        setFirstTime(false);
        signInWithEmailAndPassword(auth, loginStore.email, loginStore.password)
            .then(userCredentials => {
                setAllClear(true);
                setErrMsg("");
                const user = userCredentials.user;
                console.log("Logged in with:", user.email);
            })
            .catch((error: FirebaseError) => {
                setAllClear(false);
                console.log("from login: " + error);
                if (error.code === "auth/user-not-found") {
                    setErrMsg(
                        "Check again! It appears your email does not match our password records or is invalid."
                    );
                }

                if (loginStore.password == "") {
                    setErrMsg("Oop! You forgot to type your password.");
                }
            });
    };

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    loginStore.setCurrentStep(loginStore.currentStep - 1)
                }
                title="password"
                subtitle="signup"
                progressIndicator
                currentStep={3}
                totalSteps={5}
            />
            <FlowTemplate
                circleEmoji="🔐"
                title="password"
                desc="make sure it's difficult for others to guess."
                marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
            >
                <CustomTextInput
                    placeholder="password"
                    onChangeText={text => loginStore.setPassword(text)}
                    marginBottom={32}
                    defaultValue={loginStore.password}
                    isValid={allClear}
                    isErr={!allClear && !firstTime}
                    errMsg={errMsg}
                    returnKeyType="done"
                    isPassword
                />
                <LargeButton
                    title="continue"
                    onPress={() => login()}
                    footer
                    // disabled={!allClear && !firstTime}
                    footerButtonTitle="cancel"
                    footerButtonOnPress={() => loginStore.cancel()}
                />
            </FlowTemplate>
        </BottomSheetView>
    );
};

export default observer(PasswordSignup);
