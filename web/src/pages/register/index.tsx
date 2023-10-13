import Head from "next/head";
import Image from "next/image";
import style from "./style.module.css";
import Layout from "@/components/formLayout";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";
import { REGISTER, baseUrl } from "@/apis/apis";
import {useRouter} from "next/router"
import { useState } from "react";
import fetch from "@/hooks/Fetch";
import Link from "next/link";

export default function Register() {
    const [errorState,setErrorState]=useState("")
const router=useRouter()


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
      fullName:"",
      dateOfBirth:"",
      phoneNumber:"",
      confirmPassword:"",
      securityAnswer:"",
      address:"",
      city:"",
      state:"",
      zipCode:"",
      country:""
     
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
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/,
        message: "Password must contain minimum length of 8 characters, at least one uppercase letter and one digit",
      },
     
    },
    fullName:{
        required: "This field is required.",
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: " You can only use Alphabetic characters",
          },
          maxLength: {
            value: 50,
            message: "Please enter a value that contains at maximum 50 characters.",
          },
          
    },
    dateOfBirth:{
        required: "This field is required.",
    },
    confirmPassword:{
        required: "This field is required.",
        validate:(value:string)=>value===watch("password") || "Password do not match"
    },
    phoneNumber:{
        required: "This field is required.",
        pattern: {
            value: /^\d{10}$/,
            message: " Enter valid phone Number",
          },
    },
      securityAnswer:{
        required: "This field is required.",
        maxLength:{
            value:100,
            message:"maximum 100 words can use "
        }
    },
      address:{
        required: "This field is required.",
    },
      city:{
        required: "This field is required.",
        maxLength:{
            value:50,
            message:"Maximum 50 words can use"
        }
    },
      state:{
        required: "This field is required.",
    },
      zipCode:{
        required: "This field is required.",
        pattern: {
            value: /^\d{6}$/,
            message: " Enter valid Zip code",
          },
    },
      country:{
        required: "This field is required.",
    },
    
  };


  const onSubmit = async (value: any) => {
    try {
      setErrorState("");
value.securityQuestion=`What is your school Name ?`

      console.log({ value });
      const formData = new FormData();
  for (const key in value) {
    if (value[key] !== "") {
      formData.append(key, value[key]);
    }
  }
      const { error, data } = await fetch({
        method: "post",
        url: REGISTER,
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
        <title>Register</title>
        <meta name="description" content="register" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Layout>
          <div className={style.formContainer}>
            <div className={style.formSec}>
              <div className={style.titleSection}>
                <span>Welcome</span>
                <h4>Sign up</h4>
              </div>
              {errorState ? (
                <div className={style.errmsg}>{errorState}</div>
              ) : null}
              <form  onSubmit={handleSubmit(onSubmit)}
                autoComplete="off" className={style.form} >
                {/*  */}
                <div className={style.topFormSec}>
                  <div className={style.formGroup}>
                    <label htmlFor="">
                      Full Name 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="fullName"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="text"
                          placeholder=""
                          name="fullName"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                      rules={fieldRules.fullName}
                    />
                    </div>
                    {errors?.fullName ? (
                    <div className={style.errmsg}>
                      {errors?.fullName?.message}
                    </div>
                  ) : null}
                  </div>
                  {/*  */}
                  <div className={style.formGroup}>
                    <label htmlFor="">
                      Email 
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
                  {/*  */}
                  <div className={style.formGroup}>
                    <label htmlFor="">
                      Date of Birth{" "}
                      
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="dateOfBirth"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="date"
                          placeholder=""
                          name="dateOfBirth"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                      rules={fieldRules.dateOfBirth}
                    />
                    </div>
                    {errors?.dateOfBirth ? (
                    <div className={style.errmsg}>
                      {errors?.dateOfBirth?.message}
                    </div>
                  ) : null}
                  </div>
                  {/*  */}
                  <div className={style.formGroup}>
                    <label htmlFor="">
                      Password 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="password"
                          value={value}
                          name="password"
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
                  {/*  */}
                  <div className={style.formGroup}>
                    <label htmlFor="">
                      Phone Number 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="Password"
                          value={value}
                          name="phoneNumber"
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.phoneNumber}
                    />
                    </div>
                    {errors?.phoneNumber ? (
                    <div className={style.errmsg}>
                      {errors?.phoneNumber?.message}
                    </div>
                  ) : null}
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="">
                      Confirm Password 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="confirmPassword"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="Password"
                          value={value}
                          name="confirmPassword"
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.confirmPassword}
                    />
                    </div>
                    {errors?.confirmPassword ? (
                    <div className={style.errmsg}>
                      {errors?.confirmPassword?.message}
                    </div>
                  ) : null}
                  </div>
                </div>
                <div className={style.topFormSec} >
                <div className={style.formGroup}>
                    <label htmlFor="">
                      Security Question 
                    </label>
                    <p>What is your School Name ?</p>

                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="securityAnswer"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="text"
                          value={value}
                          name="securityAnswer"
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.securityAnswer}
                    />
                    </div>
                    {errors?.securityAnswer ? (
                    <div className={style.errmsg}>
                      {errors?.securityAnswer?.message}
                    </div>
                  ) : null}
                  </div>
                </div>
                <div className={style.bottomFormSec} >
                <div className={style.formGroup}>
                    <label htmlFor="">
                     Address 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="address"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="text"
                          value={value}
                          name="address"
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.address}
                    />
                    </div>
                    {errors?.address ? (
                    <div className={style.errmsg}>
                      {errors?.address?.message}
                    </div>
                  ) : null}
                  </div>
                  <div className={style.addressContainer} >
                  <div className={style.formGroup}>
                    <label htmlFor="">
                     City 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="city"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="text"
                          value={value}
                          name="city"
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.city}
                    />
                    </div>
                    {errors?.city ? (
                    <div className={style.errmsg}>
                      {errors?.city?.message}
                    </div>
                  ) : null}
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="">
                     State 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="state"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="text"
                          value={value}
                          name="state"
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.state}
                    />
                    </div>
                    {errors?.state ? (
                    <div className={style.errmsg}>
                      {errors?.state?.message}
                    </div>
                  ) : null}
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="">
                     Zip code 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="zipCode"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="text"
                          value={value}
                          name="zipCode"
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.zipCode}
                    />
                    </div>
                    {errors?.zipCode ? (
                    <div className={style.errmsg}>
                      {errors?.zipCode?.message}
                    </div>
                  ) : null}
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="">
                     Country 
                    </label>
                    <div className={style.inputWrapper}>
                    <Controller
                      control={control}
                      name="country"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="text"
                          value={value}
                          name="country"
                          onChange={onChange}
                          placeholder=""
                        />
                      )}
                      rules={fieldRules.country}
                    />
                    </div>
                    {errors?.country ? (
                    <div className={style.errmsg}>
                      {errors?.country?.message}
                    </div>
                  ) : null}
                  </div>  
                  </div>
                </div>
                <div className={style.formGroup}>
                <button type="submit">Sign up</button>
              </div>
              </form>
             
              <div className={style.signUpRedirection}>
                <p>
                Already have an account ? <span><Link href={"/login"}>Login</Link></span>{" "}
                </p>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
