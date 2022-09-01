import React, { Component, useState, useEffect } from 'react';
import './test.scss';
const data = [
  {
    title: '春天',
    content: '竹外桃花三兩枝，春江水暖鴨先知。',
    author: '蘇軾',
    name: '《惠崇春江晚景 》',
  },
  {
    title: '夏天',
    content: '小荷才露尖尖角，早有蜻蜓立上頭。',
    author: '楊萬里',
    name: '《小池》',
  },
  {
    title: '秋天',
    content: '人生若只如初見，何事秋風悲畫扇。',
    author: '納蘭性德',
    name: '《木蘭詞·擬古決絕詞柬友》',
  },
  {
    title: '冬天',
    content: '朔風如解意，容易莫摧殘。',
    author: '崔道融',
    name: '《梅花》',
  },
];


const AccordionItem = (props) => {
  const [heightItem, setHeightItem] = useState(0);
  useEffect(() => {
    setHeightItem(
      props.visable
        ? document.getElementById(`item_${props.index}`).scrollHeight
        : 0
    );
  });
  const { item, index, setVisable } = props;
  return (
    <div className="accordion-item" onClick={() => setVisable(index)}>
      <div className="title">{item.title}</div>
      <div
        className="content-box"
        style={{ height: heightItem }}
        id={`item_${index}`}
      >
        <p>{item.content}</p>
        <p>
          --{item.author}
          {item.name}
        </p>
      </div>
    </div>
  );
};
const Pinic = () => {
  const [visable, setVisable] = useState([true, false, false, false]);
  const setVisableChild = (key) => {
    setVisable(visable.map((one, index) => (key == index ? true : false)));
  };
  return (
    <div className="accordion">
      {data.map((item, index) => {
        return (
          <AccordionItem
            item={item}
            key={index}
            index={index}
            visable={visable[index]}
            setVisable={setVisableChild}
          />
        );
      })}
    </div>
  );
};
export default Pinic;
