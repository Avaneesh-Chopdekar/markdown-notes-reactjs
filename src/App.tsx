import { useMemo, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NoteData, RawNote, Tag } from "./utils/types";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import NoteLayout from "./components/NoteLayout";
import Note from "./pages/Note";
import Edit from "./pages/Edit";

const Root = lazy(() => import("./pages/Root"));
const New = lazy(() => import("./pages/New"));

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return { ...note, tags: tags.filter((t) => note.tagIds.includes(t.id)) };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        { ...data, id: uuidV4(), tagIds: tags.map((t) => t.id) },
      ];
    });
  }

  function onEditNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map((t) => t.id),
          };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function editTag(id: string, label: string) {
    setTags((prev) => {
      return prev.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }
  return (
    <Router>
      <Container className="my-4">
        <Suspense>
          <Routes>
            <Route
              path="/"
              element={
                <Root
                  notes={notesWithTags}
                  availableTags={tags}
                  onUpdate={editTag}
                  onDelete={deleteTag}
                />
              }
            />
            <Route
              path="/new"
              element={
                <New
                  onSubmit={onCreateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />
              }
            />
            <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
              <Route index element={<Note onDelete={onDeleteNote} />} />
              <Route
                path={"edit"}
                element={
                  <Edit
                    onSubmit={onEditNote}
                    onAddTag={addTag}
                    availableTags={tags}
                  />
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;
