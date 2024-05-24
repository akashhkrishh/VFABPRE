const fs = require('fs');
const crypto = require('crypto');

// Function to compute checksum for a file
function HashValue(filePath, algorithm = 'sha256') {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algorithm);
        const stream = fs.createReadStream(filePath);

        stream.on('error', reject);
        stream.on('data', (data) => {
            hash.update(data);
        });

        stream.on('end', () => {
            const checksum = hash.digest('hex');
            resolve(checksum);
        });
    });
}

module.exports = { HashValue }

