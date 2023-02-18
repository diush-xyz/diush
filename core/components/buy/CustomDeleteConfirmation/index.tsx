import React from "react";
import { observer } from "mobx-react";
import { deleteDoc, doc } from "firebase/firestore";
import CompactIcon from "./CompactIcon";
import WarningConfirmation from "../../lib/Modals/WarningConfirmation";
import { db } from "../../../../config/firebase";
import { CatalogStatus } from "../../../@types/GlobalTypes";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import { useSellerViewProductStore } from "../../../state/auth/SellerViewProductStore";
import { useBuyProductStore } from "../../../state/auth/BuyProduct.store";

const CustomDeleteConfirmation = () => {
    const buyProductStore = useBuyProductStore();
    const sellerViewProductStore = useSellerViewProductStore();

    const deleteProduct = async () => {
        await deleteDoc(
            doc(db, "products", buyProductStore.activeProduct.id)
        ).then(() => {
            // buyProductStore.setStatus(CatalogStatus.ACTIVE_DASH);
            //TODO: Add back
        });
    };

    return (
        <WarningConfirmation
            icon={<CompactIcon />}
            title="be careful!"
            desc={`by deleting this product, you also \n decline all offers pertaining to this\n product and delete all data.`}
            buttonText="i understand, do it"
            buttonOnClick={() => {
                deleteProduct();
                sellerViewProductStore.setDeleteConfirmation();
            }}
            footerText="nope, cancel"
            onFooterClick={() => {
                sellerViewProductStore.setDeleteConfirmation();
            }}
            visible={sellerViewProductStore.deleteConfirmation}
        />
    );
};

export default observer(CustomDeleteConfirmation);
