import { Request, Response } from 'express';
import { userRepository } from '../repositories/user.repository';

export const list = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const allUsers = await userRepository.findAll();
    
    const start = (page - 1) * size;
    const paginatedUsers = allUsers.slice(start, start + size).map(({ password, ...u }: any) => u);
    
    res.json(paginatedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error listing users' });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await userRepository.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userWithoutPassword }: any = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error getting user' });
  }
};

