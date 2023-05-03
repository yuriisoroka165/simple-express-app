const express = require("express");
const router = express.Router();

// виконується рендер одного шаблону
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

// обробник маршруту /login 
router.post("/login", (request, response, next) => {
    const { email, password } = request.body;
    // "response" - це назва шаблону з директорії views
    response.render("response", {
        title: "Simple express app",
        email,
        password,
    });
});

module.exports = router;
