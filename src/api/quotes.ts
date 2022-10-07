const HOMEURL = import.meta.env.DEV
  ? "http://localhost:8888"
  : import.meta.env.SITE;

export const getQuotes = async (): Promise<Quote[]> => {
  const quotes: Quote[] = await (await fetch(`${HOMEURL}/api/get`)).json();

  console.log(quotes);

  return quotes;
};
