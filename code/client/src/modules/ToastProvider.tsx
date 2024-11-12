import { createContext, useContext, useState, ReactNode } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext<(message: string) => void>(() => {});

export const useToast = () => useContext(ToastContext);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState({ message: "", show: false });

  const showToast = (message: string) => {
    setToast({ message, show: true });
  };

  const hideToast = () => setToast({ ...toast, show: false });

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={toast.show} onClose={hideToast} delay={3000} autohide>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
