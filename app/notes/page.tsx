import NotesClient from "@/app/notes/Notes.client";
import {fetchNotes} from "@/lib/api";

const Notes = async () => {
    const {notes} = await fetchNotes('', 1, 12);

    return <NotesClient initialNotes={notes}/>;
};

export default Notes;