import { Button } from '@mui/material';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClient();

    await supabase.auth.signOut();

    return redirect('/');
  };

  return user ? (
    <div>
      Hey, {user.email}!
      <form action={signOut}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  ) : (
    <Link href="/login">Login</Link>
  );
}
