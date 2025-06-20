import css from './NoteList.module.css';
import type {Note} from '@/types/note';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteNote} from '@/lib/api';
import {useState} from 'react';
import Link from "next/link";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({notes}: NoteListProps) {
    const queryClient = useQueryClient();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onMutate: (id: number) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
    });

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    {deletingId === note.id ? (
                        <p>Deleting...</p>
                    ) : (
                        <>
                            <h2 className={css.title}>{note.title}</h2>
                            <p className={css.content}>{note.content}</p>
                            <div className={css.footer}>
                                <span className={css.tag}>{note.tag}</span>
                                <div>
                                    <Link href={`/notes/${note.id}`} className={css.link}>
                                        View details
                                    </Link>
                                    <button onClick={() => mutate(note.id)}
                                            className={css.button}
                                            disabled={deletingId === note.id}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}
