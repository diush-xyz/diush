import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { CatalogStatus, SignupMethod } from "../../../@types/GlobalTypes";
import SignupOptionButton from "../../auth/SignupOptionbutton/SignupOptionButton";
import {
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import CustomTextInput from "../../lib/CustomTextInput";
import LargeButton from "../../lib/LargeButton";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScrollWrapper from "../../auth/ScrollWrapper/ScrollWrapper";

const ProductAdditionalInfo = () => {
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const utilStore = useUtilStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");

    const checkIfProceed = () => {
        createProductStore.setCurrentStep(createProductStore.currentStep + 1);
    };

    React.useEffect(() => {
        console.log("the additionalInfo: " + createProductStore.additionalInfo);
        console.log(allClear);
    });

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                title="create listing"
                backArrow
                backArrowOnPress={() =>
                    createProductStore.setCurrentStep(
                        createProductStore.currentStep - 1
                    )
                }
                subtitle="my catalog"
                progressIndicator
                currentStep={6}
                totalSteps={7}
            />
            <ScrollWrapper isTextArea>
                <FlowTemplate
                    circleEmoji="🌵"
                    title="anything else?"
                    desc={
                        "is there anything people need\n to know about your item?"
                    }
                    marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
                >
                    <CustomTextInput
                        placeholder="write anything..."
                        onChangeText={text =>
                            createProductStore.setAdditionalInfo(text)
                        }
                        marginBottom={32}
                        defaultValue={createProductStore.additionalInfo}
                        isValid={allClear}
                        isErr={!allClear && !firstTime}
                        errMsg={errMsg}
                        returnKeyType="done"
                        isLarge
                        onSubmitEditing={() => checkIfProceed()}
                    />
                    <LargeButton
                        title={
                            createProductStore.additionalInfo == null ||
                            createProductStore.additionalInfo == ""
                                ? "nope, I'm good"
                                : "continue"
                        }
                        onPress={() => checkIfProceed()}
                        footer
                        disabled={!allClear && !firstTime}
                        footerButtonTitle="cancel"
                        footerButtonOnPress={() => {
                            createProductStore.cancel();
                            catalogStore.setStatus(CatalogStatus.ACTIVE_DASH);
                        }}
                    />
                </FlowTemplate>
            </ScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(ProductAdditionalInfo);
