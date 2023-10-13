import Head from "next/head";
import Image from "next/image";
import style from "./style.module.css";
import Layout from "@/components/formLayout";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";
import Fetch from "@/hooks/Fetch";
import { LOGIN, baseUrl } from "@/apis/apis";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [errorState, setErrorState] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const fieldRules = {
    emailAddress: {
      required: "This field is required.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: " Please enter a valid email address",
      },
    },
    password: {
      required: "This field is required.",
      minLength: {
        value: 8,
        message: "Please enter a value that contains at least 8 characters.",
      },
      maxLength: {
        value: 30,
        message: "Please enter a value within 30 characters.",
      },
    },
  };

  const onSubmit = async (value: any) => {
    try {
      setErrorState("");
      console.log({ value });
      const formData = new FormData();
      formData.append("emailAddress", value?.emailAddress);
      formData.append("password", value?.password);
      console.log("form data", { formData });

      const { error, data } = await Fetch({
        method: "post",
        url: LOGIN,
        body: value,
      });

      if (error) setErrorState(error?.response?.data?.msg);

      if (data && data?.data) {
        localStorage.setItem("token", data?.data.token);
        router.push("/");
      }
    } catch (error) {
      setErrorState(error as string);
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Layout>
          <div className={style.formContainer}>
            {/* title section */}
            <div className={style.titleSection}>
              <span>Welcome</span>
              <h4>Login</h4>
            </div>
            <div className={style.formSec}>
              {errorState ? (
                <div className={style.errmsg}>{errorState}</div>
              ) : null}
              {/* form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className={style.form}
              >
                {/* form */}
                <div className={style.formGroup}>
                  <label htmlFor="">
                    Email <span className={style.requiredIndic}>*</span>
                  </label>
                  <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="emailAddress"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="email"
                          placeholder=""
                          name="emailAddress"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                      rules={fieldRules.emailAddress}
                    />
                  </div>
                  {errors?.emailAddress ? (
                    <div className={style.errmsg}>
                      {errors?.emailAddress?.message}
                    </div>
                  ) : null}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="">
                    Password <span className={style.requiredIndic}>*</span>
                  </label>
                  <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="Password"
                          value={value}
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.password}
                    />
                  </div>
                  {errors?.password ? (
                    <div className={style.errmsg}>
                      {errors?.password?.message}
                    </div>
                  ) : null}
                </div>
                <div className={style.formGroup}>
                  <span>Forgot Password?</span>
                </div>
                <div className={style.formGroup}>
                  <button type="submit">Login</button>
                </div>
              </form>
              <div className={style.signUpRedirection}>
                <p>
                  Don’t have an account? <span><Link href={'/register'}>Sign Up</Link></span>{" "}
                </p>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
