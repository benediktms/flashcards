import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';
import { getSession } from 'next-auth/react';

function Me({
  id,
  email,
  userName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Welcome back {userName}</h1>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

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
