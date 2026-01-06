import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AUTH_TOKEN_MAX_AGE } from '@repo/domain';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

// In a real app, you'd use a database.
const users: any[] = [];

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    console.log('[AuthService] Registering user:', email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), email, password: hashedPassword, name };
    users.push(user);
    
    console.log('[AuthService] User registered successfully. Total users:', users.length);
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('[AuthService] Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log('[AuthService] Generating token with max age:', AUTH_TOKEN_MAX_AGE);
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: AUTH_TOKEN_MAX_AGE });
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const validate = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    console.log('[AuthService] No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('[AuthService] Token validated successfully for user:', (decoded as any).userId);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    console.error('[AuthService] Token validation failed:', error instanceof Error ? error.message : error);
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
};
