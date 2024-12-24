const express = require('express');
const connection = require('./db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        console.log("Query started...");

        const Request = require('tedious').Request;
        const TYPES = require('tedious').TYPES;

        // Collect all rows
        let result = [];

        const request = new Request("SELECT TOP 3 *  FROM SalesLT.Customer", (err) => {
            if (err) {
                console.error("Error executing query:", err);
                res.status(500).json({ error: err.message });
                return;
            }
        });

        // Collect rows
        request.on('row', (columns) => {
            let row = {};
            columns.forEach((column) => {
                row[column.metadata.colName] = column.value;
            });
            result.push(row);
        });

        // Final response after query completion
        request.on("requestCompleted", () => {
            console.log("Query completed");
            res.json(result);
            connection.close(); // Ensure connection is closed
        });

        connection.execSql(request);

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: err.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
