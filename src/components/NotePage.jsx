// {
//   id: number | string,
//   title: string,
//   body: string,
//   archived: boolean,
//   createdAt: string,
// }

import React, { useMemo, useState } from "react";
import { getInitialData } from "../utils";
import CardView from "./CardView";

const NotePage = () => {
  const constantLimit = 50;
  const [baseData, setBaseData] = useState(getInitialData());

  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState(0);
  // console.log("searchData", searchData);

  const [formData, setFormData] = useState({ title: "", body: "" });

  const activeNote = useMemo(() => {
    return (search.length > 0 ? searchData : baseData).filter(
      (note) => !note.archived
    );
  }, [baseData, searchData]);

  const archivedNote = useMemo(() => {
    return (search.length > 0 ? searchData : baseData).filter(
      (note) => note.archived
    );
  }, [baseData, searchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateNote = (event) => {
    event.preventDefault();
    // console.log("create note", formData);
    const temp = {
      id: baseData.length + 1,
      title: formData.title,
      body: formData.body,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setBaseData((prev) => [...prev, temp]);
    // console.log("baseData", baseData);
  };

  const handleSearchNote = (e) => {
    const { value } = e.target;
    // console.log("value", value);
    setSearch(value);
    const temp = baseData.filter((note) =>
      note.title.toLowerCase().includes(value)
    );
    // console.log("temp", temp);
    setSearchData(temp);
  };

  const handleDeleteNote = (e) => {
    const { id } = e;
    // console.log("id", id);
    setBaseData((prev) => prev.filter((note) => note.id !== id));
  };

  const handleArchiveNote = (e) => {
    console.log("e", e);
    const { id } = e;
    setBaseData((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          return { ...note, archived: !note.archived };
        }
        return note;
      })
    );
  };

  const handleLimit = (e) => {
    const { name, value } = e.target;
    console.log("value", value.length);
    if (value.length <= constantLimit) {
      setLimit(constantLimit - value.length);
      setTitle(value);
    } else {
      alert("limit 50 karakter");
    }
  };

  return (
    <div className="note-page">
      {/* Header */}
      <div className="note-app__header">
        <h1 className="">Personal Note</h1>

        <input
          type="text"
          onChange={handleSearchNote}
          className="note-search"
          placeholder="Search"
        />
      </div>

      {/* input section */}
      <form
        onSubmit={handleCreateNote}
        className="note-input__body note-input note-app__body note-input"
      >
        <h2
          style={{
            justifySelf: "start",
            width: "100%",
          }}
        >
          Buat Catatan
        </h2>

        <p
          style={{
            width: "100%",
            textAlign: "right",
          }}
          className="note-input__title__char-limit"
        >
          Sisa Karakter : {limit} / {constantLimit}
        </p>

        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => {
            handleChange(e);
            handleLimit(e);
          }}
          className={""}
          required
          placeholder="ini adalah judul ..."
        />
        <textarea
          name="body"
          required
          className="note-item__content"
          style={{
            minHeight: 200,
          }}
          onChange={handleChange}
          placeholder="ini adalah catatan ..."
        ></textarea>
        <button className="" type="submit">
          Buat
        </button>
      </form>

      {/* view section */}

      <section className="note-view">
        <h2 className="">Catatan Aktif</h2>

        <div className="notes-list">
          {activeNote.length === 0 ? (
            <p>Data tidak ada!</p>
          ) : (
            activeNote.map((note, i) => (
              <CardView
                handleArchive={handleArchiveNote}
                handleDelete={handleDeleteNote}
                note={note}
                key={i}
              />
            ))
          )}
        </div>
      </section>

      <section className="note-view">
        <h2 className="">Arsip</h2>

        <div className="notes-list">
          {archivedNote.length === 0 ? (
            <p>Data tidak ada!</p>
          ) : (
            archivedNote.map((note, i) => (
              <CardView
                handleArchive={handleArchiveNote}
                handleDelete={handleDeleteNote}
                note={note}
                key={i}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default NotePage;
