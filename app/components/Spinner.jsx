/**
 * Created by xmityaz on 04.04.16.
 */
import React from 'react';
import './Spinner.css';

const circles = Array.from(new Array(12), (x, i) => i);

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
