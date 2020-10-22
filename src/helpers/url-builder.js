const { twitterBaseUrl, langQuery } = require('../../config/app-config');

const URLwithLangQuery = async page => `${twitterBaseUrl}${page}${langQuery}`

module.exports = { URLwithLangQuery };