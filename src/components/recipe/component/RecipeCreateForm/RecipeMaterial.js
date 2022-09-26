import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TbTrash } from 'react-icons/tb';
import { IconContext } from 'react-icons';
import { Form, Input } from 'antd';

const container = css`
  display: grid;
  grid-template-columns: 6fr 3fr 0.5fr;
  gap: 1rem;
  align-items: center;
`;

const RecipeMaterial = ({
  i,
  delHandler,
  onchange,
  data,
  demo,
  edit,
  error,
  setError,
}) => {
  const [materialName, setMaterialName] = useState('');
  const [materialQ, setMaterialQ] = useState('');

  // for demo
  useEffect(() => {
    if (demo || edit) {
      setMaterialName(data.name);
      setMaterialQ(data.quantity);
    }
  }, []);

  const errorChange = (e, text) => {
    let newError = [...error];
    if (e.target.value.trim()) {
      newError[i][e.target.name] = '';
    } else {
      newError[i][e.target.name] = text;
    }
    setError(newError);
  };

  return (
    <IconContext.Provider value={{ color: '#444', size: '1.5rem' }}>
      <div css={container}>
        <Form.Item
          validateStatus={error[i].name && 'error'}
          help={error[i].name}
        >
          <Input
            type="text"
            placeholder="食材"
            value={materialName}
            name="name"
            onChange={(e) => {
              errorChange(e, '');
              onchange(e.target.value, i, 'name');
              setMaterialName(e.target.value);
            }}
            onBlur={(e) => errorChange(e, '請輸入食材')}
          />
        </Form.Item>
        <Form.Item
          validateStatus={error[i].quantity && 'error'}
          help={error[i].quantity}
        >
          <Input
            type="text"
            placeholder="份量"
            value={materialQ}
            name="quantity"
            onChange={(e) => {
              errorChange(e, '');
              onchange(e.target.value, i, 'q');
              setMaterialQ(e.target.value);
            }}
            onBlur={(e) => errorChange(e, '請輸入份量')}
          />
        </Form.Item>
        <div onClick={() => delHandler(i)} className="cursorPointer mb-4">
          <TbTrash />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default RecipeMaterial;
