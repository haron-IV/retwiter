const { getAppConfig } = require('../helpers/config-selector');

const { twitterBaseUrl, langQuery } = getAppConfig();

const URLwithLangQuery = async page => `${twitterBaseUrl}${page}${langQuery}`

module.exports = { URLwithLangQuery };