/**
 * Kaip rasyti JSDOc'sus?
 * Link: https://jsdoc.app
 */

const Books = {};

/**
 * Autoriaus isleistos knygos irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} bookName Knygos pavadinimas.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.create = async (connection, authorId, bookName, bookReleaseYear) => {
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
 * @returns {Promise<Object[]>} Sarasas su knygu objektais.
 */
Books.findByName = async (connection, bookName) => {
    sql = 'SELECT * FROM `books` WHERE `book_name` = "' + bookName + '"';
    [rows] = await connection.execute(sql);
    const byBookName = `Book details by the name of "${bookName}": Author ID = ${rows[0].author_id} released in year ${rows[0].release_year}.`;
    return byBookName;
}

Books.findByYear = async (connection, bookReleaseYear) => {
    sql = 'SELECT * FROM `books` WHERE `release_year` = "' + bookReleaseYear + '"';
    [rows] = await connection.execute(sql);
    const byBookYear = `Book details by the year ${bookReleaseYear}: Author ID = ${rows[0].author_id}, book name "${rows[0].book_name}".`;
    return byBookYear;
}


Books.updateById = async (connection, bookId, propertyName, propertyValue) => {
    sql = 'UPDATE books SET ' + propertyName + ' = "' + propertyValue + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedBookByID = `Book whose ID = ${bookId} property ${propertyName} has been updated to "${propertyValue}"`
    return updatedBookByID
}

Books.updateNameById = async (connection, bookId, bookName) => {
    sql = 'UPDATE books SET book_name = "' + bookName + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedBookNameByID = `Book, whose ID = ${bookId}, name has been updated to "${bookName}"`
    return updatedBookNameByID
}

Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
    sql = 'UPDATE books SET release_year = "' + bookReleaseYear + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedBookYearByID = `Book, whose ID = ${bookId}, release year has been updated to "${bookReleaseYear}"`
    return updatedBookYearByID
}

Books.delete = async (connection, bookId) => {
    sql = 'DELETE FROM books WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const deletedBook = `Book whose ID = ${bookId} has been deleted from books list.`
    return deletedBook
}

Books.deleteAllByAuthorId = async (connection, authorId) => {
    sql = 'DELETE FROM books WHERE author_id =' + authorId;
    [rows] = await connection.execute(sql);
    const deletedBookByAuthor = `Book whose author ID = ${authorId} has been deleted from books list.`
    return deletedBookByAuthor
}

module.exports = Books;