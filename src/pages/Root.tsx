/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, RootProps, Tag } from "../utils/types";
import { useMemo, useState } from "react";
import NoteCard from "../components/NoteCard";
import EditTagsModal from "../components/EditTagsModal";

const Root = ({ availableTags, notes, onDelete, onUpdate }: RootProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note: Note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setIsTagsModalOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={availableTags.map((t: Tag) => {
                  return { label: t.label, value: t.id };
                })}
                value={selectedTags.map((t: Tag) => {
                  return { label: t.label, value: t.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((t) => {
                      return { label: t.label, id: t.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note: Note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={isTagsModalOpen}
        handleClose={() => setIsTagsModalOpen(false)}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
};

export default Root;
