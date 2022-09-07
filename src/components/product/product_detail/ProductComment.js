import React from 'react';
import { useState } from 'react';
import '../../../styles/product/_productComment.scss';
import { IconContext } from 'react-icons';
import { FaStar } from 'react-icons/fa';
const img = '/img/product/product_avatar/avatar.png';

const ProductComment = () => {
  const [comment, setComment] = useState('');
  const [hollow, sethollow] = useState(5);
  const [solid, setsolid] = useState(0);
  const comments = [
    {
      name: '梓源源',
      comment: '有嚕嚕咪先給五星>< 可愛又好用 ',
      star: 5,
      date: '2022/08/17',
    },
    {
      name: '振銓銓',
      comment: '有嚕嚕咪先給五星>< 可愛又好用 ',
      star: 4,
      date: '2022/07/22',
    },
    {
      name: '姐姐姐',
      comment: '有嚕嚕咪先給五星>< 可愛又好用 ',
      star: 3,
      date: '2022/05/12',
    },
    {
      name: '妹妹妹',
      comment: '有嚕嚕咪先給五星>< 可愛又好用 ',
      star: 2,
      date: '2022/04/17',
    },
    {
      name: '阿倫倫',
      comment: '有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用有嚕嚕咪先給五星>< 可愛又好用 ',
      star: 1,
      date: '2022/03/22',
    },
  ];
  function hollowStar(v) {}
  return (
    <>
      <div className="typeArea">
        <div className="d-flex">
          <div className="avatarArea">
            <figure>
              <img src={img} alt="" />
            </figure>
            <div>
              {[...Array(solid)].map((star, i) => {
                return (
                  <i
                    className="fa-solid fa-star star"
                    key={i}
                    onMouseOver={() => {
                      setsolid(i + 1);
                      if (i === 0) {
                        sethollow(4);
                      } else if (i === 1) {
                        sethollow(3);
                      } else if (i === 2) {
                        sethollow(2);
                      } else if (i === 3) {
                        sethollow(1);
                      } else if (i === 4) {
                        sethollow(0);
                      }
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
                        if (i === 0) {
                          sethollow(4);
                        } else if (i === 1) {
                          sethollow(3);
                        } else if (i === 2) {
                          sethollow(2);
                        } else if (i === 3) {
                          sethollow(1);
                        } else if (i === 4) {
                          sethollow(0);
                        }
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
              rows="8"
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
      {comments.map((v, i) => {
        return (
          <>
            <div className="commentArea">
              <div className="d-flex justify-content-between" key={i}>
                <div className="avatar">
                  <figure>
                    <img src={img} alt="" />
                  </figure>
                  <p>{v.name}</p>
                </div>
                <div className="date">2022/01/08</div>
              </div>
              <div className="mt-3 d-flex justify-content-between align-items-end">
                <div className="comment pe-3">
                  <p>{v.comment}</p>
                </div>
                <div>
                  {[...Array(v.star)].map((star, i) => {
                    return <i className="fa-solid fa-star solid"></i>;
                  })}
                  {[...Array(5 - v.star)].map((star, i) => {
                    return <i className="fa-regular fa-star hollow"></i>;
                  })}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ProductComment;
