import axios from 'axios'
import type { Note, CreateNote } from '../types/note'

interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
}

interface FetchNotesParams {
  page?: number
  perPage?: number
  search?: string
  tag?: string
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
})

// export const fetchNotes = async ({
//   page = 1,
//   perPage = 12,
//   search = '',
// }: FetchNotesParams): Promise<FetchNotesResponse> => {
//   const response = await api.get<FetchNotesResponse>('/notes', {
//     params: {
//       page,
//       perPage,
//       search,
//     },
//   })
//   return response.data
// }

export default async function fetchNotes(
  page: number,
  searchQuery?: string,
  tag?: string,
): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = {
    page,
    perPage: 12,
  }

  if (searchQuery) params.search = searchQuery
  if (tag) params.tag = tag

  const res = await api.get<FetchNotesResponse>('/notes', { params })
  return res.data
}

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const response = await api.post<Note>('/notes', newNote)
  return response.data
}

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`)
  return response.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`)
  return response.data
}
