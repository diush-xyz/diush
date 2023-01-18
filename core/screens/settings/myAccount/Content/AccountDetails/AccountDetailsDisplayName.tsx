import React from "react";
import CustomText from "../../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { KeyboardAvoidingView, View } from "react-native";
import ScreenHeader from "../../../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../../../state/auth/Settings.store";
import {
    AccountDetailsSettingsStatus,
    MyAccountSettingsStatus,
} from "../../../../../@types/GlobalTypes";
import { MAX_WIDTH } from "../../../../../utils/constants";
import HorizontalLine from "../../../../../components/lib/HorizontalLine";
import { ISettingsData } from "../../../home/SettingsHome.screen";
import MenuElem from "../../../../../components/settings/MenuElem";
import { useAuthStore } from "../../../../../state/auth/Auth.store";
import CustomTextInput from "../../../../../components/lib/CustomTextInput";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import SettingsScrollWrapper from "../../../../../components/settings/SettingsScrollWrapper";

const AccountDetailsDisplayName = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();
    const [newName, setNewName] = React.useState<string>("");

    const [allClear, setAllClear] = React.useState<boolean>(false);
    const [errMsg, setErrMsg] = React.useState<string>("");
    const [firstTime, setFirstTime] = React.useState<boolean>(true);

    const handleSave = async () => {
        const userRef = doc(db, "users", user.id);

        await updateDoc(userRef, {
            displayName: newName,
        }).then(() => {
            settingsStore.setAccountDetailsSettingsStatus(
                AccountDetailsSettingsStatus.HOME
            );
        });
    };

    const checkIfProceed = () => {
        setFirstTime(false);
        if (allClear) {
            handleSave();
        }
    };

    function containsWhitespace(str) {
        return /\s/.test(str);
    }

    React.useEffect(() => {
        if (newName === "" || !containsWhitespace(newName)) {
            setAllClear(false);
            console.log("i was called here");
            setErrMsg(
                !containsWhitespace(newName)
                    ? "you must input a first and last name to proceed."
                    : "the field is empty!"
            );
        } else {
            setAllClear(true);
        }
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
                backArrow
                backArrowOnPress={() =>
                    settingsStore.setAccountDetailsSettingsStatus(
                        AccountDetailsSettingsStatus.HOME
                    )
                }
                title="update name"
                subtitle="account details"
                button
                onButtonPress={() => checkIfProceed()}
                buttonText="save"
                buttonDisabled={!allClear && !firstTime}
            />
            <SettingsScrollWrapper>
                <View
                    style={{
                        display: "flex",
                        width: MAX_WIDTH,
                        marginTop: 22,
                    }}
                >
                    <HorizontalLine marginVertical={8} />
                    <View style={{ marginTop: 10 }}>
                        <CustomText font="Bold" style={{ marginBottom: 8 }}>
                            current
                        </CustomText>
                        <CustomText font="Bold" secondary>
                            {user.displayName}
                        </CustomText>
                    </View>
                    <View style={{ marginTop: 22 }}>
                        <CustomText font="Bold" style={{ marginBottom: 8 }}>
                            new
                        </CustomText>
                    </View>
                </View>
                {/*this must be out here for the error bar's width to cover 100% of the screen*/}
                <CustomTextInput
                    placeholder="new name"
                    onChangeText={text => setNewName(text)}
                    isValid={allClear}
                    isErr={!allClear && !firstTime}
                    errMsg={errMsg}
                    onSubmitEditing={() => checkIfProceed()}
                />
            </SettingsScrollWrapper>
        </View>
    );
};

export default observer(AccountDetailsDisplayName);
