const { v4: uuidv4 } = require('uuid');
const { util } = require('../../helper');

const baseRepository = (container) => {

    const create = async (item) => (await (await container).items.create({ id: util.isNullOrEmpty(item.id) ? uuidv4() : item.id, ...item }))?.resource;

    const createMany = async (items) => await Promise.all(items.map(async (item) => await create(item)));

    const deleteById = async (id) => await (await container).item(id).delete();

    const deleteByIds = async (ids) => await Promise.all(ids.map(async (id) => await deleteById(id)));

    const deleteAll = async () => await (await container).delete();

    const getById = async (id) => (await (await container).item(id).read())?.resource;

    const getByIds = async (ids) => await Promise.all(ids.map(async (id) => await getById(id)));

    const getAll = async () => (await (await container).items.query("select * from c").fetchAll())?.resources;

    const getByObject = async (object) => await query(util.getQuery(object))

    const getByObjects = async (objects) => await Promise.all(objects.map(async (object) => await getByObject(object)));

    // ex: sqlQuery = SELECT * from c WHERE c.isCapitol = true
    const query = async (sqlQuery) => (await (await container).items.query(sqlQuery).fetchAll())?.resources;

    const update = async (item) => {
        const { id, currentUser, ...data } = item;
        let res = await getById(id);
        return (await (await container).item(id).replace({ ...res, ...data }))?.resource;
    }

    const removeField = async (id, column) => {
        let res = await getById(id);
        delete res[column];
        return (await (await container).item(id).replace(res))?.resource;
    }

    const updateMany = async (items) => await Promise.all(items.map(async (item) => await update(item)));

    return {
        create,
        createMany,

        deleteById,
        deleteByIds,
        deleteAll,

        getById,
        getByIds,
        getAll,

        getByObject,
        getByObjects,

        query,

        update,
        updateMany,

        removeField
    };
};

module.exports.baseRepository = baseRepository;