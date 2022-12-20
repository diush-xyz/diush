import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";

interface IProductViewScrollWrapper {
    children: React.ReactNode;
}

const ProductViewScrollWrapper = (props: IProductViewScrollWrapper) => {
    // const utilStore = useUtilStore();

    return (
        <KeyboardAvoidingView
            style={{
                width: "100%",
                // position: utilStore.isKeyboardOpen ? "absolute" : null,
                // top: utilStore.isKeyboardOpen ? 75 : null,
            }}
        >
            <ScrollView
                style={{
                    height: "100%",
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

export default ProductViewScrollWrapper;
