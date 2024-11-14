import { createContext, useContext, useState, ReactNode } from "react";
import { Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

const ToastContext = createContext<
  (m1: string, m2: string, isError: boolean) => void
>(() => {});

export const useToast = () => useContext(ToastContext);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState({
    m1: "",
    m2: "",
    show: false,
    isError: false,
  });

  const showToast = (m1: string, m2: string, isError: boolean) => {
    setToast({ m1, m2, show: true, isError });
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
                <div
                  className="toast-icon"
                  style={{
                    backgroundColor: toast.isError ? "#ff0000" : "#28a745", // Red for error, Green for success
                  }}
                >
                  {toast.isError ? (
                    <FaTimes color="white" size={30} />
                  ) : (
                    <FaCheck color="white" size={30} />
                  )}
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
