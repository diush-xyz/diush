import { doc, setDoc } from "firebase/firestore";
import { IOffer } from "../@types/GlobalTypes";
import { db } from "../../config/firebase";

export const createOfferInDb = async (offer: IOffer) => {
    // Add a new document in collection "users"
    await setDoc(doc(db, "offers", offer.id), {
        id: offer.id,
        amount: offer.amount,
        isReadByRecipient: offer.isReadByRecipient,
        linkedConversationID: offer.linkedConversationID,
        placedByUID: offer.placedByUID,
        timestamp: offer.timestamp,
    });
};