const { auth } = require("../controllers");
const { AuthRequest } = require("../requests");

module.exports = (router) => {
	router.get("/login", auth.showLoginForm);

	router.post("/login", auth.login);

	router.get("/register", auth.showRegistrationForm);

	router.post("/register", auth.register);

	router.get("/register/activate/:token", auth.activate);

	router.post("/logout", auth.logout);

	router.get("/password/reset", auth.showLinkRequestForm);

	router.put("/password/reset", auth.sendResetLinkEmail);

	router.get("/password/reset/:token", auth.showResetForm);

	router.patch("/password/reset/:token", AuthRequest.resetPassword, auth.reset);

	return router;
};
