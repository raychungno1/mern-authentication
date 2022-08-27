import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface IProps {
  label: string;
  type: string;
  autoComplete: string;
  autoFocus?: boolean;
  startAdornment: JSX.Element;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  setShowPassword?: (value: React.SetStateAction<boolean>) => void;
  isLoading: boolean;
}

const Input = ({
  label,
  type,
  autoComplete,
  autoFocus = false,
  startAdornment,
  value,
  onChange,
  showPassword,
  setShowPassword,
  isLoading,
}: IProps) => {
  return (
    <TextField
      name={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      label={label}
      type={
        type === "password" || type === "confirmPassword"
          ? showPassword
            ? "text"
            : "password"
          : type
      }
      placeholder={label}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      disabled={isLoading}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: (type === "password" || type === "confirmPassword") &&
          setShowPassword && (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
      }}
    />
  );
};

export default Input;
