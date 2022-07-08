import React from "react";
import { StyleSheet } from "react-native";

import OTPInputView from "@twotalltotems/react-native-otp-input";

const OTPInputField = () => {
    return (
        <>
            {/*@ts-ignore*/}
            <OTPInputView
                style={{ width: "80%", height: 200 }}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});

export default OTPInputField;
