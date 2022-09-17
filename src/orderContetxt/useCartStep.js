import { useContext, createContext, useState } from 'react';

const CartStepContext = createContext(1);

export const CartStepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <CartStepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </CartStepContext.Provider>
  );
};

export const useCartStep = () => useContext(CartStepContext);
