import React, { createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

const SupabaseContext = createContext();

const supabaseUrl = 'https://hkktxqasyhprzbynpezz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhra3R4cWFzeWhwcnpieW5wZXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwNDY2MDksImV4cCI6MjAzNTYyMjYwOX0.kJs57FKj5zA6zhAykkmhyiwCP0SpsDCVc5U6qnLrhUc';
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