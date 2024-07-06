import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;
const __dirname = path.resolve();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to read data from the file
const readData = (callback) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return callback(err);
        }
        if (!data) {
            return callback(null, []);
        }
        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (parseErr) {
            callback(parseErr);
        }
    });
};

// Helper function to write data to the file
const writeData = (data, callback) => {
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Read existing data
    readData((readErr, existingData) => {
        if (readErr) {
            return res.status(500).json({ error: 'Error reading data file' });
        }

        // Add new form data
        existingData.push(formData);

        // Write updated data to file
        writeData(existingData, (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Error writing data file' });
            }
            res.status(200).json({ message: 'Form data saved successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
