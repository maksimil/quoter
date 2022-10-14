import { firestore } from "firebase-admin";

declare global {
  type Quote = {
    author: string;
    contents: string;
    accept: boolean;
    timestamp: firestore.FieldValue;
    id: string;
  };
}
