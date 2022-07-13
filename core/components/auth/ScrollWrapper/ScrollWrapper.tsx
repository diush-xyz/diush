import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import { useUtilStore } from "../../../state/Util.store";

interface IScrollWrapper {
    children: React.ReactNode;
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
                    height: 400,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/*@ts-ignore*/}
                {props.children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ScrollWrapper;
