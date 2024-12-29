export interface Customer {
  id: string;
  identification: string;
  first_name: string;
  last_name: string;
  rating: number;
  comments?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
}