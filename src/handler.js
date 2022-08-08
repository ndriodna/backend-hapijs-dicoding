import { nanoid } from 'nanoid';
import notes from './notes.js'

const getNote = () =>({
  status:"success",
  data:{
    notes
  }
})


const addNote = (request,h) =>{
  const {title, body, tags} = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updateAt = createdAt

  const newNote = {
    title, tags, body, id, createdAt, updateAt
  }

  notes.push(newNote)

  const isFill = notes.filter((note)=> note.id === id).length > 0

  if (isFill) {
    return h.response({
      status:'success',
      message:'Berhasil ditambahkan',
      data:{
        noteId: id
      }
    })
    .code(200)
  }

  return h.response({
    status:'fail',
    message:'data gagal ditambahkan',
  }).code(500)

}
const detailNote = (request,h) =>{
  const {id} = request.params

  const note = notes.filter((n) => n.id === id )[0]

  if (note !== undefined) {
    return {
      status:'success',
      data:{
        note,
      }
    }
  }
  return h.response({
    status:"fail",
    message:'catatan tidak ada'
  }).code(404)
}

const updateNote = (request,h) =>{
  const {id} = request.params

  const {title, tags, body} = request.payload
  const updateAt = new Date().toISOString()

  const index = notes.findIndex((note)=> note.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,tags,body,updateAt
    }
    return h.response({
      status:'success',
      message:'Catatan berhasil diperbarui',
    }).code(200)
  }

  return h.response({
    status:'fail',
    message:'Gagal memperbarui catatan. Id tidak ditemukan',
  }).code(404)
}

const deleteNote = (request,h) =>{
  const {id} = request.params

  const index = notes.findIndex((note)=> note.id === id)

  if (index !== -1) {
    notes.splice(index,1)
    return h.response({
      status:'success',
      message:'Data berhasil dihapus'
    }).code(200)
  }
  return h.response({
    status:'fail',
    message:'Gagal hapus data'
  }).code(404)
}
export {getNote, addNote, detailNote, updateNote, deleteNote}