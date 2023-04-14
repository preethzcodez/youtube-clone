import React, { useEffect, useState } from "react";
import { addMessage } from "../../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { generateMessage, generateName } from "../../utils/utilHelper";
import send from "../../assets/send.png";

const ChatMessage = ({ chat }) => {
  return (
    <div className="flex p-1 pl-2 pr-2">
      <div className="text-xs font-bold">{chat.name}:</div>
      <div className="pl-1 text-xs font-normal">{chat.message}</div>
    </div>
  );
};

const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.chatMessages);
  const [textMessage, setTextMessage] = useState("");
  const MAX_TEXT_LENGTH = 100;

  useEffect(() => {
    // API Polling
    const interval = setInterval(() => {
      dispatch(
        addMessage({
          name: generateName(),
          message: generateMessage(),
        })
      );
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // send text message
  const sendMessage = () => {
    dispatch(
      addMessage({
        name: "Preeth Prathapan",
        message: textMessage,
      })
    );
    setTextMessage("");
  };

  // enter key press for text messages
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="mr-10 w-1/4 rounded-lg">
      <div className="p-3 border-l border-r border-t border-gray-400 rounded-ss-lg rounded-se-lg">
        Live Chat
      </div>
      <div className="bg-slate-200 h-[500px] max-h-[500px] overflow-y-scroll flex flex-col-reverse border border-gray-400">
        {chatMessages.map((chat, index) => {
          return <ChatMessage key={index} chat={chat} />;
        })}
      </div>
      <div className="flex">
        <div className="w-full">
          <p className="mt-2 ml-2 text-sm font-semibold text-gray-500">
            Preeth Prathapan
          </p>
          <div className="flex">
            <input
              type="text"
              value={textMessage}
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                if (e.target.value.length <= MAX_TEXT_LENGTH) {
                  setTextMessage(e.target.value);
                }
              }}
              placeholder="Say something..."
              className="ml-2 mr-2 mt-2 w-full font-normal border-0 text-sm focus:border-b focus-visible:outline-none focus-visible:border-b-blue-700"
            />
            <p className="mt-2 text-xs mr-3 text-gray-500">
              {textMessage.length}/{MAX_TEXT_LENGTH}
            </p>
          </div>
        </div>
        <img
          src={send}
          width={24}
          height={24}
          alt=""
          className="w-6 h-6 mt-5 cursor-pointer"
          onClick={() => sendMessage()}
        />
      </div>
    </div>
  );
};

export default LiveChat;
