export const getQuotes = async (all: boolean): Promise<Quote[]> => {
  const quotes = ((await (await fetch(`/api/get`)).json()) as Quote[])
    .filter((q) => q.accept || all)
    .map((quote) => ({
      ...quote,
      contents:
        (quote.accept ? "" : `<Suggested-${quote.id}>\n`) + quote.contents,
    }));

  console.log(quotes);

  return quotes;
};
