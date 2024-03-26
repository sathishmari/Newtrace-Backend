const baseService = (repo) => {

    const create = async (item) => await repo.create(item);

    const createMany = async (items) => await repo.createMany(items);

    const deleteById = async (id) => await repo.deleteById(id);

    const deleteByIds = async (ids) => await repo.deleteByIds(ids);

    const deleteAll = async () => await repo.deleteAll();

    const getAll = async () => await repo.getAll();

    const getById = async (id) => await repo.getById(id);

    const getByIds = async (ids) => await repo.getByIds(ids);

    const query = async (sqlQuery) => await repo.query(sqlQuery);

    const update = async (item) => await repo.update(item)

    const updateMany = async (items) => await repo.updateMany(items);

    return {
        create,
        createMany,

        deleteById,
        deleteByIds,
        deleteAll,

        getAll,
        getById,
        getByIds,

        query,

        update,
        updateMany
    };
};

module.exports.baseService = baseService;