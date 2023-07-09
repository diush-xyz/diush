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
import CustomLoader from "../../../lib/CustomLoader";

//TODO: Proper check in the backend for existing user email

const EmailSignup = () => {
    const signupStore = useSignupStore();
    const utilStore = useUtilStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");
    const [emailExists, setEmailExists] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const checkIfProceed = async () => {
        setLoading(true);
        setFirstTime(false);

        signupStore.setPrevEmail(signupStore.email);
        let exist = await checkIfEmailExist();
        setEmailExists(exist);
        if (!exist) {
            signupStore.setCurrentStep(signupStore.currentStep + 1);
        } else {
            setAllClear(false);
            setLoading(false);
        }
    };

    const checkIfEmailExist = async (): Promise<boolean> => {
        let res = await fetchSignInMethodsForEmail(
            auth,
            signupStore.email
        ).then(val => {
            setLoading(false);
            if (val.length === 0) return false;
            return true;
        });
        return res;
    };

    React.useEffect(() => {
        //TODO: Come back later (two-letter domain extensions do not work, neither does .ed.cr,)
        // setIsReady(validateEmail(signupStore.email));

        if (signupStore.email === "" || !signupStore.email.includes("@")) {
            setAllClear(false);
            setErrMsg("oop! you need a valid email address to continue.");
        } else if (emailExists && signupStore.prevEmail == signupStore.email) {
            setAllClear(false);
            setErrMsg(
                "oh no! another account already exists with this email. try again or log in."
            );
        } else {
            setAllClear(true);
        }
    });

    return (
        <View style={GLOBAL_STYLES.bottomSheetViewStyle}>
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
                marginTop={60}
            />
            {loading ? (
                <CustomLoader />
            ) : (
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
            )}
        </View>
    );
};

export default observer(EmailSignup);
