import { View, Text } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import CustomText from "../../../lib/CustomText";
import CustomTextInput from "../../../lib/CustomTextInput";
import LargeButton from "../../../lib/LargeButton";
import { observer } from "mobx-react";
import { useUtilStore } from "../../../../state/Util.store";
import ScrollWrapper from "../../ScrollWrapper/ScrollWrapper";
import { containsWhitespace } from "../../../../utils/containsWhitespace";

const DisplayNameSignup = () => {
    const signupStore = useSignupStore();
    const utilStore = useUtilStore();
    const [allClear, setAllClear] = React.useState<boolean>(false);
    const [errMsg, setErrMsg] = React.useState<string>("");
    const [firstTime, setFirstTime] = React.useState<boolean>(true);

    const checkIfProceed = () => {
        setFirstTime(false);
        if (allClear) {
            signupStore.setCurrentStep(signupStore.currentStep + 1);
        }
    };

    React.useEffect(() => {
        if (
            signupStore.displayName === "" ||
            !containsWhitespace(signupStore.displayName)
        ) {
            setAllClear(false);
            setErrMsg(
                !containsWhitespace(signupStore.displayName)
                    ? "please provide your full name. we highly value transparency with our deals."
                    : "hang on! we need a way to refer to you in order to move on."
            );
        } else {
            setAllClear(true);
        }

        console.log("the email: " + signupStore.email);
        console.log("the clear: " + allClear);
    });

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    signupStore.setCurrentStep(signupStore.currentStep - 1)
                }
                title="name"
                subtitle="signup"
                progressIndicator
                currentStep={5}
                totalSteps={6}
            />
            <ScrollWrapper>
                <FlowTemplate
                    circleEmoji="🍩"
                    title="how should we call you?"
                    desc={
                        "please provide your full real name.\n it’s important to interact with other users."
                    }
                    marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
                >
                    <CustomTextInput
                        placeholder="your name"
                        onChangeText={text => signupStore.setDisplayName(text)}
                        marginBottom={32}
                        defaultValue={signupStore.displayName}
                        isValid={allClear}
                        isErr={!allClear && !firstTime}
                        errMsg={errMsg}
                        returnKeyType="done"
                        autoCorrect={false}
                        onSubmitEditing={() => checkIfProceed()}
                    />
                    <LargeButton
                        title="continue"
                        onPress={() => checkIfProceed()}
                        footer
                        disabled={!allClear && !firstTime}
                        footerButtonTitle="cancel"
                        footerButtonOnPress={() => signupStore.cancel()}
                    />
                </FlowTemplate>
            </ScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(DisplayNameSignup);
