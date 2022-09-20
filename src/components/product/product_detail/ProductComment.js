import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../styles/product/_productComment.scss';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { useUserRights } from '../../../usecontext/UserRights';
const img = '/img/product/product_avatar/avatar.png';

const ProductComment = () => {
  const [comment, setComment] = useState([]);
  const [writeComment, setWriteComment] = useState('');
  const [hollow, sethollow] = useState(0);
  const [solid, setsolid] = useState(0);
  const { id } = useParams();
  const { user, setUser } = useUserRights();
  const star = solid + 1;
  console.log(user.photo);
  const submit = async () => {
    await axios.post(
      `${API_URL}/products/${id}/comment`,
      { writeComment, star },
      { withCredentials: true }
    );
    let result = await axios.get(`${API_URL}/products/${id}/productComment`);
    setComment(result.data);
  };
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/${id}/productComment`);
      setComment(result.data);
    })();
  }, []);

  return (
    <>
      <div className="typeArea">
        <div className="d-flex">
          <div className="avatarArea">
            <figure>
              <img src={img} alt="" />
            </figure>
            <div>
              {[...Array(5)].map((star, i) => {
                return (
                  <>
                    <i
                      className={`${
                        i > hollow ? 'fa-regular' : 'fa-solid'
                      } fa-star star`}
                      key={i}
                      onMouseOver={() => sethollow(i)}
                      onClick={() => {
                        setsolid(i);
                      }}
                      onMouseOut={() => {
                        sethollow(solid);
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
              value={writeComment}
              onChange={(e) => {
                setWriteComment(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end me-3 my-2">
          <button onClick={submit}>送出</button>
        </div>
      </div>
      {comment.map((v, i) => {
        return (
          <>
            <div className="commentArea" key={i}>
              <div className="d-flex justify-content-between">
                <div className="avatar">
                  <figure>
                    <img src={`/img/user/user_img/${user.photo}`} alt="" />
                  </figure>
                  <p>{v.name}</p>
                </div>
                <div className="date">{v.create_time.slice(0, 10)}</div>
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
