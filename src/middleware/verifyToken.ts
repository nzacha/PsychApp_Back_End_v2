import express from "express";
import { newErrorResponse } from "../config/response";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../../app";
import _ from "lodash";

export function verifyToken(request: express.Request, response: express.Response, next: express.NextFunction){
    const token = request.headers["x-access-token"];
    if (!token) {
      return response.status(403).json(newErrorResponse("No token provided"));
    }

    try {
      const decoded = jwt.verify(token as string, SECRET_KEY);
      _.set(request, 'user', decoded);
    } catch (err) {
      console.error(err);
      return response.status(401).send("Invalid Token");
    }
    return next();
  };
  