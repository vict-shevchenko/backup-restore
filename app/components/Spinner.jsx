/**
 * Created by xmityaz on 04.04.16.
 */
import React from 'react';
import './Spinner.css';

const circles = [0,1,2,3,4,5,6,7,8,9,10,11,12];

export default function Spinner() {
  return (
    <div className="loading-spinner-wrapper">
      <div className="loading-spinner">
        {circles.map((i) =>
          <div
            key={i}
            className={`loading-spinner__circle loading-spinner__circle${i}`}
          ></div>)}
      </div>
    </div>
  )
}
