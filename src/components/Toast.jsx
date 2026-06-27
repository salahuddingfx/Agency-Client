import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const TOAST_STYLES = {
  success: {
    icon: <CheckCircle2 size={16} className="text-emerald-400" />,
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    iconBg: 'bg-emerald-500/15',
  },
  error: {
    icon: <AlertCircle size={16} className="text-red-400" />,
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    iconBg: 'bg-red-500/15',
  },
  info: {
    icon: <Info size={16} className="text-sky-400" />,
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
    iconBg: 'bg-sky-500/15',
  },
  warning: {
    icon: <AlertCircle size={16} className="text-amber-400" />,
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    iconBg: 'bg-amber-500/15',
  },
};

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback({
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const style = TOAST_STYLES[t.type] || TOAST_STYLES.info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.95, x: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border ${style.border} ${style.bg} backdrop-blur-xl shadow-2xl shadow-black/30`}
              >
                <div className={`p-1.5 rounded-lg ${style.iconBg} shrink-0 mt-0.5`}>
                  {style.icon}
                </div>
                <p className="text-sm text-slate-200 font-medium leading-snug flex-1 pr-2">
                  {t.message}
                </p>
                <button
                  onClick={() => removeToast(t.id)}
                  className="p-1 rounded-md hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors shrink-0 mt-0.5"
                >
                  <X size={13} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
