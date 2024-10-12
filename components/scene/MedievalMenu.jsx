import React, { useState, useEffect } from "react";

const MedievalMenu = ({ router }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClose = () => {
    setIsFadingOut(true);
    router.push("/buyNft");
  };

  return (
    <>
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        style={{
          position: "absolute",
          top: 120,
          right: 0,
          padding: "4px 16px",
          fontSize: "0.5rem",
          fontFamily: "'MedievalSharp', cursive",
          background: "#4a0e0e",
          color: "#FFD700",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Show Buy Menu
      </button>

      {isVisible && (
        <div
          className="buy-menu"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "rgba(0, 0, 0, 0.8)",
            border: "2px solid #FFD700",
            borderRadius: "15px",
            color: "#FFD700",
            fontFamily: "'MedievalSharp', cursive",
            textAlign: "center",
            minWidth: "20rem",
            maxWidth: "20rem",
            animation: isFadingOut
              ? "fadeOut 0.5s ease-out forwards"
              : "fadeIn 0.5s ease-out forwards",
          }}
        >
          <h2>Buy NFT</h2>
          <p>The rarest NFT awaits you in the market. Own it now!</p>
          <button
            style={{
              background: "#4a0e0e",
              color: "#FFD700",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              fontFamily: "'MedievalSharp', cursive",
              marginTop: "10px",
            }}
            onClick={handleClose}
          >
            Buy NFT
          </button>
        </div>
      )}

      <style>{`
        .buy-menu {
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -55%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -55%);
          }
        }
      `}</style>
    </>
  );
};

export default MedievalMenu;
