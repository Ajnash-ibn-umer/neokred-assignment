import Head from "next/head";
import Image from "next/image";
import style from "./style.module.css";

export default function Layout({children}:any) {
  return (
    <>
     
        <div className={style.container}>
            {/* left section */}
          <div className={style.leftSec}>
            <div className={style.bannerSec}></div>
          </div>
          {/* right section */}
          <div className={style.rightSec}>
            {children}
          </div>
        </div>
     
    </>
  );
}
