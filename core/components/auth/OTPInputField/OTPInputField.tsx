import React from "react";
import { StyleSheet } from "react-native";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useTheme } from "../../../utils/useTheme.util";
import { ThemeConsumer } from "styled-components";

interface IOTPInputField {
    code: string;
    onCodeFilled: (code: string) => void;
}

const theme = useTheme();

const OTPInputField = () => {
    return (
        <>
            {/*@ts-ignore*/}
            <OTPInputView
                style={{ width: 180, height: 80 }}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
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

    underlineStyleBase: {
        width: 39,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 2,
        fontSize: 20,
        fontFamily: "Heavy",
        borderColor: theme.secondary,
        color: theme.primaryText,
    },

    underlineStyleHighLighted: {
        borderColor: theme.accent,
    },
});

export default OTPInputField;
