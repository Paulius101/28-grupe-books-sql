const Author = {};
const Validation = require('./Validation');

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas
 * @param {string} authorLastname Autoriaus pavarde
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius irasytas i duomenu baze.
 */
Author.create = async (connection, authorFirstname, authorLastname) => {

    if (!Validation.isValidName(authorFirstname)) {
        return console.error('ERROR: invalid string entry.')
    }
    if (!Validation.isValidName(authorLastname)) {
        return console.error('ERROR: invalid string entry.')
    }

    const sql = 'INSERT INTO authors (id, firstname, lastname)\
            VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    if (rows.affectedRows === 0) {
        return 'ERROR:nepavyko iterpti autoriaus'
    }
    return `${authorFirstname} ${authorLastname} buvo sekmingai irasytas`


    // console.log(responce);
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<string>} Tekstas, parodantis autoriu sarasa.
 */
Author.listAll = async (connection) => {
    const sql = 'SELECT *\
    FROM authors';
    const [rows] = await connection.execute(sql);
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
    if (!Validation.IDisValid(authorId)) {
        return ('ERROR: not a valid entry.')
    }

    const sql = 'SELECT * FROM `authors` WHERE `id` = ' + authorId;
    const [rows] = await connection.execute(sql);
    if (rows.length === 0) {
        return 'ERROR: tokio ID nera';
    }
    return `Author, whose ID = ${authorId} is ${rows[0].firstname} ${rows[0].lastname}`;

}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas
 * @returns {Promise<string>} Tekstas, parodantis autoriaus info pagal varda.
 */
Author.findByFirstname = async (connection, authorFirstname) => {
    if (!Validation.isValidName(authorFirstname)) {
        return console.error('ERROR: invalid string entry.')
    }

    const sql = 'SELECT * FROM `authors` WHERE `firstname` = "' + authorFirstname + '"';
    const [rows] = await connection.execute(sql);
    // console.log(rows);
    let findings = [];
    let x = 0;
    for (const author of rows) {
        findings.push(`${++x}. Author: ${author.firstname} ${author.lastname}, by ID = ${author.id}`)
    }
    return findings
    // const findings = rows.map(obj => obj.firstname + ' ' + obj.lastname + ', ' + 'ID = ' + obj.id)

}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns Tekstas, parodantis autoriaus info pagal pavarde.
 */
Author.findByLastname = async (connection, authorLastname) => {
    if (!Validation.isValidName(authorLastname)) {
        return console.error('ERROR: invalid string entry.')
    }

    const sql = 'SELECT * FROM `authors` WHERE `lastname` = "' + authorLastname + '"';
    const [rows] = await connection.execute(sql);
    let findings = [];
    let x = 0;
    for (const author of rows) {
        findings.push(`${++x}. Author: ${author.firstname} ${author.lastname}, by ID = ${author.id}`)
    }
    return findings
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
    const columns = ['id', 'firstname', 'lastname'];
    //Tikriname ar propertyName yra viena is lenteles reiksmiu.
    if (!columns.includes(propertyName)) {
        return "ERROR: such property name doesn't exist"
    }
    //Jeigu propertyName yra ID tai value yra skaicius.
    if (propertyName === columns[0] && !Validation.IDisValid(propertyValue)) {
        return console.error('ERROR: invalid ID entry')
    }

    //Jeigu firsname/lastname, tai tekstas value.

    if (propertyName === 'firstname' && !Validation.isText(propertyValue)) {
        return console.error('ERROR: invalid firstname string entry.')
    }
    if (propertyName === 'lastname' && !Validation.isText(propertyValue)) {
        return console.error('ERROR: invalid lastname string entry.')
    }

    const sql = 'UPDATE authors SET ' + propertyName + ' = "' + propertyValue + '" WHERE authors.id =' + authorId;
    const [rows] = await connection.execute(sql);
    return `Author whose ID = ${authorId} property ${propertyName} has been updated to ${propertyValue} `

}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Tekstas, parodantis pagal koki ID buvo istirntas autorius.
 */
Author.delete = async (connection, authorId) => {
    if (!Validation.IDisValid(authorId)) {
        return console.error('ERROR: invalid ID entry.')
    }

    const sql = 'DELETE FROM authors WHERE authors.id =' + authorId;
    const [rows] = await connection.execute(sql);

    return `User whose ID = ${authorId} has been deleted from authors list.`


}


module.exports = Author;