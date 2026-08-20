import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timerRef = useRef({});

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id]);
      delete timerRef.current[id];
    }
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).slice(2, 7);
    setToasts((prev) => [...prev, { id, message, type }]);
    timerRef.current[id] = setTimeout(() => {
      dismissToast(id);
    }, 4500);
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div className="toast-container fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm">
        {toasts.map((toast) => (
          <div key={toast.id} role="alert" className={'flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ' + (toast.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700')}>
            <p className="flex-1">{toast.message}</p>
            <button type="button" onClick={() => dismissToast(toast.id)} className="font-semibold opacity-60 hover:opacity-100 transition" aria-label="Dismiss">×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;
