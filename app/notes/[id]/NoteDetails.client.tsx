'use client';


import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NoteDetails.module.css';
import { notFound } from 'next/navigation';

export default function NoteDetailsClient() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (!note || error) {
    notFound();
  }

  // if (error || !note) return <p>Something went wrong.</p>;

  return (
    <>
      <button
        className={css.returnbtn}
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </button>
    
    </>
  );
}