"use client"

import css from './NotePreview.module.css'
import { useRouter } from "next/navigation"
import { defaultScheduler, useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import type { Note } from '@/types/note'
import Modal from '@/components/Modal/Modal'
import Loader from '@/components/Loader/Loader'


type NotePreviewProps = {
    id: string
}; 

const NotePreview({ id }: NotePreviewProps) {
    const router = useRouter();
    const onClose = () => {
        router.back();
    };

    const { data, isLoading, isError } = useQuery<Note>({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) {
        return (
            <Modal onClose={close}>
                <Loader />
            </Modal>
        );
    }

    return (
    <Modal onClose={close}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.content}>{data.content}</p>
        <div className={css.fSpace}>
          <span className={css.tag}>{data.tag}</span>
          {data.createdAt && (
            <p className={css.date}>
              {new Date(data.createdAt).toLocaleString("uk-UA")}
            </p>
          )}
        </div>
        <button className={css.backBtn} onClick={close}>
          Back
        </button>
      </div>
    </Modal>
  );
}

export default NotePreview;