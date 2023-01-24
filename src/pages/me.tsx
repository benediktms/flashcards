import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { getServerAuthSession } from '@/server/auth';

function Me({
  userName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <h1>Welcome back {userName}</h1>
      The current theme is: {theme}
      <Button className="mx-2" onClick={() => setTheme('light')}>
        Light Mode
      </Button>
      <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin',
      },
    };
  }

  return {
    props: {
      id: session.user?.id,
      email: session.user?.email,
      userName: session.user?.name,
    },
  };
}

export default Me;
