import React from "react";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import Label from "Components/Label/Label";
import Input from "Components/Form/Input/Input";
import MainButton from "Components/MainButton/MainButton";
<<<<<<< HEAD

const Login = () => {
=======
import { useNavigate } from "react-router-dom";
import { UseAuth } from "services/auth.service";

const Login = () => {
  const navigate = useNavigate();
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
      localStorage.setItem("token", res.accessToken);
      reset();
      navigate("/main");
      window.location.reload();
    },
  });

  const onSubmit = (data) => {
    authMutate(data);
  };
>>>>>>> refs/remotes/origin/main
  return (
    <div className={styles.login}>
      <div className={styles.login__image} />
      <div className={styles.login__form}>
        <form
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
