export interface LoginResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  export interface UserResponse {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }