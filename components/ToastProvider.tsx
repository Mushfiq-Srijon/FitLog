"use client";

import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext<(message: string) => void>(() => {});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const toast = useCallback((text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {message && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 border border-acid bg-acid px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-2xl">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
