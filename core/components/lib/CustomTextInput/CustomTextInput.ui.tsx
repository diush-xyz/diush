import {
    View,
    Text,
    TextInput,
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    TextInputSubmitEditingEventData,
    NativeSyntheticEvent,
    TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { observer } from "mobx-react";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../CustomText";
import EmailIcon from "../../../icons/auth/Email";
import WarningIcon from "../../../icons/common/warning";
import SuccessIcon from "../../../icons/common/success";
import { MAX_WIDTH } from "../../../utils/constants";
import SearchIcon from "../../../icons/catalog/Search";
import { SvgProps } from "react-native-svg";

interface ICustomTextInput {
    placeholder: string;
    onChangeText: (text: string) => void;
    defaultValue?: string;
    marginBottom?: number;
    keyboardType?: KeyboardTypeOptions;
    isErr?: boolean;
    errMsg?: string;
    isValid?: boolean;
    returnKeyType?: ReturnKeyTypeOptions;
    isPassword?: boolean;
    isSearch?: boolean;
    isLarge?: boolean;
    autoCorrect?: boolean;
    customWidth?: number;
    onSubmitEditing?: (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => void;
}

const CustomTextInput = (props: ICustomTextInput) => {
    const theme = useTheme();
    const [secure, setSecure] = React.useState<boolean>(false);
    const textInputRef = useRef<TextInput>();

    React.useEffect(() => {
        if (props.isPassword) {
            setSecure(true);
        }
    }, []);

    return (
        <View
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <TouchableOpacity
                onPress={() => textInputRef.current.focus()}
                style={{
                    display: "flex",
                    alignItems: props.isLarge ? "flex-start" : "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    height: props.isLarge ? 136 : 45,
                    width: "100%",
                    maxWidth: props.customWidth ?? MAX_WIDTH,
                    marginBottom: props.isErr ? 7 : props.marginBottom || 0,
                    borderRadius: 12,
                    paddingHorizontal: 20,
                    paddingTop: props.isLarge && 14,
                }}
                activeOpacity={1}
            >
                {props.isSearch && <SearchIcon style={{ marginRight: 8 }} />}
                <TextInput
                    ref={textInputRef}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        fontSize: 14,
                        fontWeight: "bold",
                        color: theme.primaryText,
                        //TODO: remove this in extraction
                    }}
                    multiline={props.isLarge}
                    numberOfLines={props.isLarge && 10}
                    selectionColor={theme.accent}
                    placeholderTextColor={theme.secondary}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    keyboardType={props.keyboardType}
                    defaultValue={props.defaultValue}
                    returnKeyType={props.returnKeyType}
                    secureTextEntry={secure}
                    autoCorrect={props.autoCorrect}
                    onSubmitEditing={props.onSubmitEditing}
                />
                {props.isValid && <SuccessIcon />}
                {props.isErr && <WarningIcon />}
            </TouchableOpacity>
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
                        {props.errMsg ?? "something went wrong!"}
                    </CustomText>
                </View>
            )}
        </View>
    );
};

export default observer(CustomTextInput);
