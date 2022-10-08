#!/bin/env python3

import requests

LIMIT = 40


def format_line(line):
    return "| "+line.ljust(LIMIT)+" |"


def cutline(line, limit):
    lines = [""]

    raw_words = line.split(" ")

    words = []

    for raw_word in raw_words:
        while len(raw_word) > limit:
            words.append(raw_word[:limit])
            raw_word = raw_word[limit:]
        if len(raw_word) > 0:
            words.append(raw_word)

    for word in words:
        if len(lines[-1]+word) > limit:
            lines.append("")

        lines[-1] += ("" if lines[-1] == "" else " ")+word

    return "\n".join([format_line(x) for x in lines])


quotes = requests.get("https://qterr.netlify.app/api/get").json()

print("+-"+"-"*LIMIT+"-+")

for quote in quotes:
    contents = quote["contents"]
    author = quote["author"]

    print(format_line(" "*LIMIT))
    print(cutline(contents, LIMIT))

    print(format_line(" "*LIMIT))
    print(format_line(("- "+author).rjust(LIMIT)))

    print("+-"+"-"*LIMIT+"-+")
