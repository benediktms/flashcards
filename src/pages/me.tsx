import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';

import { FullScreenLoadingSpinner } from '@/components/FullScreenLoadingSpinner';
import { MenuLayout } from '@/layouts/menu-layout';
import { getServerAuthSession } from '@/server/auth';

export default function Me({
  userName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!userName) {
    return <FullScreenLoadingSpinner />;
  }

  return (
    <MenuLayout userName={userName}>
      <div className="m-3">
        <h1>Welcome back {userName}</h1>
      </div>
    </MenuLayout>
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
