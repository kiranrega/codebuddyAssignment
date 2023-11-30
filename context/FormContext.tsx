// FormContext.js
import React, {createContext, useState, useContext} from 'react';

const FormContext = createContext<any>(null);

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider: React.FC<any> = ({children}) => {
  const [formData, setFormData] = useState({});

  const setFieldData = (fieldName: string, value: any) => {
    setFormData(prevData => ({...prevData, [fieldName]: value}));
  };

  const contextValue = {
    formData,
    setFieldData,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
