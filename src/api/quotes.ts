export const getQuotes = async (): Promise<Quote[]> => {
  const quotes = ((await (await fetch(`/api/get`)).json()) as Quote[]).filter(
    (q) => q.accept
  );

  console.log(quotes);

  return quotes;
};
