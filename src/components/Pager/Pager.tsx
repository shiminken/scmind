import { Button } from 'antd';
import React, { useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

import styles from "./pager.module.css";


type Props = {
  items: number[];
  onChange: (item: any) => void;
};

const Pager: React.FC<Props> = ({ items, onChange }) => {
  const [currentItem, setCurrentItem] = useState(0);

  const handlePrevClick = () => {
    setCurrentItem((prevItem) => (prevItem > 0 ? prevItem - 1 : prevItem));
    if (currentItem > 0) {
      onChange(currentItem - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentItem((prevItem) =>
      prevItem < items.length - 1 ? prevItem + 1 : prevItem
    );

    if (currentItem < items.length - 1) {
      onChange(currentItem + 1);
    }

  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={handlePrevClick} disabled={currentItem === 0} type={'primary'}>
       <ArrowLeftOutlined />
      </Button>
      {items.map((item, index) =>
        index === currentItem ? (
          <span key={index} className={styles.date}>{item}</span>
        ) : null
      )}
      <Button
        onClick={handleNextClick}
        disabled={currentItem === items.length - 1}
        type={'primary'}
      >
        <ArrowRightOutlined />
      </Button>
    </div>
  );
};

export default Pager;
