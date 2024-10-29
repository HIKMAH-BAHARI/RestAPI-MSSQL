const dbPool = require('../config/databases');

const cashRatio = async (hari) => {
    let originalHari = hari; // Menyimpan nilai asli hari untuk log
    let tabelName = 'M_NERACA01';
    let column = '';

    try {
        // Validasi input hari
        hari = parseInt(hari);
        if (isNaN(hari) || hari < 1 || hari > 31) {
            throw new Error(`Tanggal ${hari} tidak valid. Masukkan tanggal antara 1-31`);
        }

        // Logika penentuan tabel dan kolom yang diperbaiki
        if (hari >= 1 && hari <= 10) {
            tabelName = 'M_NERACA01';
            column = `tgl${hari.toString().padStart(2, '0')}`;
        } else if (hari >= 11 && hari <= 20) {
            tabelName = 'M_NERACA02';
            column = `tgl${(hari - 10).toString().padStart(2, '0')}`;
        } else if (hari >= 21 && hari <= 31) {
            tabelName = 'M_NERACA03';
            column = `tgl${(hari - 20).toString().padStart(2, '0')}`;
        }

        // Validasi kolom berdasarkan tabel
        const columnLimits = {
            'M_NERACA01': 10,
            'M_NERACA02': 10,
            'M_NERACA03': 12
        };

        // Log untuk debugging
        console.log({
            inputHari: originalHari,
            processedHari: hari,
            tabelName: tabelName,
            columnName: column,
            columnLimit: columnLimits[tabelName]
        });

        // Validasi kolom sebelum query
        const columnNumber = parseInt(column.replace('tgl', ''));
        if (columnNumber > columnLimits[tabelName]) {
            throw new Error(`Kolom ${column} tidak tersedia di tabel ${tabelName}. Batas kolom: tgl${columnLimits[tabelName].toString().padStart(2, '0')}`);
        }

        // Membuat dan mengeksekusi query
        const SQLQuery = `
            SELECT 
                SUM (${column}) AS original_value
            FROM ${tabelName} 
            WHERE thn='2024'
        `;

        console.log('Executing Query:', SQLQuery);

        const pool = await dbPool.connect();
        const result = await pool.request().query(SQLQuery);

        // Penanganan hasil query
        if (result.recordset.length > 0) {
            const data = result.recordset[0];
            console.log('Query Result:', data);
            
            return {
                tanggal: hari,
                tabel: tabelName,
                kolom: column,
                nilai: data.total || 0,
                raw_value: data.original_value
            };
        } else {
            console.log('No data found');
            return {
                tanggal: hari,
                tabel: tabelName,
                kolom: column,
                nilai: 0,
                raw_value: null
            };
        }

    } catch (error) {
        console.error('Error in cashRatio:', {
            message: error.message,
            hari: originalHari,
            tabelName: tabelName,
            column: column
        });

        // Membuat error yang lebih informatif
        throw new Error(`Gagal mengambil data cash ratio: ${error.message}`);
    }
};

// Fungsi helper untuk validasi
const validateColumn = (tabelName, columnName) => {
    const columnLimits = {
        'M_NERACA01': 10,
        'M_NERACA02': 10,
        'M_NERACA03': 12
    };

    const columnNumber = parseInt(columnName.replace('tgl', ''));
    return columnNumber <= columnLimits[tabelName];
};

module.exports = { 
    cashRatio,
    // Export fungsi helper untuk unit testing
    _test: {
        validateColumn
    }
};