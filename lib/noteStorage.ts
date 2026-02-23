import * as FileSystem from "expo-file-system/legacy";


export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  expiresAt: number;
};

const NOTES_FILE: string = (FileSystem as any).documentDirectory + "notes.json";

export async function getNotes(): Promise<Note[]> {
  try {
    const file = await FileSystem.readAsStringAsync(NOTES_FILE);
    return JSON.parse(file);
  } catch {
    return [];
  }
}

async function saveNotes(notes: Note[]) {
  await FileSystem.writeAsStringAsync(NOTES_FILE, JSON.stringify(notes));
}

export async function addNote(
  title: string,
  body: string,
  deleteAfter: string
): Promise<Note> {
  const notes = await getNotes();
  const now = Date.now();

  const expiresAt = {
    "1h": now + 1 * 60 * 60 * 1000,
    "1 day": now + 24 * 60 * 60 * 1000,
    "1 week": now + 7 * 24 * 60 * 60 * 1000,
  }[deleteAfter] ?? now + 1 * 60 * 60 * 1000;

  const newNote: Note = {
    id: Math.random().toString(36).slice(2),
    title,
    body,
    createdAt: now,
    expiresAt,
  };

  notes.unshift(newNote);
  await saveNotes(notes);

  return newNote;
}

// **New function: update existing note**
export async function updateNote(
  id: string,
  title: string,
  body: string,
  deleteAfter: string
): Promise<Note | null> {
  const notes = await getNotes();
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) return null;

  const now = Date.now();
  const expiresAt = {
    "1h": now + 1 * 60 * 60 * 1000,
    "1 day": now + 24 * 60 * 60 * 1000,
    "1 week": now + 7 * 24 * 60 * 60 * 1000,
  }[deleteAfter] ?? now + 1 * 60 * 60 * 1000;

  notes[index] = {
    ...notes[index],
    title,
    body,
    expiresAt,
  };

  await saveNotes(notes);
  return notes[index];
}

export async function deleteExpiredNotes(): Promise<Note[]> {
  const notes = await getNotes();
  const now = Date.now();

  const filtered = notes.filter((n) => n.expiresAt > now);

  await saveNotes(filtered);

  return filtered;
}
