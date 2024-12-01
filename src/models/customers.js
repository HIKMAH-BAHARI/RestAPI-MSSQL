const dbPool = require('../config/databases');
const mssql = require('mssql');

const getAllCustomers = () => {
  const SQLQuery = 'SELECT top 5 nocif, nama, nokontrak, kdprd, mdlawal FROM TOFLMB WHERE stsrec=\'A\' ORDER BY nama';

  return dbPool.query(SQLQuery);
};

const searchCostomers = (body) => {
  const SQLQuery = `    SELECT TOP 5
                        TOFLMB.tgleff,
                        TOFLMB.nokontrak,
                        TOFLMB.acdrop,
                        TOFLMB.nama,
                        mCIF.alamat,
                        mCIF.kelurahan,
                        mCIF.kecamatan,
                        mCIF.kota,
                        mCIF.hp,
                        MCIFJOB.alamat AS alamatpt,
                        MCIFJOB.kota AS kotapt,
                        MCIFJOB.namapt,
                        TOFLMB.kdprd,
                        TOFLMB.kdaoh,
                        TOFLMB.frekmdl,
                        TOFLMB.mdlawal,
                        TOFLMB.mgnawal,
                        SUM (TOFLMB.mdlawal + TOFLMB.mgnawal) as tghttl,
                        TOFLMB.angsmdl,
                        TOFLMB.angsmgn,
                        SUM(angsmdl + angsmgn) as angsttl,
                        TOFLMB.osmdlc,
                        TOFLMB.osmgnc,
                        SUM (TOFLMB.osmdlc + TOFLMB.osmgnc) as sisa_angsuran,
                        TOFTABC.sahirrp,
                        TOFTABC.saldoblok,
                        TOFLMB.colbaru,
                        TOFLMB.kdcab
                        FROM
                          TOFLMB
                        LEFT JOIN
                          mCIF ON TOFLMB.nocif = mCIF.nocif
                        LEFT JOIN
                          TOFTABC ON TOFLMB.acdrop = TOFTABC.notab
                        LEFT JOIN
                          MCIFJOB on mCIF.nocif = MCIFJOB.nocif
                        WHERE
                          (TOFLMB.nama LIKE '%' + @nama + '%' OR TOFLMB.nokontrak LIKE @nama) AND TOFLMB.stsrec = 'A'
                        GROUP BY
                          TOFLMB.tgleff,
                          TOFLMB.nokontrak,
                          TOFLMB.acdrop,
                          TOFLMB.nama,
                          mCIF.alamat,
                          mCIF.kota,
                          mCIF.kelurahan,
                          mCIF.kecamatan,
                          mCIF.hp,
                          MCIFJOB.namapt,
                          MCIFJOB.alamat,
                          MCIFJOB.kota,
                          TOFLMB.kdprd,
                          TOFLMB.kdaoh,
                          TOFLMB.frekmdl,
                          TOFLMB.tglakad,
                          TOFLMB.mdlawal,
                          TOFLMB.mgnawal,
                          TOFLMB.angsmdl,
                          TOFLMB.angsmgn,
                          TOFLMB.osmdlc,
                          TOFLMB.osmgnc,
                          TOFTABC.sahirrp,
                          TOFTABC.saldoblok,
                          TOFLMB.colbaru,
                          TOFLMB.kdcab
                        ORDER BY
                          TOFLMB.tglakad DESC
                        `;

                        const request = dbPool.request();
                        request.input('nama', mssql.VarChar, `%${body.nama}%`);
                      
                        return request.query(SQLQuery).then((result) => result.recordset);
                      };
const ViewOs = () => {
  const SQLQuery = `SELECT SUM (TOFLMB.osmdlc) as totalos from TOFLMB
                    WHERE ( TOFLMB.stsrec in ('A', 'N') ) AND TOFLMB.ststrn = '*' AND
                        ( TOFLMB.pokpby NOT IN ('12', '30','18') )  AND
                          ( TOFLMB.kdloc >= '00' AND TOFLMB.kdloc <= '99' )  AND 	
                          ( TOFLMB.stsacc NOT IN('W','C'))`;

  return dbPool.query(SQLQuery);
};

