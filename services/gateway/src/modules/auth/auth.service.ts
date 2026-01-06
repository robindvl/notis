import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:5001/auth';

  async validateToken(token: string) {
    try {
      const response = await fetch(`${this.authServiceUrl}/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Gateway] Auth validation failed with status ${response.status}: ${errorText}`);
        return null;
      }

      const data = (await response.json()) as { user: any };
      return data.user;
    } catch (error) {
      console.error('Error validating token:', error);
      return null;
    }
  }
}

