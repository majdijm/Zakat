import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";
import { supabaseConfig } from '../config/supabase.config';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  supabaseConfig.url,
  supabaseConfig.anonKey
);
