//! For Next.js include "'use client';" at the top of the file
'use client'
import React, { useState, useEffect } from "react";
import ChatbotIframe from "./ChatbotIframe";

/**
 * ChatbotToggle Component
 *
 * This component manages the visibility of a chatbot iframe. It provides a toggle button
 * to open and close the chatbot and listens for messages from the iframe to handle close requests.
 */
const ChatbotToggle = () => {
  // State to track whether the chatbot is open
  const [isOpen, setIsOpen] = useState(false);

  /**
   * toggleChatbot
   *
   * Toggles the open/close state of the chatbot.
   */
  const toggleChatbot = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Effect to handle messages from the iframe
  useEffect(() => {
    /**
     * handleMessage
     *
     * Handles messages received from the iframe, specifically for closing the chatbot.
     * @param {MessageEvent} event - The message event.
     */
    const handleMessage = (event) => {
      if (event.data && event.data.type === "closeChatbotFromIframe") {
        setIsOpen(false); // Close the chatbot when message received
      }
    };

    // Add event listener for messages
    window.addEventListener("message", handleMessage);

    // Cleanup: remove event listener on unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      {/* Open Button */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="bg-black text-white fixed bottom-3 right-5 z-50 px-5 py-3 rounded-full shadow-md transition-all duration-300 flex gap-2 items-center"
        >
          Chatbot
        </button>
      )}

      {/* Chatbot & Close Button (contained within the ChatbotIframe component)*/}
      {isOpen && (
        <div className="fixed bottom-3 right-5 z-50">
          <ChatbotIframe />
        </div>
      )}
    </div>
  );
};

export default ChatbotToggle;