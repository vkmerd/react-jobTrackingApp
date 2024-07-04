import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSupabase } from "./SupaClient";


export default function App() {
  const supabase = useSupabase();
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const getSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          setSession(session);

          if (session) {
              navigate('/dashboard');
          } else {
              navigate('/login');
          }
      };

      getSession();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
          getSession();
      });

      return () => {
          subscription?.unsubscribe();
      };
  }, [supabase, navigate]);


  return (
    <>
     <div className="w-full h-screen">
        <Outlet context={{ session }} />
     </div>
    </>
  )
}

