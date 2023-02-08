import { zodResolver } from '@hookform/resolvers/zod';
import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';
import { useForm } from 'react-hook-form';

import { Container } from '@/components/Container';
import { FullScreenLoadingSpinner } from '@/components/FullScreenLoadingSpinner';
import { useNotification } from '@/components/Notification/useNotification';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Primitives/Accordion';
import { Button } from '@/components/Primitives/Button';
import { InputField } from '@/components/Primitives/InputField';
import { LoadingSpinner } from '@/components/Primitives/LoadingSpinner';
import { Textarea } from '@/components/Primitives/Textarea';
import { MenuLayout } from '@/layouts/menu-layout';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/utils/api';
import { normalizeError } from '@/utils/normalize-error';
import {
  createFlashcardSchema,
  type CreateFlashcardSchema,
} from '@/validators/create-flashcard-schema';

export default function Me({
  id,
  userName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors, isValid },
  } = useForm<CreateFlashcardSchema>({
    mode: 'onBlur',
    resolver: zodResolver(createFlashcardSchema),
    defaultValues: { collectionName: 'Default Collection' },
  });
  const { notify } = useNotification();

  if (!id || !userName) {
    return <FullScreenLoadingSpinner />;
  }

  const createFlashcard = api.flashcard.createFlashcard.useMutation();
  const collections = api.collection.getCollections.useQuery({ userId: id });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createFlashcard.mutateAsync(data);
      await collections.refetch();
      notify({
        type: 'info',
        title: 'Flash card created',
        message: `${data.term} - ${data.termTranslation} In collection ${data.collectionName}`,
      });
    } catch (e) {
      const error = normalizeError(e);

      notify({
        type: 'error',
        title: 'Error',
        message: error.message,
      });
    }
  });

  return (
    <MenuLayout>
      <div className="my-10">
        <Container>
          <section className="mb-5 bg-slate-50 p-5 dark:bg-slate-800 sm:rounded">
            <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
              Welcome back, {userName}
            </h2>
            <Accordion type="multiple" defaultValue={['item-1']}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Create new flashcard</AccordionTrigger>
                <AccordionContent className="p-1">
                  <form onSubmit={onSubmit}>
                    <InputField
                      label="Collection Name"
                      path="collectionName"
                      register={register}
                      disabled={isSubmitting}
                      error={errors.collectionName?.message}
                      className="mb-3"
                    />
                    <span className="space-x-5 sm:flex">
                      <InputField
                        label="Term (foreign language)"
                        path="term"
                        register={register}
                        disabled={isSubmitting}
                        error={errors.term?.message}
                      />
                      <InputField
                        label="Translation (english)"
                        path="termTranslation"
                        register={register}
                        disabled={isSubmitting}
                        error={errors.termTranslation?.message}
                      />
                    </span>
                    <span className="mt-3 space-x-5 sm:flex">
                      <Textarea
                        label="Example (foreign language)"
                        path="example"
                        register={register}
                        disabled={isSubmitting}
                        error={errors.example?.message}
                      />
                      <Textarea
                        label="Example translation (english)"
                        path="exampleTranslation"
                        register={register}
                        disabled={isSubmitting}
                        error={errors.exampleTranslation?.message}
                      />
                    </span>
                    <Button
                      type="submit"
                      className="mt-5"
                      disabled={isSubmitting || !isValid}
                    >
                      {isSubmitting ? <LoadingSpinner /> : 'Add'}
                    </Button>
                  </form>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Recent Sets</AccordionTrigger>
                <AccordionContent>
                  {collections.isRefetching ? (
                    <LoadingSpinner />
                  ) : (
                    collections.data?.map((collection) => {
                      return (
                        <div key={collection.id}>
                          <h3>{collection.name}</h3>
                        </div>
                      );
                    })
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </Container>
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
