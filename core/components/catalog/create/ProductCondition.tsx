import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { CatalogStatus, SignupMethod } from "../../../@types/GlobalTypes";
import SignupOptionButton from "../../auth/SignupOptionbutton/SignupOptionButton";
import { View } from "react-native";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import CustomTextInput from "../../lib/CustomTextInput";
import LargeButton from "../../lib/LargeButton";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScrollWrapper from "../../auth/ScrollWrapper/ScrollWrapper";

const ProductCondition = () => {
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const utilStore = useUtilStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");

    React.useEffect(() => {
        //TODO: Come back later (two-letter domain extensions do not work, neither does .ed.cr,)
        // setIsReady(validateEmail(signupStore.email));

        if (createProductStore.productName === "") {
            setAllClear(false);
            setErrMsg("oop! your product needs a name.");
        } else {
            setAllClear(true);
        }

        console.log("the name: " + createProductStore.productName);
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
                currentStep={4}
                totalSteps={7}
            />
            <ScrollWrapper>
                <FlowTemplate
                    circleEmoji="🎧"
                    title="item condition."
                    desc={
                        "give your new product a name. make it\n descriptive, yet simple."
                    }
                    marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
                >
                    <CustomTextInput
                        placeholder="PlayStation 5"
                        onChangeText={text =>
                            createProductStore.setProductName(text)
                        }
                        marginBottom={32}
                        defaultValue={createProductStore.productName}
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
                                createProductStore.setCurrentStep(1);
                            }
                        }}
                        footer
                        disabled={!allClear && !firstTime}
                        footerButtonTitle="cancel"
                        footerButtonOnPress={() =>
                            catalogStore.setStatus(CatalogStatus.ACTIVE_DASH)
                        }
                    />
                </FlowTemplate>
            </ScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(ProductCondition);
