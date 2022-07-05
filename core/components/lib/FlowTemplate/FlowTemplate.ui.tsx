import { View, Text } from "react-native";
import React from "react";
import CustomGradientCircle from "../../auth/CustomGradientCircle";
import CustomText from "../CustomText";
import { FlowTemplateWrapper } from "./styles";

interface IFlowTemplate {
    circleEmoji: string;
    title: string;
    desc: string;
}

const FlowTemplate = (props: IFlowTemplate) => {
    return (
        <FlowTemplateWrapper>
            <CustomGradientCircle emoji={props.circleEmoji} />
            <CustomText
                primary
                font="Bold"
                fontSize={24}
                style={{ marginTop: 24, marginBottom: 12 }}
            >
                {props.title}
            </CustomText>
            <CustomText
                secondary
                font="Semibold"
                fontSize={16}
                textAlign="center"
                style={{ marginBottom: 80 }}
            >
                {props.desc}
            </CustomText>
        </FlowTemplateWrapper>
    );
};

export default FlowTemplate;
