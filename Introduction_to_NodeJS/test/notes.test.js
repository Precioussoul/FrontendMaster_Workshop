import {jest} from "@jest/globals"

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}))

const {insertDB, getDB, saveDB} = await import("../src/db.js")
const {newNote, getAllNotes, removeNote} = await import("../src/note.js")

beforeEach(() => {
  insertDB.mockClear()
  getDB.mockClear()
  saveDB.mockClear()
})

test("newNote inserts data and return it", async () => {
  const note = {
    content: "this is my note",
    id: 1,
    tags: ["hello"],
  }

  insertDB.mockResolvedValue(note)

  const result = await newNote(note.content, note.tags)
  expect(result.content).toEqual(note.content)
  expect(result.tags).toEqual(note.tags)
})

test("getAllNotes returns all notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  }

  getDB.mockResolvedValue(db)

  const result = await getAllNotes()
  expect(result).toEqual(db.notes)
})
