import { View, Text, Animated } from "react-native";
import React from "react";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../../lib/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ISwitcher {
    text1: string;
    text2: string;
    is1Active: boolean;
    set1Active: (status: boolean) => void;
    is2Active: boolean;
    set2Active: (status: boolean) => void;
}

const Switcher = (props: ISwitcher) => {
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
                    onPress={() => {
                        props.set1Active(true);
                        props.set2Active(false);
                    }}
                >
                    <CustomText
                        primary={props.is1Active && !props.is2Active}
                        secondary={!props.is1Active && props.is2Active}
                    >
                        {props.text1}
                    </CustomText>
                    {props.is1Active && (
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
                    onPress={() => {
                        props.set1Active(false);
                        props.set2Active(true);
                    }}
                >
                    <CustomText
                        primary={props.is2Active && !props.is1Active}
                        secondary={!props.is2Active && props.is1Active}
                    >
                        {props.text2}
                    </CustomText>
                    {props.is2Active && (
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
