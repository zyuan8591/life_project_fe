import React from 'react';
import { useState } from 'react';
import '../../../styles/product/_productComment.scss';
import { IconContext } from 'react-icons';
import { FaStar } from 'react-icons/fa';
import { clearConfigCache } from 'prettier';
const img = '/img/product/product_avatar/avatar.png';

const ProductComment = () => {
  const [comment, setComment] = useState('');
  const [hollow, sethollow] = useState(5);
  const [solid, setsolid] = useState(0);

  return (
    <>
      <div className="typeArea">
        <div className="d-flex">
          <div className="avatarArea">
            <figure>
              <img src={img} alt="" />
            </figure>
            <div>
              {[...Array(solid)].map((star, index) => {
                return (
                  <i
                    className="fa-solid fa-star star"
                    key={index}
                    onMouseOver={() => {
                      // sethollow(index);
                    }}
                  ></i>
                );
              })}
              {[...Array(hollow)].map((star, i) => {
                return (
                  <>
                    <i
                      className="fa-regular fa-star star"
                      key={i}
                      onMouseOver={() => {
                        setsolid(i + 1);
                        sethollow((i -= 1));
                        // 1 -> 4
                        // 2 -> 3
                        // 3 -> 2
                        // 4 -> 1
                      }}
                    ></i>
                  </>
                );
              })}
            </div>
          </div>
          <div className="">
            <textarea
              name=""
              id=""
              cols="50"
              rows="7"
              placeholder="寫下評論..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end me-3 my-2">
          <button>送出</button>
        </div>
      </div>
    </>
  );
};

export default ProductComment;
