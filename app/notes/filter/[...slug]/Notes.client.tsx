'use client'

import Loader from '@/components/Loader/Loader';
import fetchNotes from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import css from './NotesPage.module.css'
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';


interface NotesClientPageProps {
    tag: string,
}

export default function NotesClientPage({tag}: NotesClientPageProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", page, query, tag],
    queryFn: () => fetchNotes(page, query, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })

    const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} value={query} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            page={page}
                      totalPages={data.totalPages}
                      onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data && data?.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>Tasks not found</p>
      )}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onCancel={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  )
}
