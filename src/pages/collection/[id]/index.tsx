import { useRouter } from 'next/router';

import { FullScreenLoadingSpinner } from '@/components/FullScreenLoadingSpinner';
import { api } from '@/utils/api';

export default function Collection() {
  const router = useRouter();
  const collectionId = router.query.id as string;

  const { data, isLoading } = api.collection.getSingleCollection.useQuery({
    collectionId,
  });

  if (isLoading) {
    return <FullScreenLoadingSpinner />;
  }

  return (
    <div>
      <div>collection {collectionId}</div>
      {data?.flashcards.map((flashcard) => (
        <div key={flashcard.id}>{flashcard.term}</div>
      ))}
    </div>
  );
}
