import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TbTrash, TbMenu2 } from 'react-icons/tb';
import { IconContext } from 'react-icons';
// import { Draggable } from 'react-beautiful-dnd';

const container = css`
  display: grid;
  grid-template-columns: 6fr 3fr 1fr;
  gap: 1rem;
  align-items: center;
`;
const btns = css`
  display: flex;
  justify-content: space-around;
`;
const dragBtn = css`
  cursor: move;
`;

const RecipeMaterial = ({ i, delHandler, onchange, data, demo, edit }) => {
  const [materialName, setMaterialName] = useState('');
  const [materialQ, setMaterialQ] = useState('');
  // for demo
  useEffect(() => {
    if (demo || edit) {
      setMaterialName(data.name);
      setMaterialQ(data.quantity);
    }
  }, []);

  return (
    // <Draggable key={i} draggableId={`draggable-${i}`} index={0}>
    //   {(provided) => (
    <IconContext.Provider value={{ color: '#444', size: '1.5rem' }}>
      <div
        css={container}
        className="mb-2"
        // ref={provided.innerRef}
        // {...provided.draggableProps}
      >
        <input
          type="text"
          placeholder="食材"
          value={materialName}
          onChange={(e) => {
            onchange(e.target.value, i, 'name');
            setMaterialName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="份量"
          value={materialQ}
          onChange={(e) => {
            onchange(e.target.value, i, 'q');
            setMaterialQ(e.target.value);
          }}
        />
        <div css={btns}>
          <div onClick={() => delHandler(i)} className="cursorPointer">
            <TbTrash />
          </div>
          <div
            css={dragBtn}
            // {...provided.dragHandlerProps}
          >
            <TbMenu2 />
          </div>
        </div>
      </div>
    </IconContext.Provider>
    //   )}
    // </Draggable>
  );
};

export default RecipeMaterial;
