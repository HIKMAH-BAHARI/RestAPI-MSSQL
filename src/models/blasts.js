const dbPool =  require('../config/databases')


const getBirthdays = () => {
    const SQLQuery = `SELECT 
                            nm, 
                            hp, 
                            tgllhr,
                            DATEDIFF(YEAR, tgllhr, GETDATE()) AS age
                        FROM mCIF
                        WHERE SUBSTRING(CONVERT(VARCHAR(8), tgllhr, 112), 5, 2) = RIGHT('0' + CAST(MONTH(GETDATE()) AS VARCHAR(2)), 2)
                        AND SUBSTRING(CONVERT(VARCHAR(8), tgllhr, 112), 7, 2) = RIGHT('0' + CAST(DAY(GETDATE()) AS VARCHAR(2)), 2)
                        AND hp <> '' and nm='TRI YULI YANTO'`
    
        return dbPool.query(SQLQuery);
    
        }
    

module.exports = {
    getBirthdays,
}
