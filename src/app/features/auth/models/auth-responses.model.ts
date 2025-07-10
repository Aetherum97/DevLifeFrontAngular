export interface LoginResponses {
  userId: string;
  userName: string;
  email: string;
  accessToken: string;
  expirationTime: number;
}

export interface AuthenticateResponses {
  success: boolean;
  accessToken: string;
}

export interface AuthResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
