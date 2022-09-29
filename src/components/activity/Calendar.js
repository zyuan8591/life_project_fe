import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/list/main.css';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import '../../styles/activity/_calendar.scss';
// import Header from '../../components/public_component/Header';
import Notification from './Notification';
import { IconContext } from 'react-icons';
import { AiFillStar } from 'react-icons/ai';
import { RiStarSmileLine } from 'react-icons/ri';

const initEvents = [
  { title: 'All Day Event', start: getDate('YEAR-MONTH-01') },
  {
    title: 'Long Event',
    start: getDate('YEAR-MONTH-07'),
    end: getDate('YEAR-MONTH-10'),
  },
  {
    groupId: '999',
    title: 'Repeating Event',
    start: getDate('YEAR-MONTH-09T16:00:00+00:00'),
  },
  {
    groupId: '999',
    title: 'Repeating Event',
    start: getDate('YEAR-MONTH-16T16:00:00+00:00'),
  },
  {
    title: 'Conference',
    start: 'YEAR-MONTH-17',
    end: getDate('YEAR-MONTH-19'),
  },
  {
    title: 'Meeting',
    start: getDate('YEAR-MONTH-18T10:30:00+00:00'),
    end: getDate('YEAR-MONTH-18T12:30:00+00:00'),
  },
  { title: 'Lunch', start: getDate('YEAR-MONTH-18T12:00:00+00:00') },
  { title: 'Birthday Party', start: getDate('YEAR-MONTH-19T07:00:00+00:00') },
  { title: 'Meeting', start: getDate('YEAR-MONTH-18T14:30:00+00:00') },
  { title: 'Happy Hour', start: getDate('YEAR-MONTH-18T17:30:00+00:00') },
  { title: 'Dinner', start: getDate('YEAR-MONTH-18T20:00:00+00:00') },
];

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = '0' + month;
  }

  return dayString.replace('YEAR', year).replace('MONTH', month);
}

function Calendar() {
  // const [calendarData, setCalendarData] = useState([]);
  const [events, setEvents] = useState(initEvents);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [addActConfirm, setAddActConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let getCalendarData = async () => {
      let response = await axios.get(`${API_URL}/camping/calendar`, {
        withCredentials: true,
      });
      // console.log(response.data.result);
      setEvents(response.data.result);
    };
    getCalendarData();
  }, [start, end, title, loading]);

  const handleAdd = async () => {
    let response = await axios.post(
      `${API_URL}/camping/addCalendar?start=${start}&end=${end}&title=${title}`,
      {},
      { withCredentials: true }
    );
    console.log('add', response.data);

    //TODO:
    setLoading(!loading);
    setAddActConfirm(true);
    setTimeout(() => {
      setAddActConfirm(false);
    }, 2000);
  };
  // };
  return (
    <>
      {/* {console.log(getDate('YEAR-MONTH-18T12:00:00+00:00'))} */}
      {/* <Header /> */}
      <IconContext.Provider
        value={{
          className: 'collectedBtn',
        }}
      >
        {addActConfirm ? (
          <Notification
            contaninText={'加入成功'}
            // setLoginBtn={setLoginBtn}
            bottom="30"
          >
            <RiStarSmileLine />
          </Notification>
        ) : (
          ''
        )}
      </IconContext.Provider>

      

      <div className="calendarContainer">
        <FullCalendar
          events={events}
          plugins={[dayGridPlugin]}
          height="700px"
        />
      </div>
      <div className="addCalendarInput">
        {/* input */}
        <div>
          <div className="addTitle">add schedule</div>
          <div>
            <label>start</label>
            <input
              type="datetime-local"
              name="start"
              value={start}
              onChange={(e) => {
                console.log(e.target.value);
                setStart(e.target.value);
              }}
            />
          </div>
          <div>
            <label>end</label>
            <input
              type="datetime-local"
              name="end"
              value={end}
              onChange={(e) => {
                console.log(e.target.value);
                setEnd(e.target.value);
              }}
            />
          </div>
          <div>
            <label>title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                console.log(getDate(e.target.value));
                setTitle(e.target.value);
              }}
            />
          </div>
          <button onClick={handleAdd}>add</button>
        </div>
        <div>
          <div>本月重要記事</div>
          <div className="detail">
            <div className="detailContent">
              <div className="num">1</div>
              <IconContext.Provider value={{ color: '#F2AC33', size: '1.3em' }}>
                <AiFillStar className="ms-4 me-2" />
              </IconContext.Provider>
              <div className="me-2">9/18~9/19</div>
              <div>camping</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
