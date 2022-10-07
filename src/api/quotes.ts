const SPREADSHEET_ID = import.meta.env.SPREADSHEET_ID;
const API_KEY = import.meta.env.API_KEY;

const URL =
  `https://sheets.googleapis.com/v4/spreadsheets/` +
  `${SPREADSHEET_ID}/?key=${API_KEY}&includeGridData=true`;

const getSheet = async (): Promise<string[][]> => {
  const resp = await (await fetch(URL)).json();
  const data = resp["sheets"][0]["data"][0]["rowData"].map(
    ({ values }: { values: { formattedValue: string }[] }) => {
      return values.map(({ formattedValue }) => formattedValue);
    }
  );
  return data;
};

type Quote = {
  author: string;
  contents: string;
};

export const getQuotes = async (): Promise<Quote[]> => {
  const sheetData = await getSheet();

  return sheetData.map(([author, contents]) => ({ author, contents }));
};
