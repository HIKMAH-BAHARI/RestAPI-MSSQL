const dbPool = require('../config/databases');

const getAllColl = (body) => {
  const SQLQuery = `  SELECT TOFLMB.nokontrak,   
        TOFLMB.nocif,   
        TOFLMB.kdprd,   
        TOFLMB.nama,  
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
    FROM TOFLMB
	WHERE
			( TOFLMB.colbaru = '2' ) AND
			( TOFLMB.stsrec IN ('A', 'N')) AND
			( TOFLMB.pokpby NOT IN ('12','30','18')) AND
			( TOFLMB.stsacc NOT IN ('W','C')) AND stsrest <> 'Y' `;

  return dbPool.query(SQLQuery);
};

const getOsColl = (body) => {
  const SQLQuery = `  SELECT TOFLMB.kdloc, TOFLMB.colbaru, SUM(osmdlc) AS tot_osmdlc, Count(*) AS tot_rec FROM TOFLMB 
		WHERE ( stsrec IN ('A','N')) AND pokpby NOT IN ('12','30','18') AND stsacc NOT IN ('W','C') AND ststrn = '*' 
		GROUP BY TOFLMB.kdloc,TOFLMB.colbaru ORDER BY TOFLMB.kdloc ASC, TOFLMB.colbaru ASC	`;

  return dbPool.query(SQLQuery);
};

module.exports = {
  getAllColl,
  getOsColl,
};
