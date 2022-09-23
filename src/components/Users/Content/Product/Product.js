import React, { useState, useEffect } from 'react';
import PaginationBar from '../../../public_component/PaginationBar';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { Link } from 'react-router-dom';
const Product = () => {
  const title = ['名稱', '顏色', '查看', '刪除'];
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [list, setList] = useState('官方活動');
  const [data, setData] = useState();

  useEffect(() => {
    try {
      let getdata = async () => {
        let response = await axios.get(
          `${API_URL}/products//like?page=${pageNow}`,
          {
            withCredentials: true,
          }
        );
        // console.log(response.data);
        setData(response.data);
        setLastPage(response.data.pagination.lastPage);
      };
      getdata();
    } catch (e) {
      console.error(e.response.data.msg);
    }
  }, [pageNow]);
  return (
    <>
      <h3>商品收藏</h3>
      <div className="productGroup">
        <table className="table table-sm mt-5 table-hover">
          <thead>
            <tr>
              <th></th>
              {title.map((v, i) => {
                return <th key={i}>{v}</th>;
              })}
            </tr>
          </thead>

          {/* <tbody>
            {data.map((v, i) => {
              return (
                <tr key={v.id}>
                  <td className="campingImgfrme">
                    <img src={v.img} alt="" className="campingImg" />
                    {v.img}
                  </td>
                  <td>{v.name}</td>
                  <td>{v.color}</td>
                  <td>
                    <Link to={`/activity/camping/${v.id}`}>
                      <button>活動詳情</button>
                    </Link>
                  </td>
                  <td>
                    <i className="fa-solid fa-trash icon"></i>
                  </td>
                </tr>
              );
            })}
          </tbody> */}
        </table>
      </div>
      <PaginationBar
        lastPage={lastPage}
        pageNow={pageNow}
        setPageNow={setPageNow}
      />
    </>
  );
};

export default Product;
