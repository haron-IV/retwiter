const { twitterBaseUrl, langQuery } = require('../../config/app-config');

const URLwithLangQuery = (page) => `${twitterBaseUrl}${page}${langQuery}`

module.exports = { URLwithLangQuery };