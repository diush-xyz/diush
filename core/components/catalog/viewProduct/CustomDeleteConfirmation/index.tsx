import React from "react";
import { useSellerViewProductStore } from "../../../../state/auth/SellerViewProductStore";
import { observer } from "mobx-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../config/firebase";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { CatalogStatus } from "../../../../@types/GlobalTypes";
import CompactIcon from "./CompactIcon";
import WarningConfirmation from "../../../lib/Modals/WarningConfirmation";

const CustomDeleteConfirmation = () => {
    const catalogStore = useCatalogStore();
    const sellerViewProductStore = useSellerViewProductStore();

    const deleteProduct = async () => {
        await deleteDoc(
            doc(db, "products", catalogStore.activeProduct.id)
        ).then(() => {
            catalogStore.setStatus(CatalogStatus.ACTIVE_DASH);
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
