import React from "react";
import { SvgProps } from "react-native-svg";
import Icon from "./warning.svg";

const WarningIcon = (props: SvgProps) => {
    return <Icon {...props} />;
};

export default WarningIcon;
