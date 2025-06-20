'use client';

import {useQuery} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api';
import {useParams} from 'next/navigation';
import type {Note} from '@/types/note';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
    const params = useParams();
    const id = Number(params.id);

    const {data: note, isLoading, error} = useQuery<Note>({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error || !note) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                    <button className={css.editBtn}>Edit note</button>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Unknown date'}</p>
            </div>
        </div>
    );
}