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
import ScreenHeader from "../../lib/ScreenHeader";
import CustomTextInput from "../../lib/CustomTextInput";
import LargeButton from "../../lib/LargeButton";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";

const SignupWelcome = () => {
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
            setErrMsg("oop! you need a valid email address to continue.");
        } else {
            setAllClear(true);
        }

        console.log("the name: " + createProductStore.productName);
        console.log(allClear);
    });

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                title="create listing"
                backArrow
                backArrowOnPress={() =>
                    catalogStore.setStatus(CatalogStatus.ACTIVE_DASH)
                }
                subtitle="my catalog"
                progressIndicator
                currentStep={1}
                totalSteps={8}
            />
            <View style={{ display: "flex", marginTop: 130, width: "100%" }}>
                <FlowTemplate
                    circleEmoji="📦"
                    title="magic begins here."
                    desc={
                        "give your new product a name. make it\n descriptive, yet simple."
                    }
                >
                    <CustomTextInput
                        placeholder="PlayStation 5"
                        onChangeText={text =>
                            createProductStore.setProductName(text)
                        }
                        marginBottom={32}
                        defaultValue={createProductStore.productName}
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
            </View>
        </View>
    );
};

export default observer(SignupWelcome);
