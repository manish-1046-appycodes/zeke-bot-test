import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

import { SidebarContext } from "../context/SidebarContext";

import NewChatEntry from "./NewChatEntry";

const Navbar = () => {
  const { openSidebar, isScreenLarge } = useContext(SidebarContext);

  return (
    <div className="text-white py-4">
      <div className="container mx-auto">
        <div className="flex gap-5 w-full justify-between">
          <div className="flex gap-4 items-center">
            <Image width={40} height={40} src="/logo.png" alt="Logo" />
            <span className="text-2xl">Zeke</span>
          </div>

          {isScreenLarge ? (
            <NewChatEntry onClick={openSidebar} image={<GiHamburgerMenu />} />
          ) : (
            <div className="flex h-full justify-between gap-3">
              <NewChatEntry
                image={"📠"}
                chatTitle={"Chat with me"}
                link={"/"}
              />
              <NewChatEntry
                image={"🤔"}
                chatTitle={"Dreamscape"}
                link={"/dreamscape"}
              />
              <NewChatEntry image={"⛏"} chatTitle={"Mint"} link={"/mint"} />
              <NewChatEntry
                image={"👪"}
                chatTitle={"Membership"}
                link={"https://hubculture.com/membership"}
              />
              <NewChatEntry
                image={"❔"}
                chatTitle={"About"}
                link={"https://hubculture.com/aboutus"}
              />
              <NewChatEntry
                image={"📱"}
                chatTitle={"Contact"}
                link={"https://hubculture.com/contact"}
              />

              {/* <NewChatEntry
                onClick={toggleTheme}
                image={theme === "light" ? "🌙" : "☀"}
                chatTitle={theme === "light" ? "Dark Mode" : "Light Mode"}
              /> */}
              {/* <NewChatEntry
              image={"📱"}
              chatTitle={"Install Me"}
              link={"/installl"}
            /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
