import { firestore } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const { FIREBASE_KEY, FIREBASE_QUOTE_DB } = process.env as {
  [name: string]: string;
};

const wrapDoc = (doc: { data: () => any; id: string }): Quote => {
  return { ...(doc.data() as Quote), id: doc.id };
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

  quotesDb(): firestore.CollectionReference<firestore.DocumentData> {
    return this.db.collection(FIREBASE_QUOTE_DB);
  }

  async getQuotes(): Promise<Quote[]> {
    const snap = await this.quotesDb().orderBy("timestamp", "asc").get();

    let quotes: Quote[] = [];

    snap.forEach((doc) => {
      quotes.push(wrapDoc(doc));
    });

    return quotes;
  }

  async getQuote(id: string): Promise<Quote> {
    const doc = await this.quotesDb().doc(id).get();
    return wrapDoc(doc);
  }

  async suggestQuote(quote: {
    author: string;
    contents: string;
  }): Promise<string> {
    const r = await this.quotesDb().add({
      ...quote,
      accept: false,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    return r.id;
  }

  async acceptQuote(id: string): Promise<void> {
    await this.quotesDb().doc(id).set({ accept: true }, { merge: true });
  }
}
