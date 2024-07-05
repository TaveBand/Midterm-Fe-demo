import { useEffect, useState } from "react";
import axios from 'axios';
import { Await } from "react-router-dom";
import Pagination from "react-js-pagination";
import './Pagenumber.css'

const Pagenumber = ({ totalCount, postPerPage, pageRangeDisplayed, handlePageChange, page }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalCount ? totalCount : 0}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={handlePageChange}
    />
  )
}

export default Pagenumber;