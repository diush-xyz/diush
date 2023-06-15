import { KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import { useUtilStore } from "../../../state/Util.store";

interface IScrollWrapper {
    children: React.ReactNode;
    isTextArea?: boolean;
    height?: number;
    opacity?: string;
}

const ScrollWrapper = (props: IScrollWrapper) => {
    const utilStore = useUtilStore();

    return (
        <KeyboardAvoidingView
            style={{
                width: "100%",
                position: utilStore.isKeyboardOpen ? "absolute" : null,
                top: utilStore.isKeyboardOpen ? 75 : null,
            }}
        >
            <ScrollView
                style={{
                    height: props.height ?? (props.isTextArea ? 450 : 400),
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

export default ScrollWrapper;
