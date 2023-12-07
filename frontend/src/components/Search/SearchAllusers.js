import React, { useState, Fragment } from "react";

const SearchAllusers = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/admin-dashboards/${keyword}`);
    } else {
      history.push("/admin-dashboards");
    }
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="ค้นหาผู้ใช้ทั้งหมด ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default SearchAllusers;
