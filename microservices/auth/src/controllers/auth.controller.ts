import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { AUTH_TOKEN_MAX_AGE } from '@repo/domain';
import type {
  UserWithPassword, 
  CreateUserDbInput,
  RegisterDto,
  LoginDto
} from '@repo/domain';
import { userRepository } from '../repositories/user.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, login } = req.body as RegisterDto;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password and name are required' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await userRepository.create({ 
      email, 
      password: hashedPassword, 
      name,
      login: login || email.split('@')[0]
    } as CreateUserDbInput) as UserWithPassword;
    
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('[AuthService] Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginDto;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await userRepository.findByEmail(email) as UserWithPassword | null;
    
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: AUTH_TOKEN_MAX_AGE });
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('[AuthService] Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const validate = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    res.json({ valid: true, user: decoded });
  } catch (error) {
    console.error('[AuthService] Token validation failed:', error instanceof Error ? error.message : error);
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
};
