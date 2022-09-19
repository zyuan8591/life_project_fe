import React from 'react';
import '../../styles/backstage/_addPage.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
function AddPage() {
  return (
    <>
      <div className="backstageAddPage">
        <form action="">
          <div className="mb-4">
            <label htmlFor="name" className="flex mb-2 w-32">
              活動標題：
            </label>
            <input
              className="input"
              placeholder="Search.."
              name="title"
              type="text"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="flex mb-2 w-32">
              活動地點：
            </label>
            <input
              className="input"
              placeholder="Search.."
              name="place"
              type="text"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="flex mb-2 w-32">
              活動地址：
            </label>
            <input
              className="input"
              placeholder="Search.."
              name="address"
              type="text"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 w-32">活動日期：</label>
            <input
              className="input"
              placeholder="Search.."
              name="actStartDate"
              type="text"
              maxLength={15}
              value=""
            />
            ～
            <input
              className="input"
              placeholder="Search.."
              name="actEndDate"
              type="text"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 w-32">活動日期：</label>
            <input
              className="input"
              placeholder="Search.."
              name="startDate"
              type="text"
              maxLength={15}
              value=""
            />
            ～
            <input
              className="input"
              placeholder="Search.."
              name="endDate"
              type="text"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 w-32">活動價格：</label>
            <input
              className="input"
              placeholder="Search.."
              name="price"
              type="number"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 w-32">活動人數：</label>
            <input
              className="input"
              placeholder="Search.."
              name="pepCount"
              type="number"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 w-32">活動介紹：</label>
            <input
              className="input"
              placeholder="Search.."
              name="actInt"
              type="text"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 w-32">注意事項：</label>
            <input
              className="input"
              placeholder="Search.."
              name="actLodging"
              type="text"
              maxLength={15}
              value=""
            />
          </div>
          <div className="mb-4 d-flex">
            <label className="mb-2 w-32">活動照片：</label>
            <div className="d-flex flex-column align-items-center imgInput">
              <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
                <AiOutlineCamera />
              </IconContext.Provider>
              <span>點擊新增圖片</span>
            </div>

            <input
              className="input d-none"
              placeholder="Search.."
              name="actLodging"
              type="file"
              maxLength={15}
              value=""
            />
          </div>
          {/* TODO: 三張照片 ＆ lat lng */}
        </form>
      </div>
    </>
  );
}

export default AddPage;
