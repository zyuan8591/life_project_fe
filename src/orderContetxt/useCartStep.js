import { useContext, createContext, useState } from 'react';

const CartStepContext = createContext(1);

export const CartStepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderId, setOrderId] = useState(0);

  return (
    <CartStepContext.Provider
      value={{ currentStep, setCurrentStep, orderId, setOrderId }}
    >
      {children}
    </CartStepContext.Provider>
  );
};

export const useCartStep = () => useContext(CartStepContext);
