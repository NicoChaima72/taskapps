/**
 * * PORT * */
process.env.PORT = process.env.PORT || 3000;

/**
 * *  ENVIRONMENT * */
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/**
 * *  DATABASE CONNECTION * */
if (process.env.NODE_ENV === "dev") {
	process.env.MONGO_URI = "mongodb://127.0.0.1:27017/chaimastasks";
}
