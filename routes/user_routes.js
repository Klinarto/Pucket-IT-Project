const express = require('express');
const login_controller = require('../controllers/login_controller')
const router = express.Router();
const passport = require('passport');

// router.post('/', login_controller.ensureVerified);

router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    error: [{ msg: "Invalid Credentials" }],
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    error: [{ msg: "Invalid Credentials" }],
                });
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360_000 },
                (error, token) => {
                    if (error) throw error;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error...");
        }
    }
);

module.exports = router;