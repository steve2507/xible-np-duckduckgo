'use strict';

module.exports = (NODE) => {
  const { Base: OoHttpBase } = require('oohttp');
  const duckduckgo = new OoHttpBase(`https://api.duckduckgo.com/?format=json&t=${encodeURIComponent(NODE.data.t)}`);

  const duckduckgoOut = NODE.getOutputByName('duckduckgo');
  duckduckgoOut.on('trigger', async () => duckduckgo);
};
