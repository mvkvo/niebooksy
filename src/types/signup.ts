export type SignState =
  | {
      errors?: {
        username?: string[];
        name?: string[];
        surname?: string[];
        email?: string[];
        password?: string[];
        repassword?: string[];
      };
      values?: {
        username?: string;
        name?: string;
        surname?: string;
        email?: string;
        password?: string;
        repassword?: string;
      };
      success: boolean;
      message?: string;
    }
  | undefined;
