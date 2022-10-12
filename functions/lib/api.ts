import { firestore } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const { FIREBASE_KEY } = process.env;

export class Api {
  db: FirebaseFirestore.Firestore;

  constructor() {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(JSON.parse(FIREBASE_KEY as string)),
      });
    }
    this.db = getFirestore();
  }

  async getQuotes(): Promise<Quote[]> {
    const snap = await this.db
      .collection("quotes")
      .orderBy("timestamp", "asc")
      .get();

    let quotes: Quote[] = [];

    snap.forEach((doc) => {
      quotes.push(doc.data() as Quote);
    });

    return quotes;
  }

  async suggestQuote(quote: {
    author: string;
    contents: string;
  }): Promise<void> {
    await this.db.collection("quotes").add({
      ...quote,
      accept: false,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
  }
}
