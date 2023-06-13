import React from "react";
import CustomText from "../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { Linking, TouchableOpacity, View } from "react-native";
import ScreenHeader from "../../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../../state/auth/Settings.store";
import { MyAccountSettingsStatus } from "../../../../@types/GlobalTypes";
import ProfileImage from "../../../../components/lib/ProfileImage";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import { MAX_WIDTH } from "../../../../utils/constants";
import WarningConfirmation from "../../../../components/lib/Modals/WarningConfirmation";
import CompactIcon from "../../../../components/catalog/viewProduct/CustomDeleteConfirmation/CompactIcon";
import { deleteDoc, doc, where } from "firebase/firestore";
import { auth, db } from "../../../../../config/firebase";
import { deleteUser } from "firebase/auth";

const Deactivate = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();
    const [warningModal, setWarningModal] = React.useState<boolean>(false);
    const authUser = auth.currentUser;

    const deleteAccount = async () => {
        //delete user from db
        await deleteDoc(doc(db, "users", user.id));
        //delete the user from auth
        deleteUser(authUser);
        //delete the user's offers
    };

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <View style={{ display: "flex", alignItems: "center" }}>
                <ScreenHeader
                    backArrow
                    backArrowOnPress={() =>
                        settingsStore.setMyAccountSettingsStatus(
                            MyAccountSettingsStatus.HOME
                        )
                    }
                    title="deactivate"
                    subtitle="my account"
                />
                <View
                    style={{
                        display: "flex",
                        width: MAX_WIDTH,
                        marginTop: 22,
                    }}
                >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <ProfileImage
                            specificUser={user}
                            size={27}
                            style={{ marginRight: 8 }}
                        />
                        <View>
                            <CustomText font="Bold">
                                {user.displayName}
                            </CustomText>
                            <CustomText secondary fontSize={14}>
                                {user.email}
                            </CustomText>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 22, width: MAX_WIDTH }}>
                    <CustomText
                        font="Bold"
                        fontSize={18}
                        style={{ marginBottom: 11 }}
                    >
                        we are heartbroken to see you go. 💔
                    </CustomText>
                    <CustomText secondary font="Bold">
                        hey there! I'm Filippo, the creator of this app. I'd
                        love to{" "}
                        <CustomText
                            accent
                            font="Bold"
                            onPress={() => {
                                Linking.openURL(
                                    "mailto:filifonsecacagnazzo@gmail.com"
                                );
                            }}
                        >
                            hear from you
                        </CustomText>{" "}
                        if you have any feedback or questions about the
                        platform. I'm always looking for ways to improve diush
                        to serve you better.
                    </CustomText>
                </View>
                <View style={{ marginTop: 22, width: MAX_WIDTH }}>
                    <CustomText
                        font="Bold"
                        fontSize={18}
                        style={{ marginBottom: 11 }}
                    >
                        this action will delete your account.
                    </CustomText>
                    <CustomText secondary font="Bold">
                        you are beginning the process for deactivating and
                        deleting your diush account. Your display name,
                        username, public profile, products, and other data will
                        no longer be visible on diush.xyz or any of our
                        services.
                    </CustomText>
                </View>
                <View style={{ marginTop: 22, width: MAX_WIDTH }}>
                    <CustomText
                        font="Bold"
                        fontSize={18}
                        style={{ marginBottom: 11 }}
                    >
                        what you should know
                    </CustomText>
                    <CustomText secondary font="Bold">
                        once deleted, your account and all of its data will not
                        be able to be restored. ever.
                    </CustomText>
                    <CustomText secondary font="Bold" style={{ marginTop: 18 }}>
                        if you simply want to change your email or any other
                        account property, there is no need to deactivate your
                        account - you can edit these things in{" "}
                        <CustomText
                            accent
                            font="Bold"
                            onPress={() => {
                                settingsStore.setMyAccountSettingsStatus(
                                    MyAccountSettingsStatus.ACCOUNT_DETAILS
                                );
                            }}
                        >
                            settings.
                        </CustomText>
                    </CustomText>
                    {/* <CustomText secondary font="Bold" style={{ marginTop: 18 }}>
                    to use your current username with a different diush account
                    you create in the future,{" "}
                    <CustomText
                        accent
                        font="Bold"
                        onPress={() => {
                            settingsStore.setMyAccountSettingsStatus(
                                MyAccountSettingsStatus.ACCOUNT_DETAILS
                            );
                        }}
                    >
                        change them
                    </CustomText>{" "}
                    here before you deactivate your account.
                </CustomText> */}
                </View>
            </View>
            <TouchableOpacity onPress={() => setWarningModal(true)}>
                <CustomText accent font="Bold" style={{ marginTop: 200 }}>
                    delete
                </CustomText>
            </TouchableOpacity>
            <WarningConfirmation
                icon={<CompactIcon />}
                title="are you sure?"
                desc={`deleting your account is an${"\n"} action that cannot be undone.`}
                buttonText="yes, delete my account :/"
                buttonOnClick={() => deleteAccount()}
                footerText="no! cancel"
                onFooterClick={() => {
                    setWarningModal(false);
                }}
                visible={warningModal}
            />
        </View>
    );
};

export default observer(Deactivate);
