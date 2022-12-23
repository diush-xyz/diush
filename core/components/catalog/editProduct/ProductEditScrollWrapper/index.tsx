import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import { useUtilStore } from "../../../../state/Util.store";
import CustomText from "../../../lib/CustomText";

interface IProductEditScrollWrapper {
    children: React.ReactNode;
}

const ProductEditScrollWrapper = (props: IProductEditScrollWrapper) => {
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
            <View
                style={{
                    height: 300,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    paddingBottom: 100,
                }}
            >
                <CustomText secondary font="Bold" textAlign="center">
                    brought to you with ❤️{"\n"} by the diush community.
                </CustomText>
            </View>
        </ScrollView>
    );
};

export default ProductEditScrollWrapper;
