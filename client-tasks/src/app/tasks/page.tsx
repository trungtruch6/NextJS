"use client";
import React, { useEffect, useState } from "react";

import { DataTable } from "../../containers";
import { Loading } from "../../components";
import axios from "axios";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await axios.get("http://localhost:8000/tasks", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 h-[300px]">
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <DataTable blogs={blogs} />
        )}
      </div>
    </div>
  );
};

export default Page;
