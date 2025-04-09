import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabase.config';

const supabaseUrl = supabaseConfig.url;
const supabaseKey = supabaseConfig.anonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
