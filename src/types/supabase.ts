export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          identification: string;
          first_name: string;
          last_name: string;
          rating: number;
          comments?: string;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
      };
    };
  };
}