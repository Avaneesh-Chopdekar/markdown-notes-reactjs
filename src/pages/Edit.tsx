import NoteForm from "../components/NoteForm";
import { useNote } from "../components/NoteLayout";
import { EditNoteProps } from "../utils/types";

const Edit = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();
  const { id, title, markdown, tags } = note;
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={title}
        markdown={markdown}
        tags={tags}
        onSubmit={(data) => onSubmit(id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default Edit;
