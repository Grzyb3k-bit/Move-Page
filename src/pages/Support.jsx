import { useState } from "react";
import Header from "../assets/components/header";
import ShinyText from "../assets/components/text";

const Support = () => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmedText = text.trim();
    if (trimmedText === "") return;

    // Tu możesz np. wysłać dane do backendu
    alert("You sent the message");

    setText(""); // wyczyść pole
  };

  const isMessageValid = text.trim() !== "";

  return (
    <div className="flex flex-wrap content-start h-full overflow-x-hidden">
      <div className="w-full h-[8%] flex justify-center items-center bg-black">
        <Header />
      </div>

      <div className="flex justify-center items-center w-full font-bold text-4xl p-9 break-all">
        <ShinyText text="Have problem ...?" speed={3} className="bg-black" />
      </div>

      <div className="flex justify-center items-center w-full flex-col h-[30%]">
        <textarea
          className="w-4/5 border-grey-700 border-solid border-2 text-4xl p-3 m-3"
          placeholder="What is your problem?"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>

        {isMessageValid && (
          <button
            onClick={handleSend}
            className="mt-5 w-1/5 rounded-3xl bg-[rgb(66,80,240)] cursor-pointer py-2 text-white"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default Support;
