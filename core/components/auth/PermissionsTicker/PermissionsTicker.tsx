import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MAX_WIDTH } from "../../../utils/constants";
import Checkbox from "expo-checkbox";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../../lib/CustomText";

interface IPermissionsTicker {
    data: Data[];
}

interface Data {
    isChecked: boolean;
    onTap: () => void;
    text: string;
    marginBottom?: string;
    desc: string;
}

const PermissionsTicker = (props: IPermissionsTicker) => {
    const theme = useTheme();

    return (
        <>
            {props.data.map((item, index) => {
                return (
                    <>
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                alignItems: "center",
                                marginBottom: item.marginBottom || 0,
                            }}
                            key={index}
                            onPress={item.onTap}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.05)",
                                    width: "100%",
                                    maxWidth: MAX_WIDTH,
                                    paddingVertical: 15,
                                    paddingHorizontal: 17,
                                    borderRadius: 12,
                                    opacity: item.isChecked ? 1 : 0.5,
                                }}
                            >
                                <Checkbox
                                    style={{
                                        borderRadius: 4,
                                        height: 18,
                                        width: 18,
                                        marginRight: 10,
                                        borderWidth: 3,
                                        borderColor: theme.accent,
                                    }}
                                    value={item.isChecked}
                                    onValueChange={item.onTap}
                                    color={
                                        item.isChecked
                                            ? theme.accent
                                            : theme.secondary
                                    }
                                />
                                <CustomText secondary>{item.text}</CustomText>
                            </View>
                        </TouchableOpacity>
                        <CustomText
                            secondary
                            style={{
                                maxWidth: MAX_WIDTH,
                                marginTop: 12,
                                marginBottom: 20,
                            }}
                        >
                            {item.desc}
                        </CustomText>
                    </>
                );
            })}
        </>
    );
};

export default PermissionsTicker;
