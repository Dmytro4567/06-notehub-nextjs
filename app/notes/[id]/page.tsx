import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default async function NoteDetailsPage({params}: any) {
    const id = Number(params.id);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <TanStackProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteDetailsClient/>
            </HydrationBoundary>
        </TanStackProvider>
    );
}
