import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { EditModalProps } from "../utils/types";

const EditTagsModal = ({
  availableTags,
  show,
  handleClose,
  onDelete,
  onUpdate,
}: EditModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((t) => (
              <Row key={t.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={t.label}
                    onChange={(e) => onUpdate(t.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => onDelete(t.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagsModal;
