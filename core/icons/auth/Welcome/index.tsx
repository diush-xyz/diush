import React from "react";
import { SvgProps } from "react-native-svg";
import Icon from "./welcome.svg";

const WelcomeIcon = (props: SvgProps) => {
    return <Icon {...props} />;
};

export default WelcomeIcon;
