import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

export const CustomLoeader = () => {
    return (
        <View
            style={{
                height: 300,
            }}
        >
            <WebView
                scalesPageToFit={false}
                originWhitelist={["*"]}
                domStorageEnabled={true}
                source={{ uri: "file:///android_asset/animated.svg" }}
                style={{
                    width: 200,
                    height: 200,
                }}
            />
        </View>
    );
};

export default CustomLoeader;
