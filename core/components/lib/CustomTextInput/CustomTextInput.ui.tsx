import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../CustomText";
import EmailIcon from "../../../icons/auth/Email";
import WarningIcon from "../../../icons/common/warning";

interface ICustomTextInput {
    placeholder: string;
    onChangeText: (text: string) => void;
    defaultValue?: string;
    marginBottom?: number;
    keyboardType?: KeyboardTypeOptions;
    isErr?: boolean;
    errMsg?: string;
}

const CustomTextInput = (props: ICustomTextInput) => {
    const theme = useTheme();
    return (
        <View
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    height: 45,
                    width: "100%",
                    maxWidth: 328,
                    marginBottom: props.isErr ? 7 : props.marginBottom || 0,
                    borderRadius: 12,
                    paddingHorizontal: 20,
                }}
            >
                <TextInput
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        fontSize: 14,
                        fontWeight: "bold",
                        color: theme.primaryText,
                        //TODO: remove this in extraction
                    }}
                    selectionColor={theme.accent}
                    placeholderTextColor={theme.secondary}
                    placeholder="your email"
                    onChangeText={props.onChangeText}
                    keyboardType={props.keyboardType}
                    defaultValue={props.defaultValue}
                />
                {props.isErr && <WarningIcon />}
            </View>
            {props.isErr && (
                <View
                    style={{
                        display: "flex",
                        backgroundColor: theme.accent,
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        width: "100%",
                        marginBottom: props.marginBottom || 0,
                    }}
                >
                    <CustomText primary fontSize={12} font="Bold">
                        This is an error
                    </CustomText>
                </View>
            )}
        </View>
    );
};

export default observer(CustomTextInput);