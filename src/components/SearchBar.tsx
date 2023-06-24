import * as React from "react";

function SearchBar(props: any) {
  const handleSearch = () => {
    // Handle search functionality here
  };

  // width: 100 %;
  // position: absolute;
  // top: 50px;
  // display: flex;
  // justify - content: center;
  // padding: 20px;
  // z - index: 1;

  return (
    <div className="w-full absolute z-10 top-[50px] flex justify-center mt-12">
      <div className="max-h-8 inline-flex relative ">
        <input className="p-2 bg-slate-900 text-slate-100 border-purple-100 bg-opacity-75 border-[1px] rounded-2xl mr-4  placeholder:italic placeholder:text-white placeholder:text-opacity-50 pl-2 focus:border-purple-50 focus:border-[1px]" placeholder="Please type here" />
        <div className="min-h-8 flex justify-center items-center">
          <button className="h-8 pl-2 pr-4 bg-slate-900 text-slate-100 border-grey-500 bg-opacity-50 border-[1px] text-sm rounded-2xl hover:text-white transition duration-150 ease-in-out shadow hover: border-white hover:bg-opacity-100 hover:bg-slate-800 hover: ml-1 hover:translate-x-0.5 transition-transform duration-150 ease-in-out">Search -&gt;</button>
        </div>
      </div>
    </div >
  );
}

export default React.memo(SearchBar);
