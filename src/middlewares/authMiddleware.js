const middleware = {}

middleware.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
        // req.flash('redirectURL', 'Guardar en input hidden y en el controlador verificar si está y redireccionar')
		// req.flash("error", "No estás autenticado");
		res.redirect("/login");
	}
};

middleware.isNotAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/");
	}
};

module.exports = middleware