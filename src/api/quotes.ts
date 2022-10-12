export const getQuotes = async (): Promise<Quote[]> => {
  const quotes: { quotes: Quote[]; suggested: Quote[] } = await (
    await fetch(`/api/get`)
  ).json();

  console.log(quotes);

  return quotes.quotes;
};
