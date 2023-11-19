import React from "react";
import { showFormattedDate } from "../utils";

const CardView = ({ note, handleDelete, handleArchive }) => {
  // console.log("note", note);
  return (
    <div className="note-item">
      <div className="note-item__content">
        <div className="note-item__title">{note.title}</div>
        <div className="note-item__date">
          {showFormattedDate(note.createdAt)}
        </div>
        <div className="note-item__body">{note.body}</div>
      </div>

      <div className="note-item__action">
        <button
          onClick={() => handleDelete(note)}
          className="note-item__delete-button"
        >
          Delete
        </button>
        <button
          onClick={() => handleArchive(note)}
          className="note-item__archive-button"
        >
          {note.archived ? "Pindahkan" : "Archive"}
        </button>
      </div>
    </div>
  );
};

export default CardView;
