import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MTYxNjY1NTEsImV4cCI6MTkzMTc0MjU1MX0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for sorting and filtering
export interface SortOption {
  column: string;
  direction: 'asc' | 'desc';
}

// Generic error handler
const handleError = (error: any, fallbackData: any = null) => {
  console.error('Supabase error:', error);
  return { data: fallbackData, error };
};

// Generic fetch function with error handling and fallback
export async function fetchData<T>(tableName: string, query: any, fallbackData: T[] = []) {
  try {
    const result = await query;
    if (result.error) throw result.error;
    return { data: result.data as T[], error: null };
  } catch (error) {
    return handleError(error, fallbackData);
  }
}

// Get all items for a user with optional sorting
export async function getUserItems<T>(tableName: string, userId: string, sortOptions: SortOption[] = [], fallbackData: T[] = []) {
  try {
    console.log(`Fetching items from ${tableName} for user ${userId}`);
    
    let query = supabase
      .from(tableName)
      .select('*')
      .eq('user_id', userId);
    
    // Apply sorting if provided
    sortOptions.forEach(option => {
      query = query.order(option.column, { ascending: option.direction === 'asc' });
    });
    
    const result = await query;
    
    if (result.error) {
      console.error(`Error fetching items from ${tableName}:`, result.error);
      return { data: fallbackData, error: result.error };
    }
    
    console.log(`Successfully fetched ${result.data?.length || 0} items from ${tableName}`);
    return { data: result.data as T[] || [], error: null };
  } catch (error) {
    console.error(`Exception fetching items from ${tableName}:`, error);
    return { data: fallbackData, error };
  }
}

// Get a single item
export async function getItem<T>(tableName: string, id: string, fallbackData: T | null = null) {
  try {
    const result = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (result.error) throw result.error;
    return { data: result.data as T, error: null };
  } catch (error) {
    return handleError(error, fallbackData);
  }
}

// Create a new item
export async function createItem<T>(tableName: string, data: any) {
  try {
    console.log(`Creating item in ${tableName}:`, data);
    const result = await supabase.from(tableName).insert([data]).select();
    
    if (result.error) {
      console.error(`Error creating item in ${tableName}:`, result.error);
      return { data: null, error: result.error };
    }
    
    console.log(`Successfully created item in ${tableName}:`, result.data?.[0]);
    return { data: result.data?.[0] as T, error: null };
  } catch (error) {
    console.error(`Exception creating item in ${tableName}:`, error);
    return { data: null, error };
  }
}

// Update an existing item
export async function updateItem<T>(tableName: string, id: string, data: any) {
  try {
    // Add updated_at timestamp
    const updates = {
      ...data,
      updated_at: new Date().toISOString(),
    };
    
    const result = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select();
    
    if (result.error) throw result.error;
    return { data: result.data?.[0] as T, error: null };
  } catch (error) {
    return handleError(error, null);
  }
}

// Delete an item
export async function deleteItem(tableName: string, id: string) {
  try {
    const result = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (result.error) throw result.error;
    return { success: true, error: null };
  } catch (error) {
    return handleError(error, { success: false });
  }
}
