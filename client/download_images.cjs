const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    };
    https.get(url, options, function(response) {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(resolve);
        });
      } else {
        fs.unlink(dest, () => reject(new Error(`Status: ${response.statusCode}`)));
      }
    }).on('error', function(err) {
      fs.unlink(dest, () => reject(err));
    });
  });
}

(async () => {
    try {
        await download('https://vivosa.co.uk/wp-content/uploads/2025/08/Screenshot_9-1.png', 'public/images/lining_swatch_1.png');
        await download('https://vivosa.co.uk/wp-content/uploads/2025/08/Screenshot_10-1.png', 'public/images/lining_swatch_2.png');
        await download('https://vivosa.co.uk/wp-content/uploads/2025/08/Screenshot_11-1.png', 'public/images/lining_swatch_3.png');
        console.log('Downloaded successfully');
    } catch(err) {
        console.log('Failed:', err);
    }
})();
