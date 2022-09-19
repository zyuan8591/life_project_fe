import { useField } from 'formik';
import { useEffect, useState } from 'react';

const TextField = ({ label, ...props }) => {
  console.log('props', props);
  const [field, meta] = useField(props);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    console.log('fuck', field);
  }, []);

  return (
    <>
      <label className="mb-2">{label}</label>
      <input
        {...props}
        {...field}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          props.setFieldValue(e.target.name, e.target.value);
        }}
      />
      {meta.touched && meta.error ? (
        <div className="error text-danger ps-2">{meta.error}</div>
      ) : null}
    </>
  );
};
export default TextField;
