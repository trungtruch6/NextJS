"use client";
import React from "react";
import { Typography, Textarea, Button } from "@material-tailwind/react";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";
import axios from "axios";

import { path } from "../../../ultils/constant";
import { Loading } from "../../../components";

const Page = ({ params }: { params: { id: string } }) => {
  const accessToken = localStorage.getItem("accessToken");
  const fetcher = (url: string) => {
    return axios
      .get(url, { headers: { Authorization: "Bearer " + accessToken } })
      .then((response) => response.data);
  };
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/tasks/${params?.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading || !data)
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  console.log(data);
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="w-3/4 h-auto flex flex-col shadow-md">
        <div className="h-1/4 flex-none w-full flex justify-center border-t border-l border-r border-gray-400 rounded-tl-md rounded-tr-md p-5 bg-blue-gray-50">
          <Typography color="blue-gray" className="font-normal">
            {data?.title}
          </Typography>
        </div>
        <div className="flex-auto w-full flex flex-col justify-center border-l border-r border-t border-gray-400 p-5">
          <div className="flex justify-center">
            <Typography color="blue-gray" className="font-normal">
              Content
            </Typography>
          </div>
          <div className="w-full h-auto">
            <Textarea label="Content" readOnly value={data?.description} />
          </div>
        </div>
        <div className="h-1/4 flex-none w-full flex justify-center border border-gray-400 p-5 rounded-bl-md rounded-br-md bg-blue-gray-50">
          <Typography color="blue-gray" className="font-normal">
            {data?.status}
          </Typography>
        </div>
      </div>
      <div className="flex items-end justify-end w-3/4">
        <Link href={path.TASKS}>
          <Button color="blue">Go back</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
