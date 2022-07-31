import { makeAutoObservable } from "mobx";
import React from "react";

/**
 * A store to handle anything related to creating a product.
 */
export default class CreateProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    currentStep: number = 0;

    setCurrentStep(newStep: number) {
        this.currentStep = newStep;
    }

    cancel() {
        this.currentStep = 0;
    }
}

const StoreContext = React.createContext<CreateProductStore>(
    new CreateProductStore()
);

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useCreateProductStore = (): CreateProductStore =>
    React.useContext(StoreContext);
