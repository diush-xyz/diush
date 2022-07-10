import { View, Text } from "react-native";
import React from "react";
import CustomText from "../../../lib/CustomText";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import PopupHeader from "../../../lib/PopupHeader";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import { observer } from "mobx-react";
import FlowTemplate from "../../../lib/FlowTemplate";
import CustomTextInput from "../../../lib/CustomTextInput";
import LargeButton from "../../../lib/LargeButton";
import { useUtilStore } from "../../../../state/Util.store";

const PasswordSignup = () => {
    const signupStore = useSignupStore();
    const utilStore = useUtilStore();
    const [allClear, setAllClear] = React.useState<boolean>(false);
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [errMsg, setErrMsg] = React.useState<string>("");

    React.useEffect(() => {
        if (signupStore.password.length < 10) {
            setAllClear(false);
            setErrMsg(
                "Hold up! your password must be at least 10 characters long."
            );
        } else {
            setAllClear(true);
        }
    });
    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    signupStore.setCurrentStep(signupStore.currentStep - 1)
                }
                title="password"
                subtitle="signup"
                progressIndicator
                currentStep={3}
                totalSteps={5}
            />
            <FlowTemplate
                circleEmoji="🔐"
                title="password"
                desc="make sure it's difficult for others to guess."
                marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
            >
                <CustomTextInput
                    placeholder="password"
                    onChangeText={text => signupStore.setPassword(text)}
                    marginBottom={32}
                    defaultValue={signupStore.password}
                    isValid={allClear}
                    isErr={!allClear && !firstTime}
                    errMsg={errMsg}
                    returnKeyType="done"
                    isPassword
                />
                <LargeButton
                    title="continue"
                    onPress={() => {
                        setFirstTime(false);
                        if (allClear) {
                            signupStore.setCurrentStep(
                                signupStore.currentStep + 1
                            );
                        }
                        null;
                    }}
                    footer
                    // disabled={!allClear && !firstTime}
                    footerButtonTitle="cancel"
                    footerButtonOnPress={() => signupStore.cancel()}
                />
            </FlowTemplate>
        </BottomSheetView>
    );
};

export default observer(PasswordSignup);
