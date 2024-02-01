"use client";
import React, { memo } from "react";
import { Rings } from "react-loader-spinner";
const Loading = () => {
  return (
    <>
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#03a9f4"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
};

export default memo(Loading);
