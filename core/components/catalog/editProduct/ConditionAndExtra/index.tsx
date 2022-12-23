import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../../../lib/CustomText";
import DropdownIcon from "../../../../icons/catalog/Dropdown";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { MAX_WIDTH } from "../../../../utils/constants";
import { deriveProductConditionFromDb } from "../../../../utils/productCondition.util";
import ConditionModal from "../../ConditionModal/ConditionModal";

interface IConditionAndExtra {
    setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConditionAndExtra = (props: IConditionAndExtra) => {
    const catalogStore = useCatalogStore();
    const [selector, setSelector] = React.useState<boolean>(false);

    return (
        <View style={{ display: "flex", flexDirection: "column" }}>
            <CustomText fontSize={18} font="Bold" style={{ marginBottom: 12 }}>
                condition
            </CustomText>
            <TouchableOpacity
                onPress={() => setSelector(!selector)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        height: 45,
                        width: "100%",
                        maxWidth: MAX_WIDTH,
                        // marginBottom: props.isErr
                        //     ? 7
                        //     : props.marginBottom || 0,
                        borderRadius: 12,
                        paddingHorizontal: 20,
                        marginBottom: 32,
                    }}
                >
                    {catalogStore.activeProduct.condition == null ? (
                        <CustomText secondary>status</CustomText>
                    ) : (
                        <CustomText>
                            {deriveProductConditionFromDb(
                                catalogStore.activeProduct.condition
                            )}
                        </CustomText>
                    )}
                    <DropdownIcon />
                </View>
            </TouchableOpacity>
            <ConditionModal
                modalVisible={selector}
                setModalVisible={setSelector}
                usage="edit"
                onSelectionPress={() => props.setHasChanged(true)}
            />
        </View>
    );
};

export default ConditionAndExtra;
