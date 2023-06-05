import {
    View,
    Text,
    TextInput,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
} from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import SignupOptionButton from "../../SignupOptionbutton/SignupOptionButton";
import LargeButton from "../../../lib/LargeButton";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import { useTheme } from "../../../../utils/useTheme.util";
import CustomTextInput from "../../../lib/CustomTextInput";
import { validateEmail } from "../../../../utils/validateEmail.util";
import CustomText from "../../../lib/CustomText";
import KeyboardListener from "react-native-keyboard-listener";
import { useUtilStore } from "../../../../state/Util.store";
import ScrollWrapper from "../../ScrollWrapper/ScrollWrapper";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../../../../config/firebase";

//TODO: Proper check in the backend for existing user email

const EmailSignup = () => {
    const signupStore = useSignupStore();
    const utilStore = useUtilStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");

    const checkIfProceed = async() => {
        setFirstTime(false);
        if (allClear) {
            signupStore.setPrevEmail(signupStore.email)
            let exist = await checkIfEmailExist();
            if(!exist) signupStore.setCurrentStep(signupStore.currentStep + 1);
            setAllClear(false);
        }
    };

    const checkIfEmailExist = async(): Promise<boolean> => {
        let res = await fetchSignInMethodsForEmail(auth, signupStore.email).then(val => {
            if(val.length === 0) return false;
            return true;
        });
        return res;
    };

    React.useEffect(() => {
        //TODO: Come back later (two-letter domain extensions do not work, neither does .ed.cr,)
        // setIsReady(validateEmail(signupStore.email));

        console.log(signupStore.email + " === " + signupStore.prevEmail)
        if (signupStore.email === "" || !signupStore.email.includes("@")) {
            setAllClear(false);
            setErrMsg("oop! you need a valid email address to continue.");
        } else if(signupStore.email === signupStore.prevEmail) {
            setAllClear(false);
            setErrMsg("oh no! another account already exist with provided email")
        } else {
            setAllClear(true);
        }

        console.log("the email: " + signupStore.email);
        console.log(allClear);
    });

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    signupStore.setCurrentStep(signupStore.currentStep - 1)
                }
                title="email"
                subtitle="signup"
                progressIndicator
                currentStep={2}
                totalSteps={6}
            />
            <ScrollWrapper>
                <FlowTemplate
                    circleEmoji="✉️"
                    title="email"
                    desc={"please enter your email address below."}
                    marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
                >
                    <CustomTextInput
                        placeholder="my email"
                        onChangeText={text => signupStore.setEmail(text)}
                        marginBottom={32}
                        defaultValue={signupStore.email}
                        keyboardType="email-address"
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

export default observer(EmailSignup);
