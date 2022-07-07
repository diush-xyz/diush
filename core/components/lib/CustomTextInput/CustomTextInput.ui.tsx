import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../CustomText";

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
        <View style={{ display: "flex", width: "100%" }}>
            <TextInput
                style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    height: 45,
                    paddingHorizontal: 10,
                    paddingVertical: 14,
                    width: "100%",
                    fontSize: 14,
                    fontWeight: "bold",
                    borderRadius: 12,
                    color: theme.primaryText,
                    maxWidth: 328,
                    marginBottom: props.isErr ? 7 : props.marginBottom || 0,
                    marginHorizontal: 20,
                    //TODO: remove this in extraction
                }}
                selectionColor={theme.accent}
                placeholderTextColor={theme.secondary}
                placeholder="your email"
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
                defaultValue={props.defaultValue}
            />
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
