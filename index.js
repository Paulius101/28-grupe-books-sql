const db = require('./db');
const Author = require('./Author');
const Books = require('./Books');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'books',
    });


    // LOGIC BELOW
    const create1 = await Author.create(conn, '', 'Pavardenis');
    console.log(create1);
    const create2 = await Author.create(conn, 'Tusciazodis', 'Beprasmis');
    console.log(create2);
    const create3 = await Author.create(conn, 'Tylenis', 'Ramusis');
    console.log(create3);
    const create4 = await Author.create(conn, 'Makaule', 'Tuscia');
    console.log(create4);
    const list = await Author.listAll(conn);
    console.log(list);
    const byID = await Author.findById(conn, 1);
    console.log(byID);
    const byName = await Author.findByFirstname(conn, 'Tusciazodis')
    console.log(byName);
    const byLastName = await Author.findByLastname(conn, 'Ramusis')
    console.log(byLastName);
    const update = await Author.updatePropertyById(conn, 1, 'firstname', 'Pavardenis')
    console.log(update);
    const deleted = await Author.delete(conn, 4);
    console.log(deleted);

    // const createBook1 = await Books.create(conn, 2, 'Blevyzgos', 1111)
    // console.log(createBook1);
    // const createBook2 = await Books.create(conn, 3, 'Skaitalai', 2222)
    // console.log(createBook2);
    // const createBook3 = await Books.create(conn, 1, 'Pamokslai', 3333)
    // console.log(createBook3);
    // const listOfBooks = await Books.listAll(conn)
    // console.log(listOfBooks);
    // const byBookName = await Books.findByName(conn, 'Blevyzgos')
    // console.log(byBookName);
    // const byBookYear = await Books.findByYear(conn, '2222')
    // console.log(byBookYear);
    // const updatedBookByID = await Books.updateById(conn, 1, 'book_name', 'Blevyzgeles')
    // console.log(updatedBookByID);
    // const updatedBookNameByID = await Books.updateNameById(conn, 2, 'Skaitymai')
    // console.log(updatedBookNameByID);
    // const updatedBookYearByID = await Books.updateYearById(conn, 3, 4444)
    // console.log(updatedBookYearByID);
    // const deletedBook = await Books.delete(conn, 3)
    // console.log(deletedBook);
    // const deletedBookByAuthor = await Books.deleteAllByAuthorId(conn, 2)
    // console.log(deletedBookByAuthor);
}

app.init();

module.exports = app;