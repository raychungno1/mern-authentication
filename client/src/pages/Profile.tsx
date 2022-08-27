import { CircularProgress, Divider } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { toast } from "react-toastify";
import Button from "../common/components/Button";
import Input from "../common/components/Input";
import { useAppDispatch, useAppSelector } from "../common/hooks/useAppRedux";
import { useUpdateProfileMutation } from "../store/auth/auth.api";
import { authenticate } from "../store/auth/auth.slice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(({ auth }) => auth);
  const [fName, lName] = auth?.user.name.split(" ") || ["", ""];

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    firstName: fName,
    lastName: lName,
  });
  const { firstName, lastName } = formData;
  const hasChanged = firstName !== fName || lastName !== lName;

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (firstName && lastName) {
      if (hasChanged) {
        try {
          const data = await updateProfile({
            name: `${firstName} ${lastName}`,
          }).unwrap();
          toast.success(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          dispatch(authenticate({ token: `${auth?.token}`, user: data.user }));
        } catch (error: any) {
          toast.error(
            error.data.error || "There was an error registering. Try again.",
            {
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        }
      } else {
        toast.error("Fields not changed.", {
          toastId: "not-changed",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error(
        <div>
          <p>Please fill all fields. Missing:</p>
          <ul className="list-disc ml-4 text-xs">
            {!firstName && <li>First Name</li>}
            {!lastName && <li>Last Name</li>}
          </ul>
        </div>,
        { toastId: "missing-data", position: toast.POSITION.BOTTOM_RIGHT }
      );
    }
  };

  return (
    <div className="container mx-auto px-4 my-8">
      {auth && (
        <>
          <p className="text-4xl font-bold mb-6">
            Welcome, <span>{auth.user.name.split(" ")[0]}!</span>
          </p>
          <p className="text-xl font-bold mb-4">Profile Picture</p>
          <div className="p-6 bg-white rounded-2xl shadow-lg mb-6">
            {auth.user.picture ? (
              <img
                src={auth.user.picture}
                alt="Profile Photo"
                className="w-24 h-24 rounded-full object-contain"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#9bc148] flex items-center justify-center text-white text-7xl">
                <p className="mb-2">{auth.user.name.charAt(0)}</p>
              </div>
            )}
          </div>
          <p className="text-xl font-bold">Profile Settings</p>
          <p className="mb-4">Change your account details</p>
          <form
            className="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-lg"
            onSubmit={handleUpdateSubmit}
          >
            <div className="flex gap-4">
              <p className="font-bold w-1/5 min-w-[20%]">Email</p>
              <p>{auth.user.email}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold w-1/5 min-w-[20%]">First Name</p>
              <Input
                label="First Name"
                type="firstName"
                autoComplete="given-name"
                startAdornment={
                  <FaUserCircle className="text-2xl text-black" />
                }
                value={firstName}
                onChange={handleChange}
                isLoading={isLoading}
                autoFocus
              />
            </div>
            <div className="flex gap-4">
              <p className="font-bold w-1/5 min-w-[20%]">Last Name</p>
              <Input
                label="Last Name"
                type="lastName"
                autoComplete="family-name"
                startAdornment={
                  <FaUserCircle className="text-2xl text-black" />
                }
                value={lastName}
                onChange={handleChange}
                isLoading={isLoading}
              />
            </div>
            <button
              className={`ml-auto w-max ${
                isLoading || !hasChanged ? "opacity-80" : ""
              }`}
              disabled={isLoading || !hasChanged}
            >
              <Button className="text-center flex items-center justify-center">
                {isLoading ? (
                  <CircularProgress
                    className="my-1"
                    size={32}
                    sx={{ color: "grey.200" }}
                  />
                ) : (
                  <p className="px-8 py-2">Save Changes</p>
                )}
              </Button>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
