import React from 'react';
import { IconContext } from 'react-icons';
import { IoCloseSharp } from 'react-icons/io5';
import { FaTrashAlt } from 'react-icons/fa';
import '../../../styles/backstage/_addCamping.scss';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import NoDataDisplay from '../../public_component/NoDataDisplay';

const Discount = ({
  discountData,
  setDiscountPage,
  loading,
  setLoading,
  setLoginBtn,
}) => {
  const handleDelete = async (id) => {
    let response = await axios.delete(
      `${API_URL}/products/deleteDiscount?id=${id}`
    );
  };
  return (
    <div className="backstageAddPage">
      <div className="formContainer">
        <IconContext.Provider
          value={{ color: '#817161', size: '2em', className: 'closeIcon' }}
        >
          <IoCloseSharp
            onClick={() => {
              setDiscountPage(false);
            }}
          />
        </IconContext.Provider>
        <table className="table mt-2">
          <thead>
            <tr>
              <th>折扣名稱</th>
              <th>折扣</th>
              <th>開始日期</th>
              <th>結束日期</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {discountData.length !== 0 ? (
              <>
                {discountData.map((v, i) => {
                  const { discount_name, discount, start_time, end_time, id } =
                    v;
                  return (
                    <tr key={i}>
                      <td>{discount_name}</td>
                      <td>{discount}</td>
                      <td>{start_time}</td>
                      <td>{end_time}</td>
                      <td
                        onClick={(e) => {
                          handleDelete(id);
                          setLoading(!loading);
                          setLoginBtn('deleteDiscount');
                          setTimeout(() => {
                            setLoginBtn('');
                          }, 2000);
                        }}
                      >
                        <FaTrashAlt />
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div className="discount">
                <NoDataDisplay />
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discount;
