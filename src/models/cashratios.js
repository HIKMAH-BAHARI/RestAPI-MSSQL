const dbPool = require('../config/databases');

const COLUMN_LIMITS = {
    'M_NERACA01': 10,
    'M_NERACA02': 10,
    'M_NERACA03': 12
};

const getTableAndColumn = (hari) => {
    if (hari <= 10) {
        return {
            tableName: 'M_NERACA01',
            column: `tgl${hari.toString().padStart(2, '0')}`
        };
    } else if (hari <= 20) {
        return {
            tableName: 'M_NERACA02',
            column: `tgl${(hari - 10).toString().padStart(2, '0')}`
        };
    }
    return {
        tableName: 'M_NERACA03',
        column: `tgl${(hari - 20).toString().padStart(2, '0')}`
    };
};

const validateColumn = (tableName, columnName) => {
    const columnNumber = parseInt(columnName.replace('tgl', ''));
    return columnNumber <= COLUMN_LIMITS[tableName];
};

const cashRatio = async (hari, bulan, tahun) => {
    const day = parseInt(hari);
    const month = parseInt(bulan);
    const year = parseInt(tahun);
    
    if (isNaN(day) || day < 1 || day > 31) {
        throw new Error(`Invalid date: ${hari}. Please enter a date between 1-31`);
    }
    if (isNaN(year) || year <1 || year > 9999) {
        throw new Error(`Invalid year: ${tahun}.  Please enter a valid years `); 
    }
    if (isNaN(month) || month <1 || month > 9999) {
        throw new Error(`Invalid year: ${bulan}.  Please enter a valid month `); 
    }

    const { tableName, column } = getTableAndColumn(day);

    if (!validateColumn(tableName, column)) {
        throw new Error(`Column ${column} is not available in table ${tableName}`);
    }

    const SQLQuery = `
        SELECT (SELECT
                SUM(${column})
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND
                nosbb in (1011010, 1012010, 1012020, 1013010, 1013020, 1014010, 1051010, 1051020, 1051030, 1051040, 1051050, 1051060, 1051070, 1052010, 1052020, 1052030, 1101010,
                            1101020, 1101030, 1101040, 1101050, 1101060, 1101070, 1101080, 1101090, 1102010, 1102020, 1102030, 1102040, 1102050, 1102060, 1102070, 1102080, 1102090,
                            1103010, 1103020, 1103030, 1103040,1103050, 1104010, 1104020, 1104030, 1104040, 1104050, 1104060, 1104070, 1104080, 1104090, 1104100, 1104110, 1104120,
                            1104130, 1104140, 1104150, 1105010, 1105020, 1105030, 1105040, 1105090, 1106010, 1106020)) as likuid,      
    
                (SELECT SUM(${column})
                FROM ${tableName} 
                WHERE thn='${tahun}' AND
                bln = '${bulan}'
                AND nosbb IN ('2511010','3111040','2511020')) as pengurang,

                (SELECT SUM(${column})
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (2111010, 2111030, 2111040, 2111050, 2111060, 2111070, 2111080, 2111090, 2112010, 2112020, 2112030, 2112040, 2112050, 2112060, 2112070, 2112080, 2112090,
                                2119990, 2211010, 2211020, 2211030, 2211040, 2211050, 2211060, 2512010, 2512030, 2512060, 2512120, 2711010, 2712010, 2714010, 2715010, 3111010, 3111020,
                                3111030, 3111050, 3111060, 3151010, 3151030, 3151060, 3151120, 3152010, 3152030, 3152060, 3152120)) as pembagi
    `;

    try {
        const pool = await dbPool.connect();
        const result = await pool.request().query(SQLQuery);

    return result.recordset;
    } catch (error) {
        throw new Error(`Failed to fetch cash ratio: ${error.message}`);
    }
};

module.exports = {
    cashRatio,
    _test: {
        validateColumn,
        getTableAndColumn
    }
};