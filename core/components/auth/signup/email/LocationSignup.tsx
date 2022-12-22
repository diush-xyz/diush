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

const LocationSignup = () => {
    const signupStore = useSignupStore();
    const utilStore = useUtilStore();
    const [allClear, setAllClear] = React.useState<boolean>(false);
    const [errMsg, setErrMsg] = React.useState<string>("");
    const [firstTime, setFirstTime] = React.useState<boolean>(true);

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
                currentStep={6}
                totalSteps={6}
            />
            <ScrollWrapper>
                <FlowTemplate
                    circleEmoji="🗺️"
                    title="where are you located?"
                    desc={
                        "although optional, it's convenient for your potential\n buyers to know where the item is right now.\n Can be as simple as 'Dallas, TX'."
                    }
                    marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
                >
                    <CustomTextInput
                        placeholder="San Francisco, California"
                        onChangeText={text => signupStore.setLocation(text)}
                        marginBottom={32}
                        defaultValue={signupStore.location}
                        isValid={allClear}
                        isErr={!allClear && !firstTime}
                        errMsg={errMsg}
                        returnKeyType="done"
                        autoCorrect={false}
                        onSubmitEditing={() =>
                            signupStore.setCurrentStep(
                                signupStore.currentStep + 1
                            )
                        }
                    />
                    <LargeButton
                        title={
                            signupStore.location == "" ||
                            signupStore.location == null
                                ? "skip"
                                : "continue"
                        }
                        onPress={() =>
                            signupStore.setCurrentStep(
                                signupStore.currentStep + 1
                            )
                        }
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

export default observer(LocationSignup);
