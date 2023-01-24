import { getServerAuthSession } from '@/server/auth';
import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';

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
