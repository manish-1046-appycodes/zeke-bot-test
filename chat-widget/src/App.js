import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import CrossImg from "./assets/cross.png";

const LogoImg = "https://developers.hubculture.com/chat-zeke/logo.png";

const App = () => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isMdOrSmaller, setIsMdOrSmaller] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // add a resize listener to update the screen width state
    const handleResize = () => setIsMdOrSmaller(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [messages, setMessages] = useState([
    {
      message: "Hello, my name is Zeke, how can I help you?",
      direction: "incoming",
      id: uuidv4(),
    },
  ]);

  const handleNewUserMessage = async (
    innerHtml,
    textContent,
    innerText,
    nodes
  ) => {
    // console.log({ innerHtml, textContent, innerText, nodes });
    // send the message throught the backend API
    // console.log("My message", textContent);

    setMessages((prev) => [
      ...prev,
      {
        message: textContent,
        direction: "outgoing",
        id: uuidv4(),
      },
    ]);

    try {
      const response = await fetch(
        `https://www.zeke.ai/api/chatbot?message=${textContent}&resetLog=true`
        // `https://zekeai.vercel.app/api/chatbot?message=${textContent}&resetLog=true`
      );
      const data = await response.json();
      // console.log("AI message", data);

      setMessages((prev) => [
        ...prev,
        {
          message: data.message?.trim(),
          direction: "incoming",
          id: uuidv4(),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        // right: "20px",
        // bottom: "20px",
        right: isMdOrSmaller && isChatBoxOpen ? 0 : "20px",
        bottom: isMdOrSmaller && isChatBoxOpen ? 0 : "20px",
        flexDirection: "column",
        justifyContent: isChatBoxOpen ? "space-between" : "flex-end",
        width:
          isMdOrSmaller && isChatBoxOpen
            ? "100%"
            : !isMdOrSmaller && isChatBoxOpen
            ? "370px"
            : "",
        height:
          isMdOrSmaller && isChatBoxOpen
            ? "100%"
            : !isMdOrSmaller && isChatBoxOpen
            ? "500px"
            : "",
        zIndex: "990",
        gap: "10px",
      }}
    >
      {isChatBoxOpen ? (
        <MainContainer
          style={{
            opacity: "1",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            transition: "opacity 0.2s ease 0s",
            fontSize: "16px",
          }}
        >
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Content userName="Zeke" />
              <ConversationHeader.Actions>
                {/* {isMdOrSmaller ? ( */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsChatBoxOpen(false)}
                >
                  <img style={{ width: "20px" }} src={CrossImg} alt="Close" />
                </div>
                {/* ) : ( */}
                {/* <></>
                )} */}
              </ConversationHeader.Actions>
            </ConversationHeader>

            <MessageList>
              {messages?.map((msg) => {
                return (
                  <Message
                    key={msg?.id}
                    model={{
                      message: `${msg?.message}`,
                      direction: `${msg?.direction}`,
                    }}
                  >
                    {msg?.direction === "incoming" ? (
                      <Avatar src={LogoImg} name="Zeke" />
                    ) : (
                      <></>
                    )}
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput
              attachButton={false}
              placeholder="Type message here"
              onSend={handleNewUserMessage}
              autoFocus
            />
          </ChatContainer>
        </MainContainer>
      ) : (
        <></>
      )}

      {isMdOrSmaller && isChatBoxOpen ? (
        <></>
      ) : (
        <button
          onClick={() => setIsChatBoxOpen(!isChatBoxOpen)}
          style={{
            border: "none",
            outline: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            boxShadow: "rgb(181, 181, 181) 0px 2px 10px 1px",
            height: "100%",
            width: "100%",
            // backgroundImage: `url(${require("./assets/chat.png")})`,
            // backgroundSize: "contain",
            backgroundColor: "rgb(53, 204, 230)",
            cursor: "pointer",
            alignSelf: "flex-end",

            maxHeight: "60px",
            maxWidth: "60px",
            overflow: "hidden",
            padding: 0,
          }}
        >
          <img
            style={{ overflow: "hidden", height: "100%", width: "100%" }}
            src={LogoImg}
            alt="Chat"
          />
        </button>
      )}
    </div>
  );
};

export default App;
