# restAPI

//search informasi debitur
post '/customers'

//get debitur coll 2
get '/colls'

// /users belum digunankan
use '/users'

SELECT SETUPLOAN.ket, TOFLMB.kdprd, SUM (TOFLMB.osmdlc) as pencairan from TOFLMB
left JOIN SETUPLOAN ON TOFLMB.kdprd = SETUPLOAN.kdprd
                    WHERE ( TOFLMB.stsrec in ('A', 'N') ) AND TOFLMB.ststrn = '*' AND
                        ( TOFLMB.pokpby NOT IN ('12', '30','18') )  AND
                          ( TOFLMB.kdloc >= '00' AND TOFLMB.kdloc <= '99' )  AND 	
                          ( TOFLMB.stsacc NOT IN('W','C')) AND
                          ( TOFLMB.tgleff BETWEEN 20240101 and 20240131 ) 
                          group BY
                          toflmb.kdprd,
                          SETUPLOAN.ket   

SELECT TOFLMB.kdprd, TOFLMB.kdaoh,TOFLMB.kdloc, COUNT (TOFLMB.osmdlc) AS noa,SUM(TOFLMB.osmdlc) as pencairan
    FROM TOFLMB
    WHERE (TOFLMB.stsrec IN ('A', 'N')) AND TOFLMB.ststrn = '*' AND
          (TOFLMB.pokpby NOT IN ('12', '30', '18')) AND
          (TOFLMB.kdloc >= '00' AND TOFLMB.kdloc <= '99') AND 	
          (TOFLMB.stsacc NOT IN('W', 'C')) AND
          (TOFLMB.tgleff BETWEEN 20240101 AND 20240131)
    GROUP BY TOFLMB.kdaoh, TOFLMB.kdloc, TOFLMB.kdprd
    ORDER BY TOFLMB.kdaoh ASC      