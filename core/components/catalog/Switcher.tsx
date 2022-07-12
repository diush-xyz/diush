import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../../utils/useTheme.util";
import CustomText from "../lib/CustomText";

const Switcher = () => {
    const theme = useTheme();
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderBottomColor: theme.secondary,
                borderBottomWidth: 1,
                marginTop: 15,
                marginBottom: 22,
            }}
        >
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                    paddingBottom: 12,
                    paddingHorizontal: 8,
                }}
            >
                <CustomText primary textAlign="center">
                    active
                </CustomText>
                <View
                    style={{
                        height: 3,
                        backgroundColor: theme.accent,
                        width: "100%",
                        borderRadius: 3,
                        position: "absolute",
                        bottom: 0,
                    }}
                />
            </View>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                    paddingBottom: 12,
                }}
            >
                <CustomText primary>active</CustomText>
            </View>
        </View>
    );
};

export default Switcher;
