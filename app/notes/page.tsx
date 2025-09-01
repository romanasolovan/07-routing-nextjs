import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";

const NotesPage = async () => {
    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
        queryKey: ["notes", { page: 1, perPage: 12, search: "" }],
        queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Notes />
        </HydrationBoundary>
    );
};

export default NotesPage;