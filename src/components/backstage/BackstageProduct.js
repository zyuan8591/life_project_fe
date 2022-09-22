import React from 'react';
import Header from '../public_component/Header';
import PaginationBar from '../public_component/PaginationBar';
import '../../styles/backstage/_backstageProduct.scss';
import Contact from '../contact/Contact';
import { IconContext } from 'react-icons';
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import AddProduct from './component/AddProduct';
import UpdateProduct from './component/UpdateProduct';

function Backstage() {
  const [productsData, setProductsData] = useState([]);
  const [productData, setProductData] = useState({});
  const [pageNow, setPageNow] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [addPage, setAddPage] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products/backstage?page=${pageNow}&brand=11`,
        {
          withCredentials: true,
        }
      );

      // console.log(result.data);
      setProductsData(result.data.data);
      setLastPage(result.data.pagination.lastPage);
    })();
  }, [pageNow, lastPage]);

  return (
    <>
      <Header />
      {addPage ? <AddProduct setAddPage={setAddPage} /> : ''}
      {updatePage ? <UpdateProduct setUpdatePage={setUpdatePage} /> : ''}
      <IconContext.Provider
        value={{ color: '#817161', size: '1.5em', className: 'icons' }}
      >
        <div className="backstageContainer">
          <button
            className="addBtn"
            onClick={(e) => {
              e.preventDefault();
              setAddPage(true);
            }}
          >
            新增商品
          </button>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>商品名稱</th>
                <th>分類</th>
                <th>庫存</th>
                <th>價格</th>
                <th>顏色</th>
                <th>介紹</th>
                <th>規格</th>
                <th>狀態</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {productsData.map((v) => {
                let {
                  id,
                  name,
                  price,
                  inventory,
                  img,
                  intro,
                  spec,
                  valid,
                  color,
                } = v;
                {
                  /* console.log(v); */
                }

                {/* setProductData({ id: v.id }); */}

                return (
                  <tr>
                    <td>
                      <div className="titleImg">
                        <img src={`/img/product/product_img/${img}`} alt="/" />
                      </div>
                    </td>
                    <td>{name}</td>
                    <td></td>
                    <td>{inventory}</td>
                    <td className="text-center">{price}</td>
                    <td>{color}</td>
                    <td className="ellipsis">
                      <span>{intro}</span>
                    </td>
                    <td className="text-center ellipsis">
                      <span>{spec}</span>
                    </td>
                    <td>{valid === 1 ? '上架中' : '下架中'}</td>
                    <td>
                      <div
                        onClick={() => {
                          setUpdatePage(true);
                        }}
                      >
                        <BsPencilSquare />
                      </div>
                    </td>
                    <td>
                      <FaTrashAlt />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PaginationBar
            lastPage={lastPage}
            pageNow={pageNow}
            setPageNow={setPageNow}
          />
          <Contact />
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Backstage;
