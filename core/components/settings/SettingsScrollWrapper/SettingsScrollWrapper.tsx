import { KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";

interface ISettingsScrollWrapper {
    children: React.ReactNode;
    height?: number;
}

const SettingsScrollWrapper = (props: ISettingsScrollWrapper) => {
    return (
        <KeyboardAvoidingView
            style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ScrollView
                style={{
                    height: props.height ?? 400,
                    width: "100%",
                }}
                contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
                showsVerticalScrollIndicator={false}
                //hide the keyboard when the user taps outside
                keyboardShouldPersistTaps="handled"
            >
                {/*@ts-ignore*/}
                {props.children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SettingsScrollWrapper;
