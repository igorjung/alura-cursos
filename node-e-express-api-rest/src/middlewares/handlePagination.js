import InvalidRequest from "../utils/errors/invalidRequest.js";

async function handlePaginate(req, res, next) {
  const { 
    limit = 5, 
    page = 1,
    sort = "_id:-1",
  } = req.query;
  const [sortField, sortOrder] = sort.split(":");
  const config = { 
    limit: parseInt(limit), 
    page: parseInt(page), 
    sort: { [sortField]: parseInt(sortOrder)} 
  };
  const list = req.list;

  try {
    if (config.limit > 0 && config.page > 0) {
      const paginatedList = await list
        .sort(config.sort)
        .skip((config.page - 1) * config.limit)
        .limit(config.limit);

      res.status(200).json(paginatedList);
    } else next(new InvalidRequest());
  } catch(err) { next(err); }
}

export default handlePaginate;