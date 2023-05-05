import { useState } from "react";

const Form = ({ generateResponse }) => {
  const [userQuestion, setuserQuestion] = useState("");

  return (
    <form
      className="px-5 md:px-0 stretch flex flex-row gap-3  text-black w-full"
      onSubmit={(e) => {
        e.preventDefault();
        generateResponse(userQuestion);
        setuserQuestion("");
      }}
    >
      <div className="relative flex h-full flex-1 md:flex-col">
        {/* <div className="flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center"></div> */}
        <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]">
          <input
            className="m-0 w-full outline-none resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 md:p-0"
            type="text"
            placeholder="Your Question"
            value={userQuestion}
            onChange={(e) => setuserQuestion(e.target.value)}
          />
          <button className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100  disabled:hover:bg-transparent">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};
export default Form;
