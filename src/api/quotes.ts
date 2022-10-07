type Quote = {
  author: string;
  contents: string;
};

export const getQuotes = async (): Promise<Quote[]> => {
  return [
    { author: "Me", contents: "Hah" },
    {
      author: "Me",
      contents:
        "This is a looong quote, " +
        "lorem ipsum dolor net. Hi dear me omg hi haha.",
    },
  ];
};
