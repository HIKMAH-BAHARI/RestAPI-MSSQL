const dbPool = require('../config/databases');

const getAllColl = async (generateColl) => {
  try {
    const SQLQuery = `  SELECT TOFLMB.nokontrak,   
    TOFLMB.nocif,   
    TOFLMB.kdprd,   
    TOFLMB.nama, 
    mCif.alamat,
    mCIF.kelurahan,
    mCif.kecamatan,
    mCIF.kota, 
    TOFLMB.mdlawal, 
    TOFLMB.osmdlc,
    TOFLMB.osmgnc,   
    TOFLMB.jw,   
    TOFLMB.kdjw, 
    TOFLMB.tgleff,  
    TOFLMB.tglexp,
      TOFLMB.coleom,
      TOFLMB.colbaru,
      TOFLMB.haritgkmdl,
      TOFLMB.haritgkmgn,
      TOFLMB.tglmacet,
      TOFLMB.kdloc, 
      TOFLMB.kdaoh
  FROM TOFLMB JOIN mCIF ON
  TOFLMB.nocif = mCIF.nocif
  WHERE
      TOFLMB.colbaru = @generateColl  AND
      TOFLMB.stsrec IN ('A', 'N') AND
      TOFLMB.pokpby NOT IN ('12','30','18') AND
      TOFLMB.stsacc NOT IN ('W','C') AND stsrest <> 'Y'
  ORDER BY CASE WHEN TOFLMB.kdprd = '27' THEN 1 ELSE 0 END 
     `;
     const request = dbPool.request();
     request.input('generateColl', generateColl)

     const result = await request.query(SQLQuery);
     return result.recordset;
  } catch (error) {
    throw error
  }
};

const getOsColl = () => {
  const SQLQuery = `  SELECT TOFLMB.kdloc, TOFLMB.colbaru, SUM(osmdlc) AS tot_osmdlc, Count(*) AS tot_rec FROM TOFLMB 
		WHERE ( stsrec IN ('A','N')) AND pokpby NOT IN ('12','30','18') AND stsacc NOT IN ('W','C') AND ststrn = '*' 
		GROUP BY TOFLMB.kdloc,TOFLMB.colbaru ORDER BY TOFLMB.kdloc ASC, TOFLMB.colbaru ASC	`;

  return dbPool.query(SQLQuery);
};

const getNpf = () => {
  const SQLQuery =` SELECT 
  SUM(CASE WHEN TOFLMB.colbaru = '3' THEN TOFLMB.osmdlc ELSE 0 END) AS col_3,
  SUM(CASE WHEN TOFLMB.colbaru = '4' THEN TOFLMB.osmdlc ELSE 0 END) AS col_4,
  SUM(CASE WHEN TOFLMB.colbaru = '5' THEN TOFLMB.osmdlc ELSE 0 END) AS col_5
FROM TOFLMB
WHERE 
  TOFLMB.stsrec IN ('A', 'N') AND
  TOFLMB.ststrn = '*' AND
  TOFLMB.pokpby NOT IN ('12', '30', '18') AND
  TOFLMB.kdloc >= '00' AND TOFLMB.kdloc <= '99' AND 	
  TOFLMB.stsacc NOT IN('W', 'C') AND
  TOFLMB.colbaru IN ('3', '4', '5')`;

  return dbPool.query(SQLQuery)
  }

const getNpfLoc = () => {
  const SQLQuery =` SELECT 
  SUM(CASE WHEN TOFLMB.colbaru IN ('3','4','5') AND TOFLMB.kdloc='01' THEN TOFLMB.osmdlc ELSE 0 END) AS kdloc_01,
  SUM(CASE WHEN TOFLMB.colbaru IN ('3','4','5') AND TOFLMB.kdloc='02' THEN TOFLMB.osmdlc ELSE 0 END) AS kdloc_02,
  SUM(CASE WHEN TOFLMB.colbaru IN ('3','4','5') AND TOFLMB.kdloc='03' THEN TOFLMB.osmdlc ELSE 0 END) AS kdloc_03,
  SUM(CASE WHEN TOFLMB.colbaru IN ('3','4','5') AND (TOFLMB.kdloc='01' OR TOFLMB.kdloc='02' OR TOFLMB.kdloc='03') THEN TOFLMB.osmdlc ELSE 0 END) AS osnpf
FROM TOFLMB
WHERE 
  TOFLMB.stsrec IN ('A', 'N') AND
  TOFLMB.ststrn = '*' AND
  TOFLMB.pokpby NOT IN ('12', '30', '18') AND 	
  TOFLMB.stsacc NOT IN('W', 'C') AND
  TOFLMB.colbaru IN ('3', '4', '5')`;

  return dbPool.query(SQLQuery)
}

module.exports = {
  getAllColl,
  getOsColl,
  getNpf,
  getNpfLoc,
};
