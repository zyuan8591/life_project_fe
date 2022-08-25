import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/_footer.scss';
import { IconContext } from 'react-icons';

import {
  FaLine,
  FaInstagram,
  FaFacebookSquare,
  FaTwitterSquare,
} from 'react-icons/fa';

const list = [
  '聯絡LIFE',
  '購物說明',
  '最新消息',
  '活動專區',
  '網站使用條款',
  '隱私權政策',
  '免責聲明',
];

const Footer = () => {
  return (
    <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
      <footer>
        <div className="footer">
          <ul className="list-unstyled d-flex footerLinks">
            {list.map((item) => {
              return (
                <li key={uuidv4()} className="footerLink">
                  {item}
                </li>
              );
            })}
          </ul>
          <div className="footerBot">
            <div>Copyright &copy; 2022 LIFE. All right reseved.</div>
            <div className="footerCommunity">
              <FaLine />
              <FaInstagram />
              <FaFacebookSquare />
              <FaTwitterSquare />
              <span className="life">LIFE</span>
            </div>
          </div>
        </div>
      </footer>
    </IconContext.Provider>
  );
};

export default Footer;
