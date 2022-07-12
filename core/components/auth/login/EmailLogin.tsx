import { View, Text, TextInput, Keyboard } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import KeyboardListener from "react-native-keyboard-listener";
import { observer } from "mobx-react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import { useUtilStore } from "../../../state/Util.store";
import CustomTextInput from "../../lib/CustomTextInput";
import FlowTemplate from "../../lib/FlowTemplate";
import LargeButton from "../../lib/LargeButton";
import PopupHeader from "../../lib/PopupHeader";
import { useLoginStore } from "../../../state/auth/Login.store";

//TODO: Animation for keyboardShow FlowTemplate margin-bottom

const EmailLogin = () => {
    const loginStore = useLoginStore();
    const utilStore = useUtilStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");

    React.useEffect(() => {
        //TODO: Come back later (two-letter domain extensions do not work, neither does .ed.cr,)
        // setIsReady(validateEmail(signupStore.email));

        if (loginStore.email === "" || !loginStore.email.includes("@")) {
            setAllClear(false);
            setErrMsg("oop! you need a valid email address to continue.");
        } else {
            setAllClear(true);
        }

        console.log("the email: " + loginStore.email);
        console.log(allClear);
    });

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                title="email"
                subtitle="login"
                progressIndicator
                currentStep={1}
                totalSteps={2}
            />
            <FlowTemplate
                circleEmoji="👋"
                title="welcome back!"
                desc={"we're trhilled you're here. you've been missed."}
                marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
            >
                <CustomTextInput
                    placeholder="my email"
                    onChangeText={text => loginStore.setEmail(text)}
                    marginBottom={32}
                    defaultValue={loginStore.email}
                    keyboardType="email-address"
                    isValid={allClear}
                    isErr={!allClear && !firstTime}
                    errMsg={errMsg}
                    returnKeyType="done"
                />
                <LargeButton
                    title="continue"
                    onPress={() => {
                        setFirstTime(false);
                        if (allClear) {
                            loginStore.setCurrentStep(
                                loginStore.currentStep + 1
                            );
                        }
                    }}
                    footer
                    disabled={!allClear && !firstTime}
                    footerButtonTitle="cancel"
                    footerButtonOnPress={() => loginStore.cancel()}
                />
            </FlowTemplate>
        </BottomSheetView>
    );
};

export default observer(EmailLogin);