const ViewOsByKdloc = async (kdlocId) => {
  try {
    const SQLQuery = `
      SELECT SUM(TOFLMB.osmdlc) as totalos
      FROM TOFLMB
      WHERE (
        TOFLMB.stsrec IN ('A', 'N') AND
        TOFLMB.ststrn = '*' AND
        TOFLMB.pokpby NOT IN ('12', '30', '18') AND
        TOFLMB.stsacc NOT IN ('W', 'C') AND
        TOFLMB.kdloc >= @kdlocId AND TOFLMB.kdloc <= @kdlocId
      )`;

    const result = await dbPool.request()
      .input('kdlocId', kdlocId)
      .query(SQLQuery);

    return result.recordset;
  } catch (error) {
    throw error;
  }
};

const getAllArrears = async (dateId) => {
  try {
    const SQLQuery = `
      SELECT 
        TOFRS.nokontrak,
        TOFRS.tgltagih,
        TOFRS.os,
        TOFRS.tagmdl,
        TOFRS.tagmgn,
        SUM(TOFRS.tagmdl + TOFRS.tagmgn) AS angsuran,
        mCIF.nm,
        mCIF.alamat,
        mCIF.hp,
        TOFLMB.kdprd,
        TOFLMB.haritgk,
	      TOFLMB.acdrop
      FROM TOFRS 
        LEFT JOIN TOFLMB ON TOFRS.nokontrak = TOFLMB.nokontrak
        LEFT JOIN mCIF ON TOFLMB.nocif = mCIF.nocif
      WHERE TOFRS.tgltagih = @dateId AND TOFRS.stsbyr = ''
      GROUP BY
        TOFRS.nokontrak,
        TOFRS.tgltagih,
        TOFRS.hari,
        TOFRS.os,
        TOFRS.tagmdl,
        TOFRS.tagmgn,
        mCIF.nm,
        mCIF.alamat,
        mCIF.hp,
        TOFLMB.kdprd,
        TOFLMB.haritgk,
	      TOFLMB.acdrop
        ORDER BY CASE WHEN TOFLMB.kdprd = '27' THEN 1 ELSE 0 END`;

    const request = dbPool.request();
    request.input('dateId', dateId);

    const result = await request.query(SQLQuery);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

const getAllRealisasi = async (dateStart, dateEnd) => {
  try {
    const SQLQuery = `
    SELECT TOFTRNH.dracc,
			TOFLMB.nocif,   
         TOFLMB.nama,   
         TOFLMB.kdloc,   
         TOFLMB.kdprd,   
         TOFTRNH.nominalrp,
			TOFLMB.mdlawal,
			TOFLMB.mgnawal,   
         TOFLMB.tglakad,   
         TOFLMB.jw,   
         TOFLMB.kdjw,   
         TOFLMB.tglexp,   
         TOFLMB.kdaoh,   
			TOFLMB.jnsusaha,
			TOFLMB.kdrate,
			TOFLMB.rateflat,
			TOFLMB.rateeff,
			TOFLMB.dp,
			MCIF.alamat,
			MCIF.kelurahan,
			MCIF.kecamatan,
			MCIF.kota,
			TOFLMB.kdgroupdeb, 
			MCIF.hp
    FROM TOFLMB,
			MCIF,
			TOFTRNH
   WHERE ( tgltrn >= @dateStart AND tgltrn <= @dateEnd ) AND  
			( TOFLMB.nocif = MCIF.nocif ) AND
			( TOFTRNH.dracc = TOFLMB.nokontrak ) AND
			( TOFLMB.kdloc >= '01' AND TOFLMB.kdloc <= '99') AND
			( TOFTRNH.ststrn IN ('5','6')) AND jnstrnlx = '01' AND LEFT(ket,7) <> 'Koreksi'
    ORDER BY
      TOFLMB.kdaoh, TOFLMB.kdloc`;

    const request = dbPool.request();
    request.input('dateStart', dateStart);
    request.input('dateEnd', dateEnd);

    const result = await request.query(SQLQuery);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCustomers,
  searchCostomers,
  ViewOs,
  getAllArrears,
  ViewOsByKdloc,
  getAllRealisasi,
};
