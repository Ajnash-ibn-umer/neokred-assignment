import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../apis/apis"
interface useHookParams {
  method: "post" | "get" | "patch" | "put",
  url: string,
  body?: any,
  header?: any
}

const fetch = async ({ method, url, body, header }: useHookParams) => {
  try {
    console.log({body});
    
    const data = await axios({ method, url: `${baseUrl}${url}`, data: body,headers:{"authorization":localStorage.getItem("token") ?? ""}});
    
    console.log({data});
    
    return {data}
  } catch (error: any) {
    console.log("error from axios",error);
    if(error.response.status===401){
      return {
        error:error,
        auth:false
      }
    }
    return {error}
  }
};


export default fetch;