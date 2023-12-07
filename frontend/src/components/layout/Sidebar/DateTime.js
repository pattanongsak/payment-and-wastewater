import React, { useState, useEffect } from "react";
import styled from "styled-components";

const options = { day: "numeric", month: "short", year: "numeric" };

const DateTitle = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 18px;
  color: #f0f0f0;
`;

export const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <DateTitle>
      <p>
        {" "}
        วันที่ {date.toLocaleDateString("th-TH", options)}
      </p>
    </DateTitle>
  );
};

export default DateTime;
