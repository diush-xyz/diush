import React from "react";
import { SvgProps } from "react-native-svg";
import Icon from "./image-overlay.svg";

const ImageOverlay = (props: SvgProps) => {
    return <Icon {...props} />;
};

export default ImageOverlay;
