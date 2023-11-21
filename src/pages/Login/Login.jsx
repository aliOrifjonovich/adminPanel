import React from "react";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import Label from "Components/Label/Label";
import Input from "Components/Form/Input/Input";
import MainButton from "Components/MainButton/MainButton";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/alert/alert.thunk";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: authMutate } = UseAuth({
    onSuccess: (res) => {
      console.log("res", res);
      // localStorage.setItem("first_name", res.first_name);
      // localStorage.setItem("last_name", res.last_name);
      // localStorage.setItem("token", res.token);
      // localStorage.setItem("user_id", res.user_id);
      // localStorage.setItem("username", res.username);
      // dispatch(showAlert("You successfully entered", "success"));
      // reset();
      // navigate("/main");
      // window.location.reload();
    },
    onError: (err) => {
      console.log("err", err);
      // dispatch(showAlert(err.data?.message, "error"));
    },
  });

  const onSubmit = (data) => {
    authMutate(data);
  };
  return (
    <div className={styles.login}>
      <div className={styles.login__image} />
      <div className={styles.login__form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.login__form__content}
        >
          <Label label="Name*">
            <Input
              control={control}
              placeholder="Enter name"
              name="username"
              validation={{
                required: {
                  value: true,
                  message: "required",
                },
              }}
              errors={errors}
            />
          </Label>
          <Label label="Password*">
            <Input
              control={control}
              placeholder="Enter password"
              name="password"
              validation={{
                required: {
                  value: true,
                  message: "required",
                },
              }}
              typePassword
              errors={errors}
            />
          </Label>

          <MainButton
            type="submit"
            text="Submit"
            fullWidth
            variant="contained"
            loading={false}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
