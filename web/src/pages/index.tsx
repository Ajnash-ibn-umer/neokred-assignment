import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logo from "../../public/logo.svg";
import avatar from "../../public/Avatar.svg";

import fetch from "@/hooks/Fetch";
import { PROFILE } from "@/apis/apis";
import moment from "moment";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch({ method: "get", url: PROFILE });
    console.log({ response });
    setData(response.data?.data.user);
    if (response.auth === false) router.push("/login");
  };
const logout=()=>{
  localStorage.clear()
  router.push("/login");
}
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.navBar}>
          <div className={styles.logoWrapper}>
            <Image alt="logo" width={"100"} height={"50"} src={logo} />
          </div>
          <div className={styles.userInfo}>
            <p>{data?.fullName ?? ""}</p>
            <span onClick={logout}>Logout</span>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.avatar}>
            <Image alt="avatar" src={avatar} />
          </div>
          <div className={styles.profileInfoContainer}>
            <div className={styles.infoTitle}>
              <p>Profile</p>
            </div>
            <div className={styles.userInformation}>
              <div className={styles.singleInfoWrapper}>
                <p>Name</p>
                <p>{data?.fullName ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>Email</p>
                <p>{data?.emailAddress ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>DOB</p>
                <p>{moment(data?.dateOfBirth).format("DD/MM/YYYY") ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>Phone number</p>
                <p>{data?.phoneNumber ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>Address</p>
                <p>{data?.address ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>City</p>
                <p>{data?.city ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>State</p>
                <p>{data?.state ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>ZIP code</p>
                <p>{data?.zipCode ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>Country</p>
                <p>{data?.country ?? ""}</p>
              </div>
              <div className={styles.singleInfoWrapper}>
                <p>Security</p>
                <p>
                  {data?.securityQuestion ?? ""}
                  <br />
                  {data?.securityAnswer ?? ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
