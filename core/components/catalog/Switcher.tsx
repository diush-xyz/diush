import { View, Text, Animated } from "react-native";
import React from "react";
import { useTheme } from "../../utils/useTheme.util";
import CustomText from "../lib/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";

const Switcher = () => {
    const [isSoldActive, setIsSoldActive] = React.useState<boolean>(false);
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
            <View style={{ width: "50%" }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        paddingBottom: 12,
                    }}
                    onPress={() => setIsSoldActive(!isSoldActive)}
                >
                    <CustomText
                        primary={!isSoldActive}
                        secondary={isSoldActive}
                    >
                        active
                    </CustomText>
                    {!isSoldActive && (
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
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ width: "50%" }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        paddingBottom: 12,
                    }}
                    onPress={() => setIsSoldActive(!isSoldActive)}
                >
                    <CustomText
                        primary={isSoldActive}
                        secondary={!isSoldActive}
                    >
                        sold
                    </CustomText>
                    {isSoldActive && (
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
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Switcher;
