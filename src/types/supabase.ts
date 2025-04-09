export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          preferred_currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferred_currency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferred_currency?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      assets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          value: number;
          category: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          name: string;
          value: number;
          category: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          value?: number;
          category?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      zakat_calculations: {
        Row: {
          id: string;
          user_id: string;
          calculation_date: string;
          total_assets: number;
          nisab_value: number;
          zakat_amount: number;
          currency: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          calculation_date?: string;
          total_assets: number;
          nisab_value: number;
          zakat_amount: number;
          currency?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          calculation_date?: string;
          total_assets?: number;
          nisab_value?: number;
          zakat_amount?: number;
          currency?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      gold_prices: {
        Row: {
          id: string;
          price_per_gram: number;
          currency: string;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          price_per_gram: number;
          currency?: string;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          price_per_gram?: number;
          currency?: string;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};