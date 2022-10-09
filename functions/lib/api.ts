import { GoogleSpreadsheet } from "google-spreadsheet";

const { SPREADSHEET_ID, SERVICE_ACCOUNT_EMAIL, SERVICE_ACCOUNT_PASS } =
  process.env;

export const loadApi = async (): Promise<QuoteApi> => {
  const api = new QuoteApi();
  await api.load();
  return api;
};

export class QuoteApi {
  doc: GoogleSpreadsheet;

  constructor() {
    this.doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  }

  async load(): Promise<void> {
    await this.doc.useServiceAccountAuth({
      client_email: SERVICE_ACCOUNT_EMAIL as string,
      private_key: (SERVICE_ACCOUNT_PASS as string).replace(/\\n/g, "\n"),
    });

    await this.doc.loadInfo();
  }

  async getQuotes(): Promise<Quote[]> {
    const qsheet = this.doc.sheetsByTitle["quotes"];
    await qsheet.loadCells();

    let quotes: Quote[] = [];

    for (let rowi = 0; rowi < qsheet.rowCount; rowi++) {
      const cell = qsheet.getCell(rowi, 0);

      if (cell.value !== null) {
        quotes.push(JSON.parse(`${cell.value}`));
      } else {
        break;
      }
    }

    return quotes;
  }

  async suggestQuotes(quotes: Quote[]): Promise<void> {
    const ssheet = this.doc.sheetsByTitle["suggested"];
    await ssheet.addRows(quotes.map((quote) => [JSON.stringify(quote)]));
  }
}
