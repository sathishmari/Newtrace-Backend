const { rhibhusTestingContainer } = require('./rhibhusTestingContainer')
const { v4: uuidv4 } = require('uuid');
const { util: { isNullOrEmpty, getQuery } } = require('../../helper');

let container = rhibhusTestingContainer();

const fortmatData = (data) => JSON.stringify(data, null, 2);

const create = async (item) => (await (await container).items.create({ id: isNullOrEmpty(item.id) ? uuidv4() : item.id, ...item }))?.resource;

const createMany = async (items) => await Promise.all(items.map(async (item) => await create(item)));

const deleteById = async (id) => await (await container).item(id).delete();

const deleteByIds = async (ids) => await Promise.all(ids.map(async (id) => await deleteById(id)));

const deleteAll = async () => await (await container).delete();

const getById = async (id) => (await (await container).item(id).read())?.resource;

const getByIds = async (ids) => await Promise.all(ids.map(async (id) => await getById(id)));

const getAll = async () => (await (await container).items.query("select * from c").fetchAll())?.resources;

const getByObject = async (object) => await query(getQuery(object));

const getByObjects = async (objects) => await Promise.all(objects.map(async (object) => await getByObject(object)));

// ex: sqlQuery = SELECT * from c WHERE c.isCapitol = true
const query = async (sqlQuery) => (await (await container).items.query(sqlQuery).fetchAll())?.resources;

const update = async (item) => {
    const { id, ...data } = item;
    let res = await getById(id);
    return (await (await container).item(id).replace({ ...res, ...data }))?.resource;
}

const updateMany = async (items) => await Promise.all(items.map(async (item) => await update(item)));

(async () => {
    let id = "68d20b7b-87ef-42d5-ace6-b6487b27af6d";

    let data = [
        {
            "firstname": "Bhargavi",
            "lastname": "Prasad",
            "email": "Bhargavi.Prasad@rhibhus.com",
            "password": "ThisNeedToBeCorrected",
            "type": 7,
            "otp": 1234,
            "otp_expirationtime": 0,
            "active": true
        }
    ];

    // 1. create
    // var res = await create(data[0]);
    // console.log(res);

    // 2. createMany
    // var res = await createMany(data);
    // console.log(res);

    // 3. deleteById
    // let res = await deleteById(id);
    // console.log(res);

    // 4. deleteByIds
    // let res = await deleteByIds([id]);
    // console.log(res);

    // 5. deleteAll
    // let res = await deleteAll();
    // console.log(res);

    // 6. getById
    let res = await getById(id);
    console.log(res);

    // 7. getByIds
    // let res = await getByIds([id]);
    // console.log(res);

    // 8. getAll
    // let res = await getAll();
    // console.log(res);

    // 9. getByObject
    // let res = await getByObject({ lastname: "Prasad" });
    // console.log(res);

    // 10. getByObjects
    // let res = await getByObjects([{ "firstname": "Bhargavi" }, { lastname: "Prasad" },]);
    // console.log(res);

    // 11. query
    // let res = await query("SELECT * from c WHERE c.lastname  = 'Prasad'");
    // console.log(res);

    // 12. query
    // let res = await update({ id: id, lastname: "Changed", });
    // console.log(res);

})();