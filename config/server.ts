export const config = {
  SERVER: {
    HOST: process.env.SERVER_HOST || "localhost",
    PORT: process.env.SERVER_PORT,
    PROTOCOL: process.env.SERVER_PROTOCOL || "http",
  },
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT || 3306,
    PASSWORD: process.env.DB_PASSWORD || "",
    NAME: process.env.DB_NAME || "react-blog",
  },
};
