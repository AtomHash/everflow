const fs = require('fs-extra')
const path = require('path')

const removeDir = function(folder)
{
    if (fs.existsSync(folder)) {
        fs.readdirSync(folder).forEach((file, index) => {
            const curPath = path.join(folder, file);
          if (fs.lstatSync(curPath).isDirectory()) { // recurse
              removeDir(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
        fs.rmdirSync(folder);
    }
}
const cleanUpGitPath = path.join(__dirname, '_temp_git_clone')
if (fs.existsSync(cleanUpGitPath))
{
    removeDir(path.join(__dirname, '_temp_git_clone'));
    console.log('Spring cleaning finished.');
} else {
    console.log('No deploy to clean.');
}
