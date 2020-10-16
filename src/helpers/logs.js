const { createFullDate } = require('./date');

const horizontalLine = (textLenght, template) => {
    let horizontalLine = "";
    while(horizontalLine.length < textLenght + 4 ) horizontalLine+= template;

    return horizontalLine;
};

const infoLog = text => {
    const textLenght = text.length;
    let line = horizontalLine(textLenght, "=");
    
    console.log(`
    ${line}
    = ${text} =
    ${line}
    `);
};

const baseLog = (title, text) => {
    const textLenght = text.length;
    let line = horizontalLine(textLenght, "-");

    console.log(`${title}
    ${line}
      ${text}
    ${line}
    `);
};

const actionLog = text => {
    console.log(`| ${createFullDate()} | - ${text} -`);
};

module.exports = { infoLog, baseLog, actionLog };