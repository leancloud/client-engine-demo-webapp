import { Region } from "@leancloud/play";

export const APP_ID = "rYAutyUJKH6i6DfUN0bqVx2x";
export const APP_KEY = "IJ9du47XAcJXjVz3BFecR3WV";
export const REGION = Region.NorthChina;

export const CLIENT_ENGINE_SERVER =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://client-engine-dev.leanapp.cn";
