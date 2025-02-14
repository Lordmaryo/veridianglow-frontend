export interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LogInProps {
  email: string;
  password: string;
}

export interface useAuthStoreProps {
  user: UserResponse | null;
  loading: boolean;
  checkingAuth: boolean;
  signUp: (props: SignUpProps) => void;
  login: (props: LogInProps) => void;
    checkAuth: () => void;
  //   logout: () => void;
  //   refreshToken: () => Promise<void>;
  //   verifyEmail: (code: string) => Promise<void>;
  //   forgotPassword: (email: string) => Promise<void>;
  //   resetPassword: (
  //     token: string,
  //     password: string,
  //     confirmPassword: string
  //   ) => Promise<void>;
}

export interface UserResponse {
  message?: string;
  status: string;
  userId: string;
  firstName: string;
  role: Roles;
  isVerified: boolean;
}

export enum Roles {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}
