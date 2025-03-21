import { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

// Hook for querying data from Supabase
export function useSupabaseQuery<T>(
  supabase: SupabaseClient,
  table: string,
  options?: {
    column?: string;
    value?: any;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase.from(table).select('*');

      if (options?.column && options?.value !== undefined) {
        query = query.eq(options.column, options.value);
      }

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;

      setData(result as T[]);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useState(() => {
    fetchData();
  });

  return { data, loading, error, refetch: fetchData };
}

// Hook for creating data in Supabase
export function useSupabaseCreate<T extends { id?: string }>(
  supabase: SupabaseClient
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createData = async (table: string, data: T) => {
    try {
      setLoading(true);
      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .insert([data])
        .select();

      if (supabaseError) throw supabaseError;

      setError(null);
      return result?.[0] as T;
    } catch (err) {
      console.error('Error creating data:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createData, loading, error };
}

// Hook for updating data in Supabase
export function useSupabaseUpdate<T extends { id?: string }>(
  supabase: SupabaseClient
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateData = async (table: string, id: string, data: Partial<T>) => {
    try {
      setLoading(true);
      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select();

      if (supabaseError) throw supabaseError;

      setError(null);
      return result?.[0] as T;
    } catch (err) {
      console.error('Error updating data:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error };
}

// Hook for deleting data from Supabase
export function useSupabaseDelete(supabase: SupabaseClient) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (table: string, id: string) => {
    try {
      setLoading(true);
      const { error: supabaseError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (supabaseError) throw supabaseError;

      setError(null);
      return true;
    } catch (err) {
      console.error('Error deleting data:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
}
