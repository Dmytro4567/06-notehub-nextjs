import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';


export default async function NoteDetailsPage(
    props: Awaited<ReturnType<() => Promise<{ params: { id: string } }>>>
) {
    const id = Number(props.params.id);
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
