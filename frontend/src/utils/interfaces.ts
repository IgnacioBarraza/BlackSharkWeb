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