import React from "react";
import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import styles from "./Pagination.module.css";

export const Pagination = ({ page, total, url, onChange }) => {
  return (
    <ReactPaginate
      forcePage={page}
      pageCount={total}
      previousLabel={<FaAngleLeft size="1.5em" />}
      nextLabel={<FaAngleRight size="1.5em" />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName={styles.container}
      pageLinkClassName={styles.page}
      activeLinkClassName={styles.active}
      hrefBuilder={(p) => {
        return `${url}${p - 1}`;
      }}
      onPageChange={(p) => {
        console.log("page =", p);
        onChange(p.selected);
      }}
    />
  );
};

