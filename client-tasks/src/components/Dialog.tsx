"use client";
import React, { memo, useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import "../styles/Swal.toasts.css";
import { blob } from "stream/consumers";

const DialogDefault = ({
  showModal,
  setShowModal,
  buttonType,
  blog,
  setBlog,
  blogsRe,
  setBlogsRe,
}: {
  showModal: boolean;
  setShowModal: (setShowModal: boolean) => void;
  buttonType: any | null;
  blog: IBlog | null;
  setBlog: (blog: IBlog | null) => void;
  blogsRe: IBlog[] | [];
  setBlogsRe: (blogRe: IBlog[] | []) => void;
}) => {
  const { mutate } = useSWRConfig();
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    if (buttonType === "add") {
      setId(0);
      setTitle("");
      setDescription("");
      setStatus("");
    } else if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setStatus(blog.status);
      setDescription(blog.description);
    }
  }, [buttonType, blog]);
  console.log(blog, blogsRe);
  console.log("------------------------------------------");
  console.log(id, title, status, description);
  const handleSubmit = () => {
    const accessToken = localStorage.getItem("accessToken");
    const showToast = async (icon: SweetAlertIcon, title: string) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      await Toast.fire({
        icon,
        title,
      });
    };
    if (!title) {
      (async () => {
        await showToast("error", "Missing input title");
      })();
      return;
    }
    if (!status) {
      (async () => {
        await showToast("error", "Missing input status");
      })();
      return;
    }
    if (!description) {
      (async () => {
        await showToast("error", "Missing input description");
      })();
      return;
    }
    const params = new URLSearchParams(status);
    if (buttonType === "add") {
      fetch(`http://localhost:8000/tasks?${params}`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, description }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            (async () => {
              await showToast("success", "Success");
              setShowModal(false);
              mutate("http://localhost:8000/tasks");
            })();
          } else {
            (async () => {
              await showToast("error", "Error");
            })();
          }
        });
    } else if (buttonType === "edit") {
      fetch(`http://localhost:8000/tasks/${id}/status}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, status, description }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            (async () => {
              await showToast("success", "Update successfully");
              setShowModal(false);
              mutate("http://localhost:8000/tasks");
            })();
          } else {
            (async () => {
              await showToast("error", "Error");
            })();
          }
        });
    } else if (buttonType === "delete") {
      fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      (async () => {
        await showToast("success", "Delete successfully");
        setShowModal(false);
        mutate("http://localhost:8000/tasks");
      })();
    }
  };
  const handleCloseDialog = () => {
    setTitle("");
    setStatus("");
    setDescription("");
    setBlog(null);
    setShowModal(false);
  };
  return (
    <div>
      <Dialog
        open={showModal}
        handler={() => setShowModal(false)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          {buttonType === "edit"
            ? "Edit A Blog"
            : buttonType === "delete"
            ? "Delete A Blog"
            : "Add New A Blog"}
        </DialogHeader>
        <DialogBody>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Title
            </Typography>
            <Input
              readOnly={buttonType === "delete"}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              label="Title"
              placeholder="Write here!"
            />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Status
            </Typography>
            <Input
              readOnly={buttonType === "delete"}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              label="Status"
              placeholder="Write here!"
            />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Content
            </Typography>
            <Textarea
              readOnly={buttonType === "delete"}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              label="Content"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleCloseDialog()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {buttonType !== "view" && (
            <Button
              variant="gradient"
              color={
                buttonType === "edit"
                  ? "amber"
                  : buttonType === "delete"
                  ? "red"
                  : "green"
              }
              onClick={() => handleSubmit()}
            >
              <span>
                {buttonType === "edit"
                  ? "Edit"
                  : buttonType === "delete"
                  ? "Delete"
                  : "Save"}
              </span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default memo(DialogDefault);
