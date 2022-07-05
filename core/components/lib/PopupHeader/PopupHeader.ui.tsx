import {
    View,
    Text,
    GestureResponderEvent,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { HeaderWrapper } from "./styles";
import CustomText from "../CustomText";
import LeftArrowIcon from "../../../icons/common/leftArrow";

export interface IPopupHeader {
    backArrow?: boolean;
    backArrowOnPress?: (event: GestureResponderEvent) => void;
}

/**
 * Acts as a nav bar (header) of sorts for popups.
 */
const PopupHeader = (props: IPopupHeader) => {
    return (
        // <HeaderWrapper>
        //     <TouchableOpacity
        //         onPress={props.backArrow ? props.backArrowOnPress : () => null}
        //     >
        //         <LeftArrowIcon style={{ opacity: props.backArrow ? 1 : 0 }} />
        //     </TouchableOpacity>
        //     <View style={{ display: "flex", flexDirection: "column" }}>
        //         <CustomText
        //             primary
        //             textAlign="center"
        //             font="Bold"
        //             fontSize={16}
        //         >
        //             method
        //         </CustomText>
        //         <CustomText secondary textAlign="center" fontSize={14}>
        //             signup
        //         </CustomText>
        //     </View>
        //     <View style={{ padding: }}
        // </HeaderWrapper>
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                position: "absolute",
                top: 0,
                paddingLeft: 20,
                paddingRight: 20,
            }}
        >
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    marginRight: "auto",
                }}
            >
                <TouchableOpacity
                    onPress={
                        props.backArrow ? props.backArrowOnPress : () => null
                    }
                >
                    <LeftArrowIcon
                        style={{ opacity: props.backArrow ? 1 : 0 }}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
            >
                <View style={{ display: "flex", flexDirection: "column" }}>
                    <CustomText
                        primary
                        textAlign="center"
                        font="Bold"
                        fontSize={16}
                    >
                        method
                    </CustomText>
                    <CustomText secondary textAlign="center" fontSize={14}>
                        signup
                    </CustomText>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    marginLeft: "auto",
                }}
            >
                <View
                    style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        maxWidth: 41,
                        marginLeft: "auto",
                        marginRight: 0,
                        borderRadius: 12,
                    }}
                >
                    <CustomText secondary textAlign="right">
                        1/6
                    </CustomText>
                </View>
            </View>
        </View>
    );
};

export default PopupHeader;
