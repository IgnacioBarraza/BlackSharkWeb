export interface userToVerify {
  email: string,
  password: string
}

export interface LoginResponse {
  data: {
    message: string;
    token: string;
    username: string;
    tipo_user: string;
  };
  status: number;
  statusText: string;
  headers: {
    "content-length": string;
    "content-type": string;
  };
}