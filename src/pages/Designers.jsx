import Header from "../assets/components/header";
import ShinyText from "../assets/components/text";

const Designers = () => {
  return (
    <>
      <div className="flex  flex-wrap content-start h-full overflow-x-hidden">
        <div className="w-full h-[8%] flex justify-center items-center bg-black ">
          <Header />
        </div>
        <div className="flex justify-center items-center w-full h-[92%] font-bold   text-9xl  break-all">
          <ShinyText text="Grzyb3kk" speed={3} className="bg-black " />
        </div>
      </div>
    </>
  );
};

export default Designers;
