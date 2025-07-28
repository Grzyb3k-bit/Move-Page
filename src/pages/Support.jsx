import { useState } from "react";
import Header from "../assets/components/header";
import ShinyText from "../assets/components/text";
const Support = () => {
  const [Text, setText] = useState("");

  return (
    <>
      <>
        <div className="flex  flex-wrap content-start h-full overflow-x-hidden">
          <div className="w-full h-[8%] flex justify-center items-center bg-black ">
            <Header />
          </div>
          <div className="flex justify-center items-center w-full  font-bold  text-4xl p-9  break-all">
            <ShinyText
              text="Have problem ...?"
              speed={3}
              className="bg-black "
            />
          </div>
          <div className="flex justify-center items-center w-full flex-col h-[30%] ">
            <textarea
              className="w-4/5 border-grey-700 border-solid border-2  text-4xl p-3 m-3"
              placeholder="what is your problem"
              onChange={(e) => setText(e.target.value)}
              value={Text}
            ></textarea>
            {Text && (
              <button
                onClick={() => {
                  setText("");
                  alert("you send message");
                }}
                className="mt-5 w-1/5 rounded-3xl bg-[rgb(66,80,240)] cursor-pointer py-2"
              >
                Send
              </button>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Support;
