export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

export type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<Note>;

export type RootProps = {
  availableTags: Tag[];
  notes: Note[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, label: string) => void;
};

export type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

export type EditModalProps = {
  availableTags: Tag[];
  handleClose: () => void;
  show: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, label: string) => void;
};
