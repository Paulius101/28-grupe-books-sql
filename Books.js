/**
 * Kaip rasyti JSDOc'sus?
 * Link: https://jsdoc.app
 */

const Books = {};
const Validation = require('./Validation');

/**
 * Autoriaus isleistos knygos irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} bookName Knygos pavadinimas.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.create = async (connection, authorId, bookName, bookReleaseYear) => {
    if (!Validation.isValidName(bookName)) {
        return console.error('ERROR: invalid string entry.')
    }
    if (!Validation.IDisValid(authorId)) {
        return ('ERROR: not a valid entry.')
    }

    sql = 'INSERT INTO books (author_id,book_name, release_year)\
    VALUES ("'+ authorId + '", "' + bookName + '", "' + bookReleaseYear + '")';
    [rows] = await connection.execute(sql);
    const createBook = `"${bookName}" written by author whose ID =  ${authorId} in year ${bookReleaseYear} buvo sekmingai irasyta i knygu sarasa`
    return createBook

}

/**
 * Visu autoriu isleistu knygu sarasas.
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<Object[]>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.listAll = async (connection) => {
    sql = 'SELECT *\
    FROM books';
    [rows] = await connection.execute(sql);
    let listOfBooks = []
    let index = 0;
    for (const book of rows) {
        listOfBooks.push(`${++index}. Book: "${book.book_name}" released in year ${book.release_year} by author whose ID = ${book.author_id}.`);
    }
    return listOfBooks
}

/**
 * Knygos paieska pagal pavadinima.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} bookName Knygos pavadinimas.
 * @returns {Promise<string>} Sarasas su knygu objektais.
 */
Books.findByName = async (connection, bookName) => {
    if (!Validation.isValidName(bookName)) {
        return console.error('ERROR: invalid string entry.')
    }

    sql = 'SELECT * FROM `books` WHERE `book_name` = "' + bookName + '"';
    [rows] = await connection.execute(sql);
    const byBookName = `Book details by the name of "${bookName}": Author ID = ${rows[0].author_id} released in year ${rows[0].release_year}.`;
    return byBookName;

}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, pateikiantis informacija apie knyga rasta pagal isleidimo metus. 
 */
Books.findByYear = async (connection, bookReleaseYear) => {
    if (!Validation.IDisValid(bookReleaseYear)) {
        return ('ERROR: not a valid entry.')
    }

    sql = 'SELECT * FROM `books` WHERE `release_year` = "' + bookReleaseYear + '"';
    [rows] = await connection.execute(sql);
    const byBookYear = `Book details by the year ${bookReleaseYear}: Author ID = ${rows[0].author_id}, book name "${rows[0].book_name}".`;
    return byBookYear;

}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} propertyName Savybes pavadinimas.
 * @param {string} propertyValue Savybes verte.
 * @returns {Promise<string>} Tekstas, pateikiantis atnaujinta informacija apie knyga rasta pagal knygos ID.
 */
Books.updateById = async (connection, bookId, propertyName, propertyValue) => {

    const columns = ['id', 'book_name', 'release_year'];
    //Tikriname ar propertyName yra viena is lenteles reiksmiu.
    if (!columns.includes(propertyName)) {
        return "ERROR: such property name doesn't exist"
    }
    //Jeigu propertyName yra ID tai value yra skaicius.
    if (propertyName === columns[0] && !Validation.IDisValid(propertyValue)) {
        return console.error('ERROR: invalid ID entry')
    }
    if (propertyName === columns[2] && !Validation.IDisValid(propertyValue)) {
        return console.error('ERROR: invalid ID entry')
    }

    //Jeigu book name, tai tekstas value.

    if (propertyName === 'book_name' && !Validation.isText(propertyValue)) {
        return console.error('ERROR: invalid book name string entry.')
    }

    sql = 'UPDATE books SET ' + propertyName + ' = "' + propertyValue + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedBookByID = `Book whose ID = ${bookId} property ${propertyName} has been updated to "${propertyValue}"`
    return updatedBookByID

}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} bookName Knygos pavadinimas.
 * @returns {Promise<string>} Tekstas, pateikiantis atnaujinta pavadinima knygos, kuri rasta pagal knygos ID.
 */
Books.updateNameById = async (connection, bookId, bookName) => {
    if (!Validation.isValidName(bookName)) {
        return console.error('ERROR: invalid string entry.')
    }
    if (!Validation.IDisValid(bookId)) {
        return ('ERROR: not a valid entry.')
    }

    sql = 'UPDATE books SET book_name = "' + bookName + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedBookNameByID = `Book, whose ID = ${bookId}, name has been updated to "${bookName}"`
    return updatedBookNameByID

}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, pateikiantis atnaujintus knygos isleidimo metus, kuri rasta pagal knygos ID.
 */
Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
    if (!Validation.IDisValid(bookId || bookReleaseYear)) {
        return ('ERROR: not a valid entry.')
    }

    sql = 'UPDATE books SET release_year = "' + bookReleaseYear + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedBookYearByID = `Book, whose ID = ${bookId}, release year has been updated to "${bookReleaseYear}"`
    return updatedBookYearByID

}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @returns {Promise<string>} Tekstas pasakantis kuri knyga, pagal knygos ID, buvo istrinta.
 */
Books.delete = async (connection, bookId) => {
    if (!Validation.IDisValid(bookId)) {
        return ('ERROR: not a valid entry.')
    }

    sql = 'DELETE FROM books WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const deletedBook = `Book whose ID = ${bookId} has been deleted from books list.`
    return deletedBook

}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Tekstas pasakantis kuri knyga, pagal autoriaus ID, buvo istrinta.
 */
Books.deleteAllByAuthorId = async (connection, authorId) => {
    if (!Validation.IDisValid(authorId)) {
        return ('ERROR: not a valid entry.')
    }

    sql = 'DELETE FROM books WHERE author_id =' + authorId;
    [rows] = await connection.execute(sql);
    const deletedBookByAuthor = `Book whose author ID = ${authorId} has been deleted from books list.`
    return deletedBookByAuthor

}

module.exports = Books;