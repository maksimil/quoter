const QUOTE_CACHE = "quotes";

export const getQuotes = async (all: boolean): Promise<Quote[]> => {
  const quotes = ((await (await fetch(`/api/get`)).json()) as Quote[])
    .filter((q) => q.accept || all)
    .map((quote) => ({
      ...quote,
      contents:
        (quote.accept ? "" : `<Suggested-${quote.id}>\n`) + quote.contents,
    }));

  console.log(quotes);

  localStorage.setItem(QUOTE_CACHE, JSON.stringify(quotes));

  return quotes;
};

export const getQuotesCache = (all: boolean): Quote[] => {
  const quotes = localStorage.getItem(QUOTE_CACHE) || "[]";
  return JSON.parse(quotes);
};
