import { getQuotes } from "@api/quotes";
import { Component, createResource, For, Match, Switch } from "solid-js";

const Quote: Component<{ quote: Quote }> = (props) => {
  console.log(props.quote.contents.split("\n"));
  return (
    <div class="w-100 <sm:w-full">
      <For each={props.quote.contents.split("\n")}>
        {(line) => (
          <div class="text-xl text-center italic font-mono">{line}</div>
        )}
      </For>
      <div class="text-xl text-right italic pr-5">
        {`- ${props.quote.author}`}
      </div>
    </div>
  );
};

const Quotes: Component<{ quotes: Quote[] }> = (props) => {
  return (
    <div class="space-y-10">
      <For each={props.quotes}>{(quote) => <Quote quote={quote} />}</For>
    </div>
  );
};

const WrapQuotes: Component<{ all: boolean }> = (props) => {
  const [quotes] = createResource(async () => await getQuotes(props.all));
  return (
    <Switch>
      <Match
        when={
          quotes.state == "pending" ||
          quotes.state == "refreshing" ||
          quotes.state == "unresolved"
        }
      >
        <div class="font-mono">...</div>
      </Match>
      <Match when={quotes.state == "errored"}>
        <div class="font-mono">{"error >.<!"}</div>
      </Match>
      <Match when={quotes.state == "ready"}>
        <Quotes quotes={quotes() as Quote[]} />
      </Match>
    </Switch>
  );
};

export default WrapQuotes;
