/**
 * * GLOBAL * */
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/**
 * *  DATABASE * */
process.env.DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
process.env.DATABASE_USER = process.env.DATABASE_USER || "root";
process.env.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
process.env.DATABASE_NAME = process.env.DATABASE_NAME || "taskapps";

/**
 * *  MAIL * */
process.env.MAIL_HOST = "smtp.mailtrap.io";
process.env.MAIL_PORT = 2525;
process.env.MAIL_USER = "76b9411170ffcb";
process.env.MAIL_PASS = "b9f36d3e2daf65";
