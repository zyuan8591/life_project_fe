import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import Header from '../public_component/Header';
import PaginationBar from '../public_component/PaginationBar';
import AddCamping from './component/camping/AddCamping';
import UpdateCamping from './component/camping/UpdateCamping';
import Contact from '../contact/Contact';
import '../../styles/backstage/_backstageCamping.scss';
import { IconContext } from 'react-icons';
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

function Backstage() {
  // const [state, setState] = useState('');
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [campingData, setCampingData] = useState([]);
  const [price, setPrice] = useState(false);
  const [date, setDate] = useState(false);
  const [addPage, setAddPage] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  useEffect(() => {
    let getCampingData = async () => {
      let response = await axios.get(
        `${API_URL}/camping/backstage?order=${order}&page=${page}`
      );
      // console.log(response.data.pagination.total);
      setLastPage(response.data.pagination.lastPage);

      setCampingData(response.data.result);
    };
    getCampingData();
  }, [page, order]);

  const handleSubmit = async (id) => {
    console.log(id);
    let response = await axios.delete(`${API_URL}/campingDel/${id}`);
    console.log('del', response.data);
  };
  return (
    <>
      <Header />
      {addPage ? <AddCamping setAddPage={setAddPage} /> : ''}
      {updatePage ? (
        <UpdateCamping setUpdatePage={setUpdatePage} updateData={updateData} />
      ) : (
        ''
      )}

      <div className="backstageContainer">
        <button
          className="addBtn"
          onClick={(e) => {
            e.preventDefault();
            setAddPage(true);
          }}
        >
          新增活動
        </button>
        <table>
          <IconContext.Provider
            value={{ color: '#1F9998', size: '1.7em', className: 'icons' }}
          >
            <thead>
              <tr>
                <th></th>
                <th>標題</th>
                <th>地點</th>
                <th>地址</th>
                <th className="position-relative">
                  費用
                  <div>
                    {price ? (
                      <MdArrowDropDown
                        className="priceIcon"
                        onClick={() => {
                          setPrice(false);
                          setOrder(3);
                        }}
                      />
                    ) : (
                      <MdArrowDropUp
                        className="priceIcon"
                        onClick={() => {
                          setPrice(true);
                          setOrder(4);
                        }}
                      />
                    )}
                  </div>
                </th>
                <th className="position-relative">
                  活動日期
                  <div>
                    {date ? (
                      <MdArrowDropDown
                        className="icon"
                        onClick={() => {
                          setDate(false);
                          setOrder(1);
                        }}
                      />
                    ) : (
                      <MdArrowDropUp
                        className="icon"
                        onClick={() => {
                          setDate(true);
                          setOrder(2);
                        }}
                      />
                    )}
                  </div>
                </th>
                <th>報名期間</th>
                <th>報名人數</th>
                <th>活動狀態</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
          </IconContext.Provider>
          <IconContext.Provider
            value={{ color: '#817161', size: '1.5em', className: 'icons' }}
          >
            <tbody>
              {campingData.map((v) => {
                const dataReplace = (date) => {
                  return date.replace(/-/g, '/');
                };

                const priceReplace = (price) => {
                  const newPrice = price.toString();
                  return newPrice.replace(
                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    ','
                  );
                };

                return (
                  <tr key={v.id}>
                    <td>
                      <div className="titleImg">
                        <img
                          src={`/img/camping/activity_camping_img/${v.img1}`}
                          alt="/"
                        />
                      </div>
                    </td>
                    <td style={{ width: '205px' }}>{v.title}</td>
                    <td style={{ width: '210px' }}>{v.place}</td>
                    <td style={{ width: '305px' }}>{v.address}</td>
                    <td className="text-center">{priceReplace(v.price)}</td>
                    <td>
                      {dataReplace(v.activity_start_date)} <br />~
                      {dataReplace(v.activity_end_date)}
                    </td>
                    <td>
                      {dataReplace(v.start_date)}
                      <br />~{dataReplace(v.end_date)}
                    </td>
                    <td className="text-center">{v.join_limit}</td>
                    <td style={{ width: '110px' }}>{v.state}</td>
                    <td>
                      <BsPencilSquare
                        onClick={() => {
                          setUpdatePage(true);
                          setUpdateData(v);
                        }}
                      />
                    </td>
                    <td>
                      <FaTrashAlt
                        onClick={() => {
                          handleSubmit(v.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </IconContext.Provider>
        </table>
        <PaginationBar
          lastPage={lastPage}
          pageNow={page}
          setPageNow={setPage}
        />
        <Contact />
      </div>
    </>
  );
}

export default Backstage;
