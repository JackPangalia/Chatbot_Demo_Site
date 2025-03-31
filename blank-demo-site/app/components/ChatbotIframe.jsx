//! For Next.js include "'use client';" at the top of the file
'use client'
import React, { useEffect, useRef, useState } from "react";

/**
 * ChatbotIframe Component
 *
 * This component renders an iframe containing a chatbot and manages its dimensions and behavior,
 * adapting to both mobile and desktop environments. It handles resizing, closing, and scroll prevention.
 */
const ChatbotIframe = () => {
  // Refs for the iframe and its wrapper div
  const iframeRef = useRef(null);
  const wrapperRef = useRef(null);

  // State to track if the device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    /**
     * checkMobile
     *
     * Determines if the device is mobile based on screen width and applies corresponding styles.
     */
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (iframeRef.current) {
        if (mobile) {
          // Mobile styles: full screen iframe
          iframeRef.current.style.width = "100vw";
          iframeRef.current.style.height = "100vh";
          iframeRef.current.style.maxWidth = "100%";
          iframeRef.current.style.maxHeight = "100%";

          // Mobile wrapper styles: full screen positioning
          if (wrapperRef.current) {
            wrapperRef.current.style.bottom = "0";
            wrapperRef.current.style.right = "0";
          }
        } else {
          // Desktop styles: fixed dimensions
          iframeRef.current.style.width = "90vw";
          iframeRef.current.style.height = "80vh";
          iframeRef.current.style.maxWidth = "400px";
          iframeRef.current.style.maxHeight = "700px";

          // Desktop wrapper styles: fixed position
          if (wrapperRef.current) {
            wrapperRef.current.style.bottom = "1rem";
            wrapperRef.current.style.right = "1.5rem";
          }
        }
      }
    };

    /**
     * handleMessages
     *
     * Handles messages received from the iframe, such as resize and close events.
     * @param {MessageEvent} event - The message event.
     */
    const handleMessages = (event) => {
      if (event.data) {
        if (event.data.type === "resizeChatbot" && !isMobile) {
          if (iframeRef.current) {
            if (event.data.expanded) {
              // Expanded dimensions for desktop
              iframeRef.current.style.width = "90vw";
              iframeRef.current.style.height = "90vh";
              iframeRef.current.style.maxWidth = "900px";
              iframeRef.current.style.maxHeight = "800px";
            } else {
              // Default dimensions for desktop
              iframeRef.current.style.width = "90vw";
              iframeRef.current.style.height = "80vh";
              iframeRef.current.style.maxWidth = "400px";
              iframeRef.current.style.maxHeight = "700px";
            }
          }
        }

        if (event.data.type === "closeChatbot") {
          // Send message to parent to close the chatbot
          window.parent.postMessage({ type: "closeChatbotFromIframe" }, "*");
        }
      }
    };

    /**
     * preventWheelPropagation
     *
     * Prevents wheel events from propagating through the iframe wrapper when the cursor is over the iframe.
     * @param {WheelEvent} e - The wheel event.
     */
    const preventWheelPropagation = (e) => {
      if (iframeRef.current) {
        const rect = iframeRef.current.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          e.stopPropagation();
        }
      }
    };

    // Initialize and set up event listeners
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("message", handleMessages);

    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('wheel', preventWheelPropagation, { passive: false });
    }

    // Cleanup: remove event listeners on unmount
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("message", handleMessages);
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('wheel', preventWheelPropagation);
      }
    };
  }, [isMobile]);

  return (
    <div
      ref={wrapperRef}
      className={`fixed z-50 transition-all duration-300 ${
        isMobile
          ? "bottom-0 right-0 left-0 top-0"
          : "bottom-[1rem] right-6"
      }`}
    >
      <iframe
        ref={iframeRef}
        id="ai-chatbot"
        src="https://jackpangalia.github.io/Corpus_Christi_Web_Chatbot_Frontend/" //! Replace with your actual embed URL
        style={{
          border: "none",
          width: isMobile ? "100vw" : "90vw",
          height: isMobile ? "100vh" : "80vh",
          maxWidth: isMobile ? "100%" : "400px",
          maxHeight: isMobile ? "100%" : "700px"
        }}
        className={`${isMobile ? "" : "rounded-2xl"} shadow-lg bg-white`}
        scrolling="no" // Prevents scroll issues
      ></iframe>
    </div>
  );
};

export default ChatbotIframe;