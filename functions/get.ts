import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const { SPREADSHEET_ID, API_KEY } = process.env;

const URL =
  `https://sheets.googleapis.com/v4/spreadsheets/` +
  `${SPREADSHEET_ID}/?key=${API_KEY}&includeGridData=true`;

const handler: Handler = async (_event, _context) => {
  const resp: any = await (await fetch(URL)).json();

  const data: string[][] = resp["sheets"][0]["data"][0]["rowData"].map(
    ({ values }: { values: { formattedValue: string }[] }) => {
      return values.map(({ formattedValue }) => formattedValue);
    }
  );

  const quotes: Quote[] = data.map(([author, contents]) => ({
    author,
    contents,
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(quotes),
  };
};

export { handler };
