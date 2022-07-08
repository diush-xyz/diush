import { View, Text, TextInput, Keyboard } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import SignupOptionButton from "../../SignupOptionbutton/SignupOptionButton";
import LargeButton from "../../../lib/LargeButton";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import { useTheme } from "../../../../utils/useTheme.util";
import CustomTextInput from "../../../lib/CustomTextInput";
import { validateEmail } from "../../../../utils/validateEmail.util";
import CustomText from "../../../lib/CustomText";
import KeyboardListener from "react-native-keyboard-listener";

const EmailSignup = () => {
    const signupStore = useSignupStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");

    const [keyboardShow, setKeyboardShow] = React.useState<boolean>();

    React.useEffect(() => {
        //TODO: Come back later (two-letter domain extensions do not work, neither does .ed.cr,)
        // setIsReady(validateEmail(signupStore.email));

        // check if signupStore.email is empty or does not contain an @ sign. if any of these conditions are true, set the allClear var to false and set the errMsg var to the appropriate error message.
        if (signupStore.email === "" || !signupStore.email.includes("@")) {
            setAllClear(false);
            setErrMsg("oop! you need a valid email address to continue.");
        } else {
            setAllClear(true);
        }

        console.log("the email: " + signupStore.email);
        console.log(allClear);
    });

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <KeyboardListener
                onWillShow={() => setKeyboardShow(true)}
                onWillHide={() => setKeyboardShow(false)}
            />
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    signupStore.setCurrentStep(signupStore.currentStep - 1)
                }
                title="email"
                subtitle="signup"
                progressIndicator
                currentStep={2}
                totalSteps={6}
            />
            <FlowTemplate
                circleEmoji="✉️"
                title="email"
                desc={"please enter your email address below."}
                marginBottom={keyboardShow ? "200px" : null}
            >
                <CustomTextInput
                    placeholder="my email"
                    onChangeText={text => signupStore.setEmail(text)}
                    marginBottom={32}
                    defaultValue={signupStore.email}
                    keyboardType="email-address"
                    isValid={allClear}
                    isErr={!allClear && !firstTime}
                    errMsg={errMsg}
                />
                {/*//TODO: Add disabled validation with text field*/}
                <LargeButton
                    title="continue"
                    onPress={() => {
                        setFirstTime(false);
                        if (allClear) {
                            signupStore.setCurrentStep(2);
                        }
                    }}
                    footer
                    disabled={!allClear && !firstTime}
                    footerButtonTitle="cancel"
                    footerButtonOnPress={() => signupStore.cancel()}
                />
            </FlowTemplate>
        </BottomSheetView>
    );
};

export default observer(EmailSignup);
