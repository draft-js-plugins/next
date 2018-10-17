const fs = require('fs')
const path = require('path')
const packagePath = path.join(__dirname, '../', 'packages')
const spawn = require('child_process').spawn

const packages = fs
  .readdirSync(packagePath, 'utf8')
  .filter(file => fs.statSync(path.join(packagePath, file)).isDirectory())

const runPublish = folderName =>
  new Promise((resolve, reject) => {
    const process = spawn('npm', ['publish'], {
      stdio: 'inherit',
      cwd: path.join(packagePath, folderName),
    })

    process.on('exit', code => {
      if (code !== 0) {
        reject(code)
      }
      resolve(code)
    })
  })

const publishPackages = packageFolders => {
  const folderName = packageFolders.slice(-1)[0]
  if (folderName != null) {
    return runPublish(folderName).then(() => {
      console.log(`\nPUBLISHED: ${folderName}`)
      publishPackages(packageFolders.slice(0, -1))
    })
  } else {
    console.log('published')
  }
}

publishPackages(packages)
