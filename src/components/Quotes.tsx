import { getQuotes, getQuotesCache } from "@api/quotes";
import {
  batch,
  Component,
  createSignal,
  For,
  Match,
  onMount,
  Switch,
} from "solid-js";
import { createStore } from "solid-js/store";

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
  const [state, setState] = createSignal<"ssg" | "cache" | "loaded">("ssg");
  const [quotes, setQuotes] = createStore<Quote[]>([]);

  onMount(() => {
    const qcache = getQuotesCache(props.all);

    batch(() => {
      setState("cache");
      setQuotes(qcache);
    });

    getQuotes(props.all).then((quotes) => {
      batch(() => {
        setState("loaded");
        setQuotes(quotes);
      });
    });
  });

  return (
    <Switch>
      <Match when={state() === "ssg"}>
        <div class="font-mono">...</div>
      </Match>
      <Match when={state() === "cache"}>
        <Quotes quotes={quotes} />
        <div class="font-mono">...</div>
      </Match>
      <Match when={state() === "loaded"}>
        <Quotes quotes={quotes} />
      </Match>
    </Switch>
  );
};

export default WrapQuotes;
