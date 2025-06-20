import axios from 'axios';
import type {CreateNote, Note} from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

export const fetchNotes = async (
    search: string,
    page: number,
    perPage = 12
): Promise<{ notes: Note[]; totalPages: number }> => {
    const params: Record<string, string | number> = {
        page,
        perPage,
    };

    if (search.trim()) {
        params.search = search;
    }

    const response = await instance.get<{ notes: Note[]; totalPages: number }>(
        '/notes',
        {params}
    );
    return response.data;
};

export const createNote = async (
    noteData: CreateNote
): Promise<Note> => {
    const response = await instance.post<Note>('/notes', noteData);
    return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
    const response = await instance.delete<Note>(`/notes/${id}`);
    return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
    const response = await instance.get<Note>(`/notes/${id}`);
    return response.data;
};
