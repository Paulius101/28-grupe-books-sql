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
    const byBookName = `Book details by the name of "${bookName}": Author ID: ${rows[0].author_id} released in year ${rows[0].release_year}.`;
    return byBookName;
}

Books.findByYear = async (connection, bookReleaseYear) => {
    sql = 'SELECT * FROM `books` WHERE `release_year` = "' + bookReleaseYear + '"';
    [rows] = await connection.execute(sql);
    const byBookYear = `Book details by the year ${bookReleaseYear}: Author ID: ${rows[0].author_id}, book name "${rows[0].book_name}".`;
    return byBookYear;
}


Books.updateById = async (connection, bookId, propertyName, propertyValue) => {

}

Books.updateNameById = async (connection, bookId, bookName) => {
}

Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
}

Books.delete = async (connection, bookId) => {
}

Books.deleteAllByAuthorId = async (connection, authorId) => {
}

module.exports = Books;