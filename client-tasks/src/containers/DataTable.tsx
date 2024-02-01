import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";

import { ButtonDefault, DialogDefault } from "@/components";
import { path } from "../ultils/constant";
const TABLE_HEAD = ["No", "Status", "Title", "Description", "Actions"];

interface IProps {
  blogs: IBlog[];
}
const DataTable = (props: IProps) => {
  const { blogs } = props;
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [blogsRe, setBlogsRe] = useState<IBlog[]>(blogs);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [buttonType, setButtonType] = useState<string | null>(null);

  const handleOnClick = (type?: string, item?: IBlog): void => {
    setShowModal(!showModal);
    setButtonType(type || null);
    setBlog(item || null);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-lg font-medium uppercase">Table Blogs</h3>
        <ButtonDefault
          onClick={() => handleOnClick("add")}
          colorDefault={"gray"}
          text={"Add new"}
        />
      </div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blogs?.map((item, index) => {
              const isLast = index === blogs?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      <div className="flex w-max gap-4">
                        <Link href={`${path.TASKS}/${item.id}`}>
                          <ButtonDefault colorDefault={"blue"} text={"View"} />
                        </Link>
                        <ButtonDefault
                          onClick={() => handleOnClick("edit", item)}
                          colorDefault={"amber"}
                          text={"Edit"}
                        />
                        <ButtonDefault
                          onClick={() => handleOnClick("delete", item)}
                          colorDefault={"red"}
                          text={"Delete"}
                        />
                      </div>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <DialogDefault
        buttonType={buttonType}
        showModal={showModal}
        setShowModal={setShowModal}
        blog={blog}
        setBlog={setBlog}
        setBlogsRe={setBlogsRe}
        blogsRe={blogsRe}
      />
    </div>
  );
};

export default DataTable;
