export interface User {
  id: string;
  email: string;
  role: string;
  phoneNumber?: string | null;
}