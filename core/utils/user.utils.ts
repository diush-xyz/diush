import { IUser } from "../@types/GlobalTypes";
import {
    collection,
    doc,
    onSnapshot,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

//create
export const createUserInDb = async (user: IUser) => {
    // Add a new document in collection "users"
    await setDoc(doc(db, "users", user.id), {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
    })
        .then(() => console.log("Created in db!"))
        .catch(error => console.log("db error: " + error));
};

//read
interface IFetchUserFromDb {
    id: string;
    setUser: (user) => void;
}

export const fetchUserFromDb = (props: IFetchUserFromDb) => {
    const q = query(collection(db, "users"), where("id", "==", props.id));
    onSnapshot(q, querySnapshot => {
        querySnapshot.forEach(doc => {
            props.setUser(doc.data());
        });
    });
};
