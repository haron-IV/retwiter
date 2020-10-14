const infoLog = (text) => {
    const textLenght = text.length;
    let horizontalLine = "";
    while(horizontalLine.length < textLenght + 4 ) horizontalLine+= "=";
    
    console.log(`
        ${horizontalLine}
        = ${text} =
        ${horizontalLine}
    `);
};

module.exports = { infoLog };