const Author = {};
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas
 * @param {string} authorLastname Autoriaus pavarde
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius irasytas i duomenu baze.
 */
Author.create = async (connection, authorFirstname, authorLastname) => {
    sql = 'INSERT INTO authors (id, firstname, lastname)\
    VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
    [rows] = await connection.execute(sql);
    const responce = `${authorFirstname} ${authorLastname} buvo sekmingai irasytas`
    return responce
    // console.log(responce);
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns { Promise < string >} Tekstas, parodantis autoriu sarasa.
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
 * @returns { Promise < string >} Tekstas, parodantis autoriu pagal ID.
 */
Author.findById = async (connection, authorId) => {
    sql = 'SELECT * FROM `authors` WHERE `id` = ' + authorId;
    [rows] = await connection.execute(sql);
    if (rows.length === 0) {
        return 'ERROR: tokio ID nera'
    }
    const byID = `Author, whose ID = ${authorId} is ${rows[0].firstname} ${rows[0].lastname}`;
    return byID;
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {*} authorFirstname Autoriaus vardas
 * @returns { Promise < string >} Tekstas, parodantis autoriaus info pagal varda.
 */
Author.findByFirstname = async (connection, authorFirstname) => {
    sql = 'SELECT * FROM `authors` WHERE `firstname` = "' + authorFirstname + '"';
    [rows] = await connection.execute(sql);
    const byName = `Authors data, whose name is ${authorFirstname}: ID = ${rows[0].id} ${rows[0].firstname} ${rows[0].lastname}`;
    return byName;
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {*} authorLastname Autoriaus pavarde.
 * @returns Tekstas, parodantis autoriaus info pagal pavarde.
 */
Author.findByLastname = async (connection, authorLastname) => {
    sql = 'SELECT * FROM `authors` WHERE `lastname` = "' + authorLastname + '"';
    [rows] = await connection.execute(sql);
    const byLastName = `Authors data, whose last name is ${authorLastname}: ID = ${rows[0].id} ${rows[0].firstname} ${rows[0].lastname}`;
    return byLastName;
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} propertyName Atnaujinamos savybes pavadinimas.
 * @param {string} propertyValue Atnaujinamos savybes verte.
 * @returns { Promise < string >} Tekstas, skelbiantis kokia savybe, pagal duota ID, buvo atnaujinta i kokia verte.
 */
Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
    sql = 'UPDATE authors SET ' + propertyName + ' = "' + propertyValue + '" WHERE authors.id =' + authorId;
    [rows] = await connection.execute(sql);
    const updated = `Author whose ID = ${authorId} property ${propertyName} has been updated to ${propertyValue}`
    return updated
}
/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns { Promise < string >} Tekstas, parodantis pagal koki ID buvo istirntas autorius.
 */
Author.delete = async (connection, authorId) => {
    sql = 'DELETE FROM authors WHERE authors.id =' + authorId;
    [rows] = await connection.execute(sql);
    const deleted = `User whose ID = ${authorId} has been deleted from authors list.`
    return deleted
}

module.exports = Author;