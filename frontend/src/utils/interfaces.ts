export interface userToVerify {
  email: string,
  password: string
}

export interface userToRegister {
  username: string,
  password: string,
  email: string,
  phone?: string,
  direction?: string
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

export interface RecoverPassword {
  email: string
}

export interface RecoverResponde {
  data: {
    message: string;
  };
  status: number;
  statusText: string;
  headers: {
    "content-length": string;
    "content-type": string;
  };
}

export interface Token {
  token: string
}

export interface TokenResponse {
  data: {
    message: string;
    valid: boolean;
  };
  status: number;
  statusText: string;
  headers: {
    "content-length": string;
    "content-type": string;
  };
}

export interface NewPassword {
  newPassword: string,
  repeatNewPassword?: string
}

export interface UpdatePassword {
  password: string,
  token: string
}

export interface NewPasswordResponse {
  data: {
    message: string;
  };
  status: number;
  statusText: string;
  headers: {
    "content-length": string;
    "content-type": string;
  };
}

export interface NewService {
  
}