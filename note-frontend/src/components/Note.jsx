import { useParams } from "react-router-dom";

const Note = ({ allNotes, toggleImportanceOf }) => {
  const id = useParams().id;
  const note = allNotes.find((n) => n.id === id);
  console.log("note", note);

  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      {note.content} {note.important ? <b>Important</b> : <b>Unimportant</b>}
      <p>
        Note created by <b>{note.user.username}</b>
      </p>
    </li>
  );
};

export default Note;
