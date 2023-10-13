import { Request, Response, Router } from "express";

export interface RequestExpress extends Request{
uid?:string,
email?:string,
name?:string
}