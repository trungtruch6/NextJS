"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
interface LoginResponse {
  accessToken: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/signin", {
        username,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("accessToken", `${response.data.accessToken}`);
        Swal.fire("Success", `Welcome to ${username}`, "success");
        router.push("/");
      }
      console.log("Sign in successful", response.data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-3/4 h-auto flex justify-center">
          <div className="border border-blue-gray-50 p-5 shadow-md rounded-md">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Sign in
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to login.
              </Typography>
              <form
                onSubmit={handleLoginSubmit}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              >
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Name
                  </Typography>
                  <Input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                    >
                      I agree the
                      <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        &nbsp;Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Button type="submit" className="mt-6" fullWidth>
                  Sign in
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
