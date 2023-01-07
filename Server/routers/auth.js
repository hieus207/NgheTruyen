import express from 'express';
import { login, logout, refreshToken, register } from '../controllers/user.js';

const router = express.Router();

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)
router.post('/refreshToken', refreshToken)



export default router