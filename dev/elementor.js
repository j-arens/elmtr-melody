const octokit = require('@octokit/rest')();
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { exec } = require('child_process');
const url = require('url');

const OWNER = 'pojome';
const REPO = 'elementor';
const PATH = path.resolve(process.cwd(), './dev/elementor');
const DOWNLOAD_PATH = path.resolve(process.cwd(), './dev/temp');

process.on('unhandledRejection', () => {});

const styles = {
    info: chalk.green,
    error: chalk.bgRed.white.bold,
}

const paths = {
    exists: path => fs.existsSync(path),
    make: path => exec(`mkdir ${path}`),
    clear: () => exec(`rm -rf ${PATH}/*`),
}

/**
 * 
 */
const installZip = () => console.log('install zip');

/**
 * 
 * @param {*} req 
 */
const streamToTemp = req => {
    console.log(req);
    if (!paths.exists(DOWNLOAD_PATH)) {
        paths.make(DOWNLOAD_PATH);
    }
    // fs.createWriteStream(path.resolve(`${DOWNLOAD_PATH}`, 'elementor.zip')).on('close', installZip);
    const dest = fs.createWriteStream(path.resolve(`${DOWNLOAD_PATH}`, 'elementor.zip'), { encoding: 'binary' });
    req.on('data', data => {
        console.log('data');
        data => dest.write(data);
    });
    req.on('end', () => {
        console.log('end');
        dest.end();
        installZip();
    });
}

/**
 * 
 * @param {*} param0 
 */
const download = ({ name, zipball_url }) => {
    console.log(styles.info(`Downloading tagged release ${name}...`));
    try {
        const { host, path } = url.parse(zipball_url);
        const params = {
            host,
            path, 
            headers: {
                'user-agent': 'elementor',
            },
        };
        https.get(params, streamToTemp);
    } catch (e) {
        console.log(styles.error('Download of Elementor failed!'));
        console.error(Error(e));
    }
}

/**
 * 
 */
module.exports.getLatest = async () => {
    console.log(styles.info('Getting the latest release of elementor...'));
    try {
        const res = await octokit.repos.getTags({ owner: OWNER, repo: REPO });
        if (!res.data.length) {
            console.log(styles.error('No releases available!'));
            process.exit(0);
        }
        download(res.data[0]);
    } catch (e) {
        console.log(styles.error('Unable to get latest Elementor release!'));
        console.error(Error(e));
    }
}