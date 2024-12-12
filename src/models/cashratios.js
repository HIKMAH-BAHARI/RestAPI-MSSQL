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
        SELECT          
                (SELECT
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
                                3111030, 3111050, 3111060, 3151010, 3151030, 3151060, 3151120, 3152010, 3152030, 3152060, 3152120)) as pembagi,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (1011010, 1012010, 1012020, 1013010, 1013020, 1014010, 1051010, 1051020, 1051030, 1051040, 1051050, 1051060, 1051070, 1052010, 1052020,
                1052030, 1101010, 1101020, 1101030, 1101040, 1101050, 1101060, 1101070, 1101080, 1101090, 1102010, 1102020, 1102030, 1102040, 1102050, 1102060, 1102070,
                1102080, 1102090, 1103010, 1103020, 1103030, 1103040, 1103050, 1104010, 1104020, 1104030, 1104040, 1104050, 1104060, 1104070, 1104080, 1104090, 1104100,
                1104110, 1104120, 1104130, 1104140, 1104150, 1105010, 1105020, 1105030, 1105040, 1105090, 1106010, 1106020, 1111010, 1111020, 1111030, 1111040, 1111050,
                1111060, 1111070, 1111080, 1112010, 1112020, 1112030, 1113010, 1113020, 1113030, 1113040, 1113050, 1113060, 1113070, 1113080, 1113090, 1114010, 1114020,
                1114030, 1114040, 1114050, 1114060, 1114070, 1114080, 1114090, 1114100, 1114110, 1114120, 1211010, 1211020, 1215010, 1215020, 1261010, 1271010, 1271020,
                1281010, 1291010, 1291020, 1295010, 1295020, 1411100, 1411110, 1411120, 1411130, 1411150, 1411160, 1411170, 1411180, 1412100, 1412110, 1412120, 1412130,
                1412140, 1412150, 1412160, 1412170, 1911010, 1912010, 1913010, 1914010, 1915010, 1922010, 1923010, 1924010, 1925010, 1940001, 1940002, 1951010, 1951020,
                1951030, 1951990, 1952010, 1952020, 1952030, 1952990, 1953010, 1953020, 1953030, 1953990, 1954010, 1954020, 1954030, 1954040, 1954050, 1954060, 1957010, 1957020, 1957030, 1957040, 1957990, 1958010,
                1959010, 1959020, 1959030, 1959910, 1959920, 1959930, 1959990)) as aset,

                (SELECT SUM(${column})
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (2211010, 2211020, 2211030, 2211040, 2211050, 2211060, 3111010, 3111020, 3111030, 3111050, 3111060)) as tab_nonbank,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (2511010, 2511020, 3111040)) as tab_bank,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (3151010, 3151030, 3151060, 3151120, 3151210, 3151310, 3152010, 3152030, 3152060, 3152120, 3152210, 3152310)) as dep_nonbank,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (2512010, 2512030, 2512060, 2512120)) as dep_bank,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (2513010, 2513020, 2513030, 2513040, 2513050, 2513060, 2513070, 2514010)) as linkage,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (1211010, 1211020, 1215010, 1215020, 1261010, 1271010, 1271020, 1281010, 1291010, 1291020, 1295010, 1295020)) as pembiayaan,

                (SELECT SUM(${column})
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (1051010, 1051020, 1051030, 1051040, 1051050, 1051060, 1051070, 1052010, 1052020, 1052030, 1101010, 1101020, 1101030, 1101040, 1101050,
                1101060, 1101070, 1101080, 1101090, 1102010, 1102020, 1102030, 1102040, 1102050, 1102060, 1102070, 1102080, 1102090, 1103010, 1103020, 1103030,
                1103040, 1103050, 1104010, 1104020, 1104030, 1104040, 1104050, 1104060, 1104070, 1104080, 1104090, 1104100, 1104110, 1104120, 1104130, 1104140,
                1104150, 1105010, 1105020, 1105030, 1105040, 1105090, 1106010, 1106020)) as tabungangiro,

                (SELECT SUM(${column})
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (1111010, 1111020, 1111030, 1111040, 1111050, 1111060, 1111070, 1111080, 1112010, 1112020, 1112030, 1113010, 1113020, 1113030, 1113040,
                1113050, 1113060, 1113070, 1113080, 1113090, 1114010, 1114020, 1114030, 1114040, 1114050, 1114060, 1114070, 1114080, 1114090, 1114100, 1114110, 1114120)) as deposito,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (5101010, 5111010, 5151010, 5211010, 5311010, 5411010, 5411020, 5511010, 5521010 )) as ekuitas,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (6111010, 6111020, 6111030, 6111040, 6111050, 6111060, 6111070, 6111080, 6111090, 6112010, 6112020, 6112030, 6113010, 6113020, 6113030, 6113040, 6113050,
                6113060, 6114020, 6114030, 6114040, 6114050, 6114060, 6114070, 6121010, 6122010, 6123010, 6131010, 6132010, 6133010, 6141010, 6141020, 6142010, 6211010, 6212010,
                6213010, 6214010, 6215010, 6216010, 6217010, 6311010, 6312010, 6321010, 6321020, 6321030, 6321040, 6321050, 6321060, 6322010, 6411010, 6412010, 6413010, 6431010,
                6911010, 6912010, 6912020, 6913010, 6913020, 6913030, 6913040, 6913050, 6913060, 6913070, 6913080, 6913090, 6914010, 6915010, 6916010, 6917010, 6917020, 6919990 )) as pendapatanops,

                (SELECT SUM(${column})
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (7111010, 7121010, 7121020, 7131010, 7131020, 7211010, 7221010, 7231010)) as bybagihsl,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (5521010)) as lbbersih,

                (SELECT SUM(${column}) 
                FROM ${tableName}
                WHERE thn='${tahun}' AND
                bln = '${bulan}' AND 
                nosbb in (5521010, 9811010, 9911010)) as lbbfzakat
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