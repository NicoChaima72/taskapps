const { auth } = require("../controllers");
const { AuthRequest } = require("../requests");
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (router) => {
  router.get("/login", authMiddleware.isNotAuthenticated, auth.showLoginForm);

  router.post(
    "/login",
    authMiddleware.isNotAuthenticated,
    AuthRequest.login,
    auth.login
  );

  router.get(
    "/register",
    authMiddleware.isNotAuthenticated,
    auth.showRegistrationForm
  );

  router.post(
    "/register",
    authMiddleware.isNotAuthenticated,
    AuthRequest.register,
    auth.register
  );

  router.get(
    "/register/activate/:token",
    authMiddleware.isNotAuthenticated,
    auth.activate
  );

  router.post("/logout", authMiddleware.isAuthenticated, auth.logout);

  router.get(
    "/password/reset",
    authMiddleware.isNotAuthenticated,
    auth.showLinkRequestForm
  );

  router.put(
    "/password/reset",
    authMiddleware.isNotAuthenticated,
    AuthRequest.linkRequest,
    auth.sendResetLinkEmail
  );

  router.get(
    "/password/reset/:token",
    authMiddleware.isNotAuthenticated,
    auth.showResetForm
  );

  router.put(
    "/password/reset/:token",
    authMiddleware.isNotAuthenticated,
    AuthRequest.resetPassword,
    auth.reset
  );

  // BUG: abrir reset password desde otra cuenta ya iniciada

  return router;
};
