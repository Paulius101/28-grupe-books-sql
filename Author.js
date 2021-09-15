const Author = {};


/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas
 * @param {string} authorLastname Autoriaus pavarde
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius irasytas i duomenu baze.
 */
Author.create = async (connection, authorFirstname, authorLastname) => {
    if (!isValidName(authorFirstname && authorLastname)) {
        return console.error('ERROR: invalid string entry')
    }
    else {
        sql = 'INSERT INTO authors (id, firstname, lastname)\
    VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
        [rows] = await connection.execute(sql);
        return responce = `${authorFirstname} ${authorLastname} buvo sekmingai irasytas`
    }

    // console.log(responce);
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<string>} Tekstas, parodantis autoriu sarasa.
 */
Author.listAll = async (connection) => {
    sql = 'SELECT *\
    FROM authors';
    [rows] = await connection.execute(sql);
    let list = []
    let ind = 0;
    for (const author of rows) {
        list.push(`${++ind}. Author: ${author.firstname} ${author.lastname}`);
    }
    return list
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Tekstas, parodantis autoriu pagal ID.
 */
Author.findById = async (connection, authorId) => {
    if (!isValidNumber(authorId)) {
        return ('ERROR: not a valid entry')
    }
    else {
        sql = 'SELECT * FROM `authors` WHERE `id` = ' + authorId;
        [rows] = await connection.execute(sql);
        if (rows.length === 0) {
            return 'ERROR: tokio ID nera';
        }
        return `Author, whose ID = ${authorId} is ${rows[0].firstname} ${rows[0].lastname}`;
    }
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas
 * @returns {Promise<string>} Tekstas, parodantis autoriaus info pagal varda.
 */
Author.findByFirstname = async (connection, authorFirstname) => {
    if (!isValidName(authorFirstname)) {
        return console.error('ERROR: invalid string entry')
    }
    else {
        sql = 'SELECT * FROM `authors` WHERE `firstname` = "' + authorFirstname + '"';
        [rows] = await connection.execute(sql);
        return `Authors data, whose name is ${authorFirstname}: ID = ${rows[0].id} ${rows[0].firstname} ${rows[0].lastname}`;
    }
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns Tekstas, parodantis autoriaus info pagal pavarde.
 */
Author.findByLastname = async (connection, authorLastname) => {
    if (!isValidName(authorLastname)) {
        return console.error('ERROR: invalid string entry')
    }
    else {
        sql = 'SELECT * FROM `authors` WHERE `lastname` = "' + authorLastname + '"';
        [rows] = await connection.execute(sql);
        return `Authors data, whose last name is ${authorLastname}: ID = ${rows[0].id} ${rows[0].firstname} ${rows[0].lastname}`;
    }
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} propertyName Atnaujinamos savybes pavadinimas.
 * @param {string} propertyValue Atnaujinamos savybes verte.
 * @returns {Promise<string>} Tekstas, skelbiantis kokia savybe, pagal duota ID, buvo atnaujinta i kokia verte.
 */
Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
    if (!isValidName(propertyName)) {
        return console.error('ERROR: invalid string entry')
    }
    else {
        sql = 'UPDATE authors SET ' + propertyName + ' = "' + propertyValue + '" WHERE authors.id =' + authorId;
        [rows] = await connection.execute(sql);
        return `Author whose ID = ${authorId} property ${propertyName} has been updated to ${propertyValue}`
    }
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Tekstas, parodantis pagal koki ID buvo istirntas autorius.
 */
Author.delete = async (connection, authorId) => {
    sql = 'DELETE FROM authors WHERE authors.id =' + authorId;
    [rows] = await connection.execute(sql);

    return `User whose ID = ${authorId} has been deleted from authors list.`

}
const isValidName = (name) => {
    if (name === undefined ||
        typeof name !== 'string' ||
        name.length < 2 ||
        name === '') {
        return false;
    }
    return true;
}

const isValidNumber = (num) => {
    if (typeof num !== 'number' || num % 1 !== 0 || !isFinite(num) || num < 1) {
        return false
    }
    return true
}


module.exports = Author;