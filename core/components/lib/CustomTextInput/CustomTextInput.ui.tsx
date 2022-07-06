import { View, Text, TextInput } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useTheme } from "../../../utils/useTheme.util";

interface ICustomTextInput {
    placeholder: string;
    onChangeText: (text: string) => void;
    defaultValue?: string;
    marginBottom?: number;
}

const CustomTextInput = (props: ICustomTextInput) => {
    const theme = useTheme();
    return (
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
                //TODO: remove this in extraction
                marginBottom: props.marginBottom || 0,
            }}
            selectionColor={theme.accent}
            placeholderTextColor={theme.secondary}
            placeholder="your email"
            onChangeText={props.onChangeText}
        />
    );
};

export default observer(CustomTextInput);
