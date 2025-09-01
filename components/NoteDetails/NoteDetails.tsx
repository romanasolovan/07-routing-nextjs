import css from './NoteDetails.module.css';

interface NoteDetailProps {
    title: string,
    content: string,
    date: string,
}

const NoteDetails = ({ title, content, date }: NoteDetailProps) => {
    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{title}</h2>
                </div>
                <p className={css.content}>{content}</p>
                <p className={css.date}>{date}</p>
            </div>
        </div>
    );
};
export default NoteDetails;