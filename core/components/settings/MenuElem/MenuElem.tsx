import React from "react";
import { TouchableOpacity } from "react-native";
import SettingsChevronRight from "../../../icons/settings/chevronRight";
import CustomText from "../../lib/CustomText";
import HorizontalLine from "../../lib/HorizontalLine";

interface IMenuElem {
    text: string;
    onClick: () => void;
    idx: number;
}

const MenuElem = (props: IMenuElem) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => props.onClick()}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: props.idx == 0 && 8,
                }}
            >
                <CustomText>{props.text}</CustomText>
                <SettingsChevronRight />
            </TouchableOpacity>
            <HorizontalLine marginVertical={16} />
        </>
    );
};

export default MenuElem;
