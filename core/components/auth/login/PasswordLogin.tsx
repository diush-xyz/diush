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
import ScrollWrapper from "../ScrollWrapper/ScrollWrapper";

const PasswordSignup = () => {
    const loginStore = useLoginStore();
    const utilStore = useUtilStore();
    const [allClear, setAllClear] = React.useState<boolean>(false);
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [errMsg, setErrMsg] = React.useState<string>("");

    const login = () => {
        setAllClear(true);
        setFirstTime(false);
        signInWithEmailAndPassword(auth, loginStore.email, loginStore.password)
            .then(userCredentials => {
                setAllClear(true);
                const user = userCredentials.user;
                console.log("Logged in with:", user.email);
            })
            .catch((error: FirebaseError) => {
                setAllClear(false);
                console.log("from login: " + error);

                if (
                    error.code === "auth/wrong-password" ||
                    error.code === "auth/user-not-found"
                ) {
                    setErrMsg(
                        "check again! It appears your password does not match our records or is invalid."
                    );
                    return;
                }
                if (loginStore.password == "") {
                    setErrMsg("oop! You forgot to type in your password.");
                    return;
                } else {
                    setErrMsg(
                        "an unexpected error occured. please try again later!"
                    );
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
                subtitle="login"
                progressIndicator
                currentStep={2}
                totalSteps={2}
            />
            <ScrollWrapper>
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
                        autoCorrect={false}
                        onSubmitEditing={() => login()}
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
            </ScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(PasswordSignup);
