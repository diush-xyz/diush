import styled from "styled-components/native";

interface FlowTemplateWrapperProps {
    marginBottom?: string;
}

export const FlowTemplateWrapper = styled.View<FlowTemplateWrapperProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: ${props => props.marginBottom || "30px"};
`;
