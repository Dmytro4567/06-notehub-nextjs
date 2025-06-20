import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({params}: PageProps) {
    const awaitedParams = await params;
    const id = Number(awaitedParams.id);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
        </HydrationBoundary>
    );
}
