const { URLwithLangQuery } = require('../helpers/url-builder');
const { twittSelector } = require('../twitt-selector/twitt-selector');
const { setError } = require('../state/app-state');

const twittLink = async page => {
    const twitt = await twittSelector(page);
    if (twitt) return await URLwithLangQuery( twitt );
    setError({ msg:"twittLink()", appPID: process.pid });
};

module.exports = { twittLink };