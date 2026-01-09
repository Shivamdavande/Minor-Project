const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

function sendToken(res, id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "none"
    })

    return token
}

async function registerUser(req, res) {
    try {
        const { fullName, email, password } = req.body

        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        })

        sendToken(res, user._id)

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid email or password" })

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(400).json({ message: "Invalid email or password" })

        sendToken(res, user._id)

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

function logoutUser(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({ message: "User logged out successfully" })
}

// --- Food Partner APIs (Same Pattern) ---

async function registerFoodPartner(req, res) {
    try {
        const { name, email, password, phone, address, contactName } = req.body

        const exists = await foodPartnerModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ message: "Food partner account already exists" })
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPass,
            phone,
            address,
            contactName
        })

        sendToken(res, foodPartner._id)

        res.status(201).json({
            message: "Food partner registered successfully",
            foodPartner
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body

        const fp = await foodPartnerModel.findOne({ email })
        if (!fp) return res.status(400).json({ message: "Invalid email or password" })

        const valid = await bcrypt.compare(password, fp.password)
        if (!valid) return res.status(400).json({ message: "Invalid email or password" })

        sendToken(res, fp._id)

        res.status(200).json({
            message: "Food partner logged in successfully",
            foodPartner: {
                _id: fp._id,
                email: fp.email,
                name: fp.name
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({ message: "Food partner logged out successfully" })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}
