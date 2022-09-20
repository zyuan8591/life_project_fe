import React from 'react';
import Header from '../public_component/Header';
import PaginationBar from '../public_component/PaginationBar';
import '../../styles/backstage/_backstageProduct.scss';
import { IconContext } from 'react-icons';
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

function Backstage() {
  return (
    <>
      <Header />
      <IconContext.Provider
        value={{ color: '#817161', size: '1.5em', className: 'icons' }}
      >
        <div className="backstageContainer">
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
              <tr>
                <td>
                  <div className="titleImg">
                    <img
                      src="/img/camping/activity_camping_img/camping_01_01.jpeg"
                      alt="/"
                    />
                  </div>
                </td>
                <td>露營Fun輕鬆</td>
                <td>勤美學</td>
                <td>苗栗縣造橋鄉豐湖村1鄰乳姑山15-3號</td>
                <td className="text-center">3,680</td>
                <td>2022/08/31 ~2022/09/01</td>
                <td>2022/08/01 ~2022/08/25</td>
                <td className="text-center">15</td>
                <td>開團已截止</td>
                <td>
                  <BsPencilSquare />
                </td>
                <td>
                  <FaTrashAlt />
                </td>
              </tr>
            </tbody>
          </table>
          <PaginationBar />
          {/* lastPage={lastPage}
          pageNow={page}
          setPageNow={setPage} */}
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Backstage;
