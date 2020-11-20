const fs = require('fs-extra')
const path = require('path')
const execSync = require('child_process').execSync

const copyRecursiveSync = function(src, dest)
{
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest))
        {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                              path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};


class removeDirRecursive
{
    parent = '';
    keepParent = false;
    keepGit = true;

    constructor(folder, keepParent = false, keepGit = true)
    {
        this.parent = folder;
        this.keepParent = keepParent;
        this.keepGit = keepGit;
        this.removeDir(folder)
    }

    removeDir(folder)
    {
        if (fs.existsSync(folder)) {
            fs.readdirSync(folder).forEach((file, index) => {
                const curPath = path.join(folder, file);
          if (fs.lstatSync(curPath).isDirectory()) { // recurse
              if (this.keepGit && curPath.includes('.git')){
                  return;
              }
              this.removeDir(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
            if (this.keepParent === false)
            {
                fs.rmdirSync(folder);
            }
            if (folder !== this.parent)
            {
                fs.rmdirSync(folder);
            }
        }
    }
}

class DeployDocs {

    gitPath = ''

    constructor()
    {
        this.gitPath = path.join(__dirname, '_temp_git_clone')
    }

    cloneGitRepo()
    {
        if (!fs.existsSync(this.gitPath))
        {
            fs.mkdirSync(this.gitPath)
        } else {
            let removeDir = new removeDirRecursive(this.gitPath, true, false);
        }
        const gitCLone = execSync(`git clone https://github.com/everflowjs/api.git ${this.gitPath}`);
        copyRecursiveSync(path.join(__dirname, 'dist', '.vuepress', 'dist'), this.gitPath)
        const gitCommands = execSync('git add -A && git commit -m "auto-commit on deploy."', {cwd: this.gitPath});
        const prompts = require('prompts');

        (async () => {
            const response = await prompts({
                type: 'text',
                name: 'key',
                message: 'Enter Git Key:'
            });
            execSync(`git push https://${response.key}:${response.key}@github.com/everflowjs/api.git master`,  {
                cwd: this.gitPath
            });
        })();
    }
}

let deploy = new DeployDocs();
deploy.cloneGitRepo();