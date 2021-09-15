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
    await Author.create(conn, 'Vardenis', 'Pavardenis');
    await Author.create(conn, 'Tusciazodis', 'Beprasmis');
    await Author.create(conn, 'Tylenis', 'Ramusis');
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
    // const deleted = await Author.delete(conn, 1);
    // console.log(deleted);

    const createBook1 = await Books.create(conn, 2, 'Blevyzgos', 1111)
    console.log(createBook1);
    const createBook2 = await Books.create(conn, 3, 'Skaitalai', 2222)
    console.log(createBook2);
    const createBook3 = await Books.create(conn, 1, 'Pamokslai', 3333)
    console.log(createBook3);
    const listOfBooks = await Books.listAll(conn)
    console.log(listOfBooks);
    const byBookName = await Books.findByName(conn, 'Blevyzgos')
    console.log(byBookName);
    const byBookYear = await Books.findByYear(conn, '2222')
    console.log(byBookYear);
}

app.init();

module.exports = app;