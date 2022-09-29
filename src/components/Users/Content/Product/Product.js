import React, { useState, useEffect } from 'react';
import PaginationBar from '../../../public_component/PaginationBar';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../../../utils/config';
import { Link } from 'react-router-dom';
import NoDataDisplay from '../../../public_component/NoDataDisplay';
import { IconContext } from 'react-icons';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
const Product = () => {
  const title = ['名稱', '顏色', '價格', '查看', '刪除'];
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  console.log(data);
  useEffect(() => {
    try {
      let getdata = async () => {
        let response = await axios.get(
          `${API_URL}/products/userlike?page=${pageNow}`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.data);
        setLastPage(response.data.pagination.lastPage);
      };
      getdata();
    } catch (e) {
      console.error(e.response.data.msg);
    }
  }, [pageNow]);

  async function demoveLike(product_id) {
    await axios.delete(`${API_URL}/products/${product_id}/removeLike`, {
      withCredentials: true,
    });
    let response = await axios.get(
      `${API_URL}/products/userlike?page=${pageNow}`,
      {
        withCredentials: true,
      }
    );
    setData(response.data.data);
  }

  return (
    <>
      <h3>商品收藏</h3>
      <div className="productGroup">
        <table className="table table-sm mt-5 table-hover product_table">
          <thead>
            <tr>
              <th></th>
              {title.map((v, i) => {
                return <th key={i}>{v}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {data.map((v, i) => {
              let price = v.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

              return (
                <tr key={v.id}>
                  <td className="imgfrme">
                    <img
                      src={`${API_URL_IMG}/product/product_img/${v.img}`}
                      alt=""
                      className="img"
                    />
                  </td>
                  <td>{v.name}</td>
                  <td>{v.color}</td>
                  <td>{price}</td>
                  {/* <td>
                    <div className="quantity">
                      <div className="d-flex ">
                        <IconContext.Provider
                          value={{
                            color: '#444',
                            size: '1.8rem',
                          }}
                        >
                          <button>
                            <AiFillMinusCircle
                              onClick={() => {
                                if (quantity > 1) {
                                  setQuantity(quantity - 1);
                                }
                              }}
                            />
                          </button>
                          <div className="number">{quantity}</div>
                          <button>
                            <AiFillPlusCircle
                              onClick={() => {
                                setQuantity(quantity + 1);
                              }}
                            />
                          </button>
                        </IconContext.Provider>
                      </div>
                    </div>
                  </td> */}
                  <td>
                    <Link to={`/products/${v.product_id}`}>
                      <button>商品詳情</button>
                    </Link>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-trash icon"
                      onClick={() => {
                        demoveLike(v.product_id);
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length === 0 && <NoDataDisplay noDataText="商品" />}
      {data.length !== 0 && (
        <PaginationBar
          lastPage={lastPage}
          pageNow={pageNow}
          setPageNow={setPageNow}
        />
      )}
    </>
  );
};

export default Product;
