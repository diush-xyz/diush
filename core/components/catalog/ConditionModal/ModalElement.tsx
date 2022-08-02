import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../../lib/CustomText";
import InfoIcon from "../../../icons/common/info";

interface IModalElement {
    text: string;
    noBorderBottom?: boolean;
    onPress: () => void;
}

const ModalElement = (props: IModalElement) => {
    const theme = useTheme();
    return (
        <TouchableOpacity style={{ width: "100%" }} onPress={props.onPress}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottomWidth: !props.noBorderBottom && 1,
                    borderBottomColor: !props.noBorderBottom && theme.secondary,
                    width: "100%",
                    paddingVertical: 16,
                    paddingHorizontal: 12,
                }}
            >
                <CustomText textAlign="left" style={{ marginRight: 6 }}>
                    {props.text}
                </CustomText>
                <InfoIcon onPress={() => null} />
            </View>
        </TouchableOpacity>
    );
};

export default ModalElement;
