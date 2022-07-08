import React from "react";
import { StyleSheet } from "react-native";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useTheme } from "../../../utils/useTheme.util";
import { ThemeConsumer } from "styled-components";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { generateOtpCode } from "../../../utils/generateOtpCode.util";

interface IOTPInputField {
    code: string;
    onCodeFilled: (code: string) => void;
}

const theme = useTheme();

const OTPInputField = () => {
    const signupStore = useSignupStore();

    React.useEffect(() => {
        //generate the initial OTP code:
        signupStore.setOtpCode(generateOtpCode());
        signupStore.setCodeMatches(false);
        console.log("the code: " + signupStore.otpCode);
        signupStore.setIsVerifyError(false);
    }, []);

    return (
        <>
            {/*@ts-ignore*/}
            <OTPInputView
                style={{ width: 180, height: 80 }}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={{
                    width: 39,
                    height: 45,
                    borderWidth: 0,
                    borderBottomWidth: 2,
                    fontSize: 20,
                    fontFamily: "Heavy",
                    borderColor: signupStore.codeMatches
                        ? theme.success
                        : theme.secondary,
                    color: theme.primaryText,
                }}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                    if (code === signupStore.otpCode) {
                        signupStore.setCodeMatches(true);
                        signupStore.setIsVerifyError(false);
                        //delay the next step for an improved UX and a proper transition:
                        setTimeout(() => {
                            signupStore.setCurrentStep(
                                signupStore.currentStep + 1
                            );
                        }, 500);
                    } else {
                        signupStore.setCodeMatches(false);
                        signupStore.setIsVerifyError(true);
                    }
                }}
                selectionColor={theme.accent}
            />
        </>
    );
};

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 39,
        height: 50,
    },

    borderStyleHighLighted: {
        borderColor: theme.accent,
    },

    underlineStyleBase: {},

    underlineStyleHighLighted: {
        borderColor: theme.accent,
    },
});

export default observer(OTPInputField);
