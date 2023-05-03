const express = require("express");
const router = express.Router();

const contacts = [
    { id: "1", username: "Felix", surname: "Brown", email: "felix@test.com" },
    { id: "2", username: "Sonya", surname: "Redhead", email: "sonya@test.com" },
    {
        id: "3",
        username: "Conan",
        surname: "Barbarian",
        email: "conan@test.com",
    },
];

/* GET users listing. */
router.get("/", function (request, response, next) {
    // response.send("respond with a resource");
    response.json(contacts);
});

router.get("/:id", function (request, response, next) {
    const { id } = request.params;
    const contact = contacts.filter(item => item.id === id);
    response.json(contact);
});

module.exports = router;
