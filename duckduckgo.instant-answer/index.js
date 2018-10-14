'use strict';

module.exports = (NODE) => {
  const duckduckgoIn = NODE.getInputByName('duckduckgo');
  const queriesIn = NODE.getInputByName('queries');

  const abstractOut = NODE.getOutputByName('abstract');
  abstractOut.on('trigger', async (conn, state) => {
    let queries;
    if (queriesIn.isConnected()) {
      queries = await queriesIn.getValues(state);
    } else {
      queries = [NODE.data.query];
    }

    const duckduckgos = await duckduckgoIn.getValues(state);
    return [].concat(...await Promise.all(duckduckgos.map(duckduckgo =>
      Promise.all(queries.map(async (query) => {
        const req = await duckduckgo.get(`?q=${encodeURIComponent(query)}&skip_disambig=0`).toJson();
        return req.AbstractText;
      }))
    )));
  });
};
