import React, { createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

const SupabaseContext = createContext();

const supabaseUrl = 'https://gqmmsobigeljlogcygkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxbW1zb2JpZ2VsamxvZ2N5Z2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk3Mzc1MTUsImV4cCI6MjAzNTMxMzUxNX0.Apqda3ruZTOAcTi0eGYMKLmNzkH6eQ-9n-qI3Vxuoak';
const supabase = createClient(supabaseUrl, supabaseKey);

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);

export { SupabaseContext };