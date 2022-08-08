import {getNote, addNote, detailNote, updateNote, deleteNote} from './handler.js'

const routes = [

{
  /*list note*/
  method:'GET',
  path:'/notes',
  handler:getNote
},
{
  /*note detail*/
  method:'GET',
  path:'/notes/{id}',
  handler: detailNote
},
{
  /*post note*/
  method:'POST',
  path:'/notes',
  handler: addNote
},
{
  /*update note*/
  method:'PUT',
  path:'/notes/{id}',
  handler: updateNote
},
{
  /*delete note*/
  method:'DELETE',
  path:'/notes/{id}',
  handler: deleteNote
}

]

export default routes