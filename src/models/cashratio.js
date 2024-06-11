const dbPool = require('../config/databases')

const getCR = async (month, years, tb_neraca) => {
    try {
            const SQLQuery = `  SELECT   
            SUM(@tb_neraca.tgl01) as tgl01,   
            SUM(@tb_neraca.tgl02) as tgl02,   
            SUM(@tb_neraca.tgl03) as tgl03,   
            SUM(@tb_neraca.tgl04) as tgl04,   
            SUM(@tb_neraca.tgl05) as tgl05,   
            SUM(@tb_neraca.tgl06) as tgl06,   
            SUM(@tb_neraca.tgl07) as tgl07,   
            SUM(@tb_neraca.tgl08) as tgl08,   
            SUM(@tb_neraca.tgl09) as tgl09,   
            SUM(@tb_neraca.tgl10) as tgl10,
            SUM(@tb_neraca.tgl10) as tgl11,
            SUM(@tb_neraca.tgl10) as tgl12
        FROM @tb_neraca,   
            TBLGL  
    WHERE ( TBLGL.nosbb = @tb_neraca.nosbb ) and  
                ( @tb_neraca.kodeloc >= '01') AND 
                ( @tb_neraca.kodeloc <= '03') AND 
            ( @tb_neraca.thn = '@years') AND  
            ( @tb_neraca.bln = '@month') AND  
            ( @tb_neraca.nosbb IN (1011010, 1012020, 1013010, 1051020, 1051050, 1051060, 1051070,
                                    1052010, 1101010, 1101030, 1101080, 1101090, 1102010, 1102020,
                                    1102040, 1102050, 1102060, 1102080, 1102090, 1103010, 1103030,
                                    1103040, 1103050, 1104030, 1104040, 1104050, 1104060, 1104070,
                                    1104080, 1104090, 1104100, 1104110,1104130, 1104140, 1105020,
                                    1105030, 1105040, 1105090, 1106020 )) AND
            ( TBLGL.golac = '1' ) AND  
            ( TBLGL.jnsgol = 'C' ) `;
        
    const request = await dbPool.request()
    request.input('month', month);
    request.input('years', years);
    
    const result = await request.query(SQLQuery);
    return result.recordset;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCr,
}