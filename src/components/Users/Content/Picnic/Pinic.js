import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Button = styled.button`
  color: ${(props) => (props.ccc ? 'hotpink' : 'turquoise')};
`;

const paragraph = css`
  color: red;

  header & {
    color: green;
  }
`;
const Pinic = () => {
  return (
    <div>
      <Button>This my button component.</Button>
      <Button ccc>This my button component.</Button>
      <div>
        <header>
          <p css={paragraph}>This is green since it's inside a header</p>
        </header>
        <p css={paragraph}>This is turquoise since it's not inside a header.</p>
      </div>
      作者：有朝 链接：https://juejin.cn/post/6972160798466506788 来源：稀土掘金
      著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    </div>
  );
};

export default Pinic;
