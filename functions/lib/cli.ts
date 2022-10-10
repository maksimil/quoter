const wrapLine = (line: string, lineLength: number): string => {
  return `| ${line.padEnd(lineLength)} |`;
};

const separatorLine = (lineLength: number): string => {
  return `+${"-".repeat(lineLength + 2)}+`;
};

const combineWords = (line: string, word: string): string => {
  if (line == "") {
    return word;
  } else {
    return `${line} ${word}`;
  }
};

const cutLine = (contents: string, lineLength: number): string[] => {
  let lines = [""];

  let words: string[] = [];

  contents.split(" ").forEach((rawWord) => {
    while (rawWord.length > lineLength) {
      words.push(rawWord.slice(0, lineLength));
      rawWord = rawWord.slice(lineLength);
    }
    if (rawWord.length > 0) {
      words.push(rawWord);
    }
  });

  words.forEach((word) => {
    if (combineWords(lines[lines.length - 1], word).length > lineLength) {
      lines.push("");
    }

    lines[lines.length - 1] = combineWords(lines[lines.length - 1], word);
  });

  return lines;
};

export const formatQuotes = (quotes: Quote[], width: number): string => {
  let output = separatorLine(width) + "\n";

  quotes.forEach((quote) => {
    output += wrapLine("", width) + "\n";
    cutLine(quote.contents, width).forEach((line) => {
      output += wrapLine(line, width) + "\n";
    });

    output += wrapLine("", width) + "\n";
    cutLine(`- ${quote.author}`, width).forEach((line) => {
      output += wrapLine(line.padStart(width), width) + "\n";
    });

    output += separatorLine(width) + "\n";
  });
  return output;
};