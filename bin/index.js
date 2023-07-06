#!/usr/bin/env node

const { Command } = require('commander')
const prompts = require('prompts')
const path = require('path')
const fs = require('fs-extra')
const validateProjectName = require('validate-npm-package-name')
const os = require('os')
const {
  cyan,
  green,
  magenta,
  red,
  blue,
} = require('kolorist')
const packageJson = require('../package.json')

// 可用的模板
const templateList = [
  {
    title: cyan('react-app'),
    value: 'react-app',
  },
  {
    title: cyan('react-app-ts'),
    value: 'react-app-ts',
  },
  {
    title: magenta('ts-lib'),
    value: 'ts-library',
  },
  {
    title: magenta('react-lib'),
    value: 'react-lib',
  },
]

async function init() {
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .argument('<project-directory>')
    .action(async (name) => {
      const root = path.resolve(name)
      const appName = path.basename(root)

      checkAppName(appName)
      fs.ensureDirSync(name)

      try {
        const response = await prompts(
          [
            {
              type: () => (isSafeToCreateProjectIn(root, name) ? null : 'confirm'),
              name: 'overwrite',
              message: 'Remove existing files and continue?',
              initial: false,
            },
            {
              type: (_, { overwrite }) => {
                if (overwrite === false) {
                  throw new Error(`${red('✖')} Operation cancelled`)
                }
                return null
              },
              name: 'overwriteChecker',
            },
            {
              type: 'select',
              name: 'template',
              message: 'Select a template',
              choices: templateList,
            },
          ],
          {
            onCancel: () => {
              throw new Error(`${red('✖')} Operation cancelled`)
            },
          },
        )

        const { template, overwrite } = response

        if (overwrite) {
          cleanDir(root)
        }
        createApp(root, appName, template)
      } catch (cancelled) {
        console.log(cancelled.message)
      }
    })
    .on('--help', () => {
    })
    .parse(process.argv)
}

/**
 * 创建应用至指定路径，并且将应用名称等信息与模板中预设的package.json合并
 * @param appPath
 * @param appName
 * @param template
 * @returns {Promise<void>}
 */
async function createApp(appPath, appName, template) {
  const templatePath = path.join(__dirname, `../templates/${template}`)
  const templateJsonPath = path.join(templatePath, 'template.json')

  let templateJson = {}
  if (fs.existsSync(templateJsonPath)) {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    templateJson = require(templateJsonPath)
  }

  const appPackage = {
    name: appName,
    version: '0.1.0',
    private: true,
  }
  const templatePackage = templateJson.package || {}
  Object.assign(appPackage, templatePackage)

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2) + os.EOL,
  )

  const templateDir = path.join(templatePath, 'template')
  copyDir(appPath, appName, templateDir).then(() => {
    console.log('')
    console.log('Success! Now run: ')
    console.log('')
    console.log(`  cd ${appName}`)
    console.log('  npm install')
    console.log('  npm run dev')
  })
}

/**
 * 校验包名称是否有效
 * @param appName
 */
function checkAppName(appName) {
  const validationResult = validateProjectName(appName)
  if (!validationResult.validForNewPackages) {
    console.error(
      red(
        `Cannot create a project named ${green(
          `"${appName}"`,
        )} because of npm naming restrictions:\n`,
      ),
    );
    [
      ...(validationResult.errors || []),
      ...(validationResult.warnings || []),
    ].forEach((error) => {
      console.error(red(`  * ${error}`))
    })
    console.error(red('\nPlease choose a different project name.'))
    process.exit(1)
  }
}

let conflicts = []
/**
 * 判断指定路径下的文件夹是否为空
 * @param root
 * @param name
 * @returns {boolean}
 */
function isSafeToCreateProjectIn(root, name) {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitignore',
    '.idea',
    'README.md',
    'package.json',
    'package-lock.json',
    'yarn-lock.json',
  ]
  const errorLogFilePatterns = [
    'npm-debug.log',
    'yarn-error.log',
    'yarn-debug.log',
  ]
  const isErrorLog = (file) => errorLogFilePatterns.some((pattern) => file.startsWith(pattern))

  conflicts = fs
    .readdirSync(root)
    .filter((file) => !validFiles.includes(file))
    .filter((file) => !isErrorLog(file))

  if (conflicts.length > 0) {
    console.log(
      `The directory ${green(name)} contains files that could conflict:`,
    )
    console.log('')
    conflicts.forEach((file) => {
      try {
        const stats = fs.lstatSync(path.join(root, file))
        if (stats.isDirectory()) {
          console.log(`  ${blue(`${file}/`)}`)
        } else {
          console.log(`  ${file}`)
        }
      } catch (e) {
        console.log(`  ${file}`)
      }
    })
    console.log()
    console.log(
      'Either try using a new directory name, or remove the files listed above.',
    )
    console.log()

    return false
  }

  fs.readdirSync(root).forEach((file) => {
    if (isErrorLog(file)) {
      fs.removeSync(path.join(root, file))
    }
  })
  return true
}

/**
 * 拷贝应用模版至指定路径下
 * @param appPath
 * @param appName
 * @param templateDir
 * @returns {Promise<unknown>}
 */
function copyDir(appPath, appName, templateDir) {
  return new Promise((resolve) => {
    if (fs.existsSync(templateDir)) {
      fs.copySync(templateDir, appPath)
      resolve()
    } else {
      console.error(`Could not locate supplied template: ${green(templateDir)}`)
      process.exit(1)
    }
  })
}

/**
 * 清空指定路径下的所有文件及文件夹
 * @param root
 */
function cleanDir(root) {
  if (!fs.pathExistsSync(root)) {
    return
  }

  fs.readdirSync(root).forEach((file) => {
    fs.rmSync(path.resolve(root, file), { recursive: true, force: true })
  })
}

init()
