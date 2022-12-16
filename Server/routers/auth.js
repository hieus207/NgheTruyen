import express from 'express';
import { login, logout, refreshToken } from '../controllers/user.js';

const router = express.Router();

router.post('/login', login)
router.post('/logout', logout)
router.post('/refreshToken', refreshToken)



export default router