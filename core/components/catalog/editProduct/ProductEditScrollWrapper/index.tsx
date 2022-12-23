import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import { useUtilStore } from "../../../../state/Util.store";

interface IProductEditScrollWrapper {
    children: React.ReactNode;
}

const ProductEditScrollWrapper = (props: IProductEditScrollWrapper) => {
    const utilStore = useUtilStore();

    return (
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
            <View style={{ height: 100, width: "100%" }} />
        </ScrollView>
    );
};

export default ProductEditScrollWrapper;
