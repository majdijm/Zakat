import { useState, useEffect } from "react";
import { supabase } from "./supabase";

// Generic hook for fetching data from Supabase
export function useSupabaseQuery<T>(
  tableName: string,
  options?: {
    columns?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  },
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(tableName).select(options?.columns || "*");

        // Apply filters if provided
        if (options?.filters) {
          Object.entries(options.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              query = query.eq(key, value);
            }
          });
        }

        // Apply ordering if provided
        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true,
          });
        }

        // Apply limit if provided
        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: result, error } = await query;

        if (error) throw error;
        setData(result as T[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, JSON.stringify(options)]);

  return { data, loading, error };
}

// Hook for creating data in Supabase
export function useSupabaseCreate<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createData = async (tableName: string, data: Partial<T>) => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select();

      if (error) throw error;
      return result as T[];
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createData, loading, error };
}

// Hook for updating data in Supabase
export function useSupabaseUpdate<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateData = async (
    tableName: string,
    id: string | number,
    data: Partial<T>,
  ) => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq("id", id)
        .select();

      if (error) throw error;
      return result as T[];
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error };
}

// Hook for deleting data from Supabase
export function useSupabaseDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (tableName: string, id: string | number) => {
    try {
      setLoading(true);
      const { error } = await supabase.from(tableName).delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
}
