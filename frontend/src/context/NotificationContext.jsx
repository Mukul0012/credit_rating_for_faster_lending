import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

// App-wide toast notifications, used instead of browser alert() per the
// UX requirements. Call useNotification() anywhere and fire
// notify.success('Saved!') / notify.error('...') / notify.info('...').

const NotificationContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type, message, duration = 4000) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, type, message }]);
      if (duration) {
        setTimeout(() => remove(id), duration);
      }
    },
    [remove]
  );

  const notify = {
    success: (msg, duration) => push('success', msg, duration),
    error: (msg, duration) => push('error', msg, duration),
    warning: (msg, duration) => push('warning', msg, duration),
    info: (msg, duration) => push('info', msg, duration),
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <div className="toast-stack">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info;
          return (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              <Icon size={18} />
              <span>{toast.message}</span>
              <button className="toast-close" onClick={() => remove(toast.id)} aria-label="Dismiss notification">
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within a NotificationProvider');
  return ctx;
}
