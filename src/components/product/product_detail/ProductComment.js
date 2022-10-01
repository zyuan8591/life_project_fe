import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../styles/product/_productComment.scss';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { useUserRights } from '../../../usecontext/UserRights';
import NoDataDisplay from '../../public_component/NoDataDisplay';
import { API_URL_IMG } from '../../../utils/config';
import Notification from '../../activity/Notification';
import moment from 'moment';

const ProductComment = () => {
  const [comment, setComment] = useState([]);
  const [writeComment, setWriteComment] = useState('');
  const [hollow, sethollow] = useState(0);
  const [solid, setsolid] = useState(0);
  const { id } = useParams();
  const { user } = useUserRights();
  const star = solid + 1;
  const [loginBtn, setLoginBtn] = useState(false);
  const submit = async () => {
    await axios.post(
      `${API_URL}/products/${id}/comment`,
      { writeComment, star },
      { withCredentials: true }
    );
    let result = await axios.get(`${API_URL}/products/${id}/productComment`);
    setComment(result.data);
    setWriteComment('');
  };
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/${id}/productComment`);
      setComment(result.data);
    })();
  }, []);

  return (
    <>
      {loginBtn ? (
        <Notification
          contaninText={'請先登入會員'}
          linkTo={'/signin?p=1'}
          setLoginBtn={setLoginBtn}
        />
      ) : (
        ''
      )}
      <div className="typeArea">
        <div className="d-flex">
          <div className="avatarArea">
            <figure>
              {user ? (
                <img src={`${API_URL_IMG}${user.photo}`} alt="" />
              ) : (
                <>
                  <img
                    src={`${API_URL_IMG}/product/product_avatar/avatar.png`}
                    alt=""
                  />
                </>
              )}
            </figure>
            <div>
              {[...Array(5)].map((star, i) => {
                return (
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
              minLength={10}
              value={writeComment}
              onChange={(e) => {
                setWriteComment(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end me-3 my-2">
          {user ? (
            <button onClick={submit}>送出</button>
          ) : (
            <button
              onClick={() => {
                setLoginBtn(true);
              }}
            >
              送出
            </button>
          )}
        </div>
      </div>
      {comment.map((v, i) => {
        return (
          <div className="commentArea" key={i}>
            <div className="d-flex justify-content-between align-items-sm-start align-items-center">
              <div className="avatar">
                <figure>
                  <img src={`${API_URL_IMG}${v.photo}`} alt="" />
                </figure>
                <p>{v.name}</p>
              </div>
              <div className="date">
                {moment(v.create_time, 'YYYY-MM-DD h:mm:ss').fromNow()}
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-between align-items-sm-end align-items-start">
              <div className="comment pe-3">
                <p>{v.comment}</p>
              </div>
              <div>
                {[...Array(v.star)].map((star, i) => {
                  return <i className="fa-solid fa-star solid" key={i}></i>;
                })}
                {[...Array(5 - v.star)].map((star, i) => {
                  return <i className="fa-regular fa-star hollow" key={i}></i>;
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ color: '#444' }}>
        {comment.length === 0 && <NoDataDisplay noDataText={'留言'} />}
      </div>
    </>
  );
};

export default ProductComment;
