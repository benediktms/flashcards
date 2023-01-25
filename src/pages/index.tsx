import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@/components/Button';
import { api } from '@/utils/api';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Flashcards</title>
      </Head>
      <AuthShowcase />
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-4">
      <p className="text-center">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <span>
        <Button
          className="mr-2"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? 'Sign Out' : 'Sign In'}
        </Button>
        <Button onClick={() => void router.push('/signup')}>Sign Up</Button>
      </span>
      <Button onClick={() => void router.push('/me')}>Go To Profile</Button>
    </div>
  );
};
