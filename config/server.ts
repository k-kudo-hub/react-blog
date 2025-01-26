export const config = {
  SERVER: {
    HOST: process.env.NEXT_PUBLIC_SERVER_HOST || "localhost",
    PORT: process.env.NEXT_PUBLIC_SERVER_PORT,
    PROTOCOL: process.env.NEXT_PUBLIC_SERVER_PROTOCOL || "http",
  },
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT || 5432,
    PASSWORD: process.env.DB_PASSWORD || "",
    NAME: process.env.DB_NAME || "react-blog",
  },
};
