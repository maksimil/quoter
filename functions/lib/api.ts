import { firestore } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const { FIREBASE_KEY, FIREBASE_QUOTE_DB } = process.env as {
  [name: string]: string;
};

export class Api {
  db: FirebaseFirestore.Firestore;

  constructor() {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(JSON.parse(FIREBASE_KEY)),
      });
    }
    this.db = getFirestore();
  }

  async getQuotes(): Promise<Quote[]> {
    const snap = await this.db
      .collection(FIREBASE_QUOTE_DB)
      .orderBy("timestamp", "asc")
      .get();

    let quotes: Quote[] = [];

    snap.forEach((doc) => {
      quotes.push({ ...(doc.data() as Quote), id: doc.id });
    });

    return quotes;
  }

  async suggestQuote(quote: {
    author: string;
    contents: string;
  }): Promise<string> {
    const r = await this.db.collection(FIREBASE_QUOTE_DB).add({
      ...quote,
      accept: false,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    return r.id;
  }

  async acceptQuote(id: string): Promise<void> {
    await this.db
      .collection(FIREBASE_QUOTE_DB)
      .doc(id)
      .set({ accept: true }, { merge: true });
  }
}
