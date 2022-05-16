import { useRef } from "react";

function useDebounce(func, delay) {
  const timeoutRef = useRef(null);
  function debounceFunction(...args) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => func(...args), delay);
  }

  return debounceFunction;
}

export default useDebounce;
