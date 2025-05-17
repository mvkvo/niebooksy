export type SignState =
  | {
      errors?: {
        name?: string[];
        surname?: string[];
        email?: string[];
        password?: string[];
        repassword?: string[];
      };
      success: boolean;
      message?: string;
    }
  | undefined;
