import { useField } from 'formik';

const RecipientInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="mb-2">{label}</label>
      <input {...props} {...field}  />
      {meta.touched && meta.error ? (
        <div className="error text-danger ps-2">{meta.error}</div>
      ) : null}
    </>
  );
};
export default RecipientInput;
