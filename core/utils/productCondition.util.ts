import { ProductCondition } from "../@types/GlobalTypes";

export const productConditionToDb = (
    productCondition: ProductCondition
): number => {
    switch (productCondition) {
        case ProductCondition.NEW_WITH_BOX:
            return 0;
        case ProductCondition.NEW_WITHOUT_BOX:
            return 1;
        case ProductCondition.NEW_WITH_DEFECTS:
            return 2;
        case ProductCondition.USED_GOOD_CONDITION:
            return 3;
        case ProductCondition.USED_DECENT_CONDITION:
            return 4;
    }
};

export const deriveProductConditionFromDb = (
    num: number | ProductCondition
): ProductCondition => {
    switch (num) {
        case 0:
            return ProductCondition.NEW_WITH_BOX;
        case 1:
            return ProductCondition.NEW_WITHOUT_BOX;
        case 2:
            return ProductCondition.NEW_WITH_DEFECTS;
        case 3:
            return ProductCondition.USED_GOOD_CONDITION;
        case 4:
            return ProductCondition.USED_DECENT_CONDITION;
    }
};
