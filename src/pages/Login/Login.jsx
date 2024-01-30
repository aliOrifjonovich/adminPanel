import React from "react";
import styles from "./Login.module.scss";
import Label from "Components/Label/Label";
import Input from "Components/Form/Input/Input";
import MainButton from "Components/MainButton/MainButton";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    if (data.username === "alisher" && data.password === "alisher") {
      localStorage.setItem("token", true);
      window.location.reload();
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__image} />
      <div className={styles.login__form}>
        <form
          className={styles.login__form__content}
          onSubmit={handleSubmit(onSubmit)}
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
                validate: {
                  validateInput(username) {
                    if (username !== "alisher") return "Invalid username";
                  },
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
                validate: {
                  validateInput(password) {
                    if (password !== "alisher") return "Invalid password";
                  },
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
