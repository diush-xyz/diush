import { View, Text } from "react-native";
import React from "react";
import CustomGradientCircle from "../../auth/CustomGradientCircle";
import CustomText from "../CustomText";
import { FlowTemplateWrapper } from "./styles";

interface IFlowTemplate {
    circleEmoji: string;
    title: string;
    desc: string;
    children: React.ReactNode;
    marginBottom?: string;
    descAndChildMargin?: number;
}

const FlowTemplate = (props: IFlowTemplate) => {
    return (
        <FlowTemplateWrapper marginBottom={props.marginBottom}>
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
                style={{ marginBottom: props.descAndChildMargin ?? 40 }}
            >
                {props.desc}
            </CustomText>
            {props.children}
        </FlowTemplateWrapper>
    );
};

export default FlowTemplate;
