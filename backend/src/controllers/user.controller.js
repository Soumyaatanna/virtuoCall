import { User } from '../models/usermodel.js';
import bcrypt,{ hash } from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username }).select("+password"); // Only search by username

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid password" });
        }

        const token = await hash(user._id.toString(), 10); // Or better: use JWT
        user.token = token;
        await user.save();

        res.status(httpStatus.OK).json({ message: "Login successful", token });
    } catch (e) {
        console.error("Login error:", e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};


const register = async (req, res) => {
    const { name,username, password } = req.body;
    try{
        const exist_user = await User.findOne({ username });
        if (exist_user) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name:name,
            username:username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: "User registered successfully" });
    }
    catch(e){
         res.json({ message: "Something went wrong" });
    }
} 
export { login, register };