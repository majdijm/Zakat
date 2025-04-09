import React, { useEffect } from 'react';

export function DebugEnv() {
  useEffect(() => {
    console.log('Environment Variables Debug:');
    console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
    console.log('All env variables:', import.meta.env);
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '20px', borderRadius: '5px' }}>
      <h3>Environment Variables Debug</h3>
      <p>Check the console for environment variables information</p>
    </div>
  );
}
