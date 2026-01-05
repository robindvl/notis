import { Role } from '../entities/role';

export interface RoleRepository {
  findById(id: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  create(role: Omit<Role, 'id'>): Promise<Role>;
  update(id: string, role: Partial<Role>): Promise<Role>;
  delete(id: string): Promise<void>;
}

