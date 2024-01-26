const dbPool = require('../config/databases');
const { format } = require('date-fns');

const getAllCustomers = () => {
  const SQLQuery = `SELECT top 5 nocif, nama, nokontrak, kdprd, mdlawal FROM TOFLMB WHERE stsrec='A' ORDER BY nama`;

  return dbPool.query(SQLQuery);
};

const searchCostomers = (body) => {
  const SQLQuery = `    SELECT TOP 10
  TOFLMB.tglakad,
  TOFLMB.nokontrak,
  TOFLMB.acdrop,
  TOFLMB.nama,
  mCIF.alamat,
  mCIF.kelurahan,
  mCIF.kecamatan,
  mCIF.kota,
  mCIF.hp,
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
  TOFTABB.sahirrp,
  TOFLMB.colbaru,
  TOFLMB.kdcab
FROM
  TOFLMB
LEFT JOIN
  mCIF ON TOFLMB.nocif = mCIF.nocif
LEFT JOIN
  TOFTABB ON TOFLMB.acdrop = TOFTABB.notab
WHERE
  (TOFLMB.nama LIKE '%${body.nama}%' OR TOFLMB.nokontrak LIKE '${body.nama}') AND TOFLMB.stsrec = 'A'
GROUP BY
  TOFLMB.tglakad,
  TOFLMB.nokontrak,
  TOFLMB.acdrop,
  TOFLMB.nama,
  mCIF.alamat,
  mCIF.kota,
  mCIF.kelurahan,
  mCIF.kecamatan,
  mCIF.hp,
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
  TOFTABB.sahirrp,
  TOFLMB.colbaru,
  TOFLMB.kdcab
ORDER BY
  TOFLMB.tglakad DESC
`;

  return dbPool.query(SQLQuery).then((result) => result.recordset);
};

const ViewOs = (body) => {
  const SQLQuery = `SELECT SUM (TOFLMB.osmdlc) as totalos from TOFLMB
                    WHERE ( TOFLMB.stsrec in ('A', 'N') ) AND TOFLMB.ststrn = '*' AND
                        ( TOFLMB.pokpby NOT IN ('12', '30','18') )  AND
                          ( TOFLMB.kdloc >= '00' AND TOFLMB.kdloc <= '99' )  AND 	
                          ( TOFLMB.stsacc NOT IN('W','C'))`;

  return dbPool.query(SQLQuery);
};

// const getAllArrears = async (dateId) => {
//   try {
//     // Pastikan dateId diubah menjadi objek Date
//     const parsedDate = new Date(dateId);
//     if (isNaN(parsedDate)) {
//       return null; // Tanggal tidak valid, kembalikan null atau sesuai kebutuhan Anda
//     }

//     // Ubah format dateId sesuai dengan format yang diharapkan dalam database
//     const formattedDate = format(parsedDate, 'yyyyMMdd');

//     const SQLQuery = `
//       SELECT 
//         TOFRS.nokontrak,
//         TOFRS.tgltagih,
//         TOFRS.hari,
//         TOFRS.os,
//         TOFRS.tagmdl,
//         TOFRS.tagmgn,
//         SUM(TOFRS.tagmdl + TOFRS.tagmgn) AS tagihan,
//         mCIF.nm,
//         mCIF.alamat,
//         mCIF.hp
//       FROM TOFRS 
//         LEFT JOIN TOFLMB ON TOFRS.nokontrak = TOFLMB.nokontrak
//         LEFT JOIN mCIF ON TOFLMB.nocif = mCIF.nocif
//       WHERE TOFRS.tgltagih =@dateId AND TOFRS.stsbyr = ''
//       GROUP BY
//         TOFRS.nokontrak,
//         TOFRS.tgltagih,
//         TOFRS.hari,
//         TOFRS.os,
//         TOFRS.tagmdl,
//         TOFRS.tagmgn,
//         mCIF.nm,
//         mCIF.alamat,
//         mCIF.hp`;

//     const request = dbPool.request();
//     request.input('dateId', formattedDate); // Gunakan dateId yang telah diubah

//     const result = await request.query(SQLQuery);
//     return result.recordset;
//   } catch (error) {
//     throw error;
//   }
// };




module.exports = {
  getAllCustomers,
  searchCostomers,
  ViewOs,
 // getAllArrears,
};
