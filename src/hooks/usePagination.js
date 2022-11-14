import { useState, useEffect } from "react";
const usePagination = ({ count }) => {
  const firstIndex = 0;
  const screenWidth = window.innerWidth;
  const [contentPerPage, setContentPerPage] = useState(() => {
    if (screenWidth <= 769) {
      return 2;
    }
    if (screenWidth > 770) {
      return 3;
    }
  });
  const [lastIndex, setLastIndex] = useState(() => {
    if (screenWidth <= 480) {
      return 5;
    }
    if (screenWidth <= 769) {
      return 8;
    }
    if (screenWidth > 770) {
      return 3;
    }
  });
  const showNextCards = () => {
    setLastIndex(lastIndex + contentPerPage);
  };

  useEffect(() => {
    const setSize = () => {
      if (screenWidth > 770) {
        setLastIndex(3);
        setContentPerPage(3);
      }
      if (screenWidth <= 769) {
        setLastIndex(8);
        setContentPerPage(2);
      }
      if (screenWidth <= 480) {
        setLastIndex(5);
        setContentPerPage(2);
      }
    };
      window.addEventListener("resize", function () {
        setTimeout(setSize, 500);
    });
      return () => {
        window.removeEventListener("resize", setSize);
      };
  }, [screenWidth]);

  return {
    firstIndex,
    lastIndex,
    contentPerPage,
    showNextCards,
  };
};
export default usePagination;
