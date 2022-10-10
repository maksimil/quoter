import { Component, createSignal } from "solid-js";

const Suggest: Component = () => {
  const [contents, setContents] = createSignal("");
  const [author, setAuthor] = createSignal("");
  const [status, setStatus] = createSignal<"idle" | "suggesting">("idle");

  return (
    <div class="mt-5 w-100">
      <textarea
        rows="2"
        class="text-lg font-mono w-full"
        placeholder="Quote"
        value={contents()}
        oninput={(e) => {
          //@ts-ignore
          setContents(e.target.value);
        }}
      />
      <div class="font-mono text-lg text-right">
        -{" "}
        <input
          class="w-70"
          type="text"
          placeholder="Author"
          value={author()}
          oninput={(e) => {
            //@ts-ignore
            setAuthor(e.target.value);
          }}
        />
      </div>
      <button
        class={
          "font-mono text-2xl mt-5 text-left w-full " +
          (contents() !== "" && author() !== "" ? "" : "text-gray-500 ")
        }
        onclick={() => {
          (async () => {
            setStatus("suggesting");
            await fetch("/api/suggest", {
              method: "POST",
              body: JSON.stringify({
                author: author(),
                contents: contents(),
              }),
            });
            window.location.assign("/");
          })();
        }}
      >
        {status() === "idle" ? "suggest" : "..."}
      </button>
    </div>
  );
};

export default Suggest;
