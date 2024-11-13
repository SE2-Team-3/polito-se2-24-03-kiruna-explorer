import { createContext, useContext, useState, ReactNode } from "react";
import { Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

const ToastContext = createContext<(m1: string, m2: string) => void>(() => {});

export const useToast = () => useContext(ToastContext);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState({ m1: "", m2: "", show: false });

  const showToast = (m1: string, m2: string) => {
    setToast({ m1, m2, show: true });
  };

  const hideToast = () => setToast({ ...toast, show: false });

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer className="">
        <Toast show={toast.show} onClose={hideToast} delay={3000} autohide>
          <Toast.Body>
            <Row className="toast-content">
              <Col xs={4} className="icon-container">
                <div className="toast-icon">
                  <FaCheck color="white" size={30} />
                </div>
              </Col>
              <Col xs={8} className="text-container">
                <div className="toast-bold">{toast.m1}</div>
                <div className="toast-subtext">{toast.m2}</div>
              </Col>
            </Row>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
