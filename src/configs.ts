const appId = "rYAutyUJKH6i6DfUN0bqVx2x";
const appKey = "IJ9du47XAcJXjVz3BFecR3WV";
const playServer = "https://ryautyuj.lc-cn-n1-shared.com";

const clientEngineServer =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://client-engine-server.leanapp.cn";

export const configs = {
  appId,
  appKey,
  playServer,
  clientEngineServer,
};
