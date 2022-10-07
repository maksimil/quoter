import { getQuotes } from "@api/quotes";
import { Component, createResource, For, Match, Switch } from "solid-js";

const Quote: Component<{ quote: Quote }> = (props) => {
  return (
    <div class="w-100">
      <div class="text-xl text-left italic font-mono">
        {props.quote.contents}
      </div>
      <div class="text-xl text-right italic font-light pr-10">
        {props.quote.author}
      </div>
    </div>
  );
};

const Quotes: Component<{ quotes: Quote[] }> = (props) => {
  return <For each={props.quotes}>{(quote) => <Quote quote={quote} />}</For>;
};

const WrapQuotes: Component = () => {
  const [quotes] = createResource(async () => await getQuotes());
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
