const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { execSync } = require('child_process');
const url = require('url');

const OWNER = 'pojome';
const REPO = 'elementor';
const DOWNLOAD_DIR = path.resolve(process.cwd(), './dev/temp');
const DOWNLOAD_PATH = path.resolve(DOWNLOAD_DIR, 'elementor.zip');
const INSTALL_DIR = path.resolve(process.cwd(), './dev/elementor');

process.on('unhandledRejection', () => {});

const styles = {
    info: chalk.green,
    error: chalk.bgRed.white.bold,
}

const paths = {
    exists: path => fs.existsSync(path),
    make: path => exec(`mkdir ${path}`),
    // clear: path => execSync(`rm -rf ${path}/*`),
}

const makeReqParams = href => {
    const { host, path } = url.parse(href);
    return {
        host,
        path,
        headers: {
            'user-agent': 'elementor', // github api requirement
        },
    };
};

const handleRedirect = next => res => {
    const { headers: { status } } = res;
    const statusCode = parseInt(status);
    if ((statusCode >= 300) && (statusCode <= 307)) {
        const { headers: { location } } = res;
        console.log(styles.info(`↩️ Following redirect to ${location}`));
        const params = makeReqParams(location);
        https.get(params, handleRedirect(next));
        return;
    }
    next(res);
};

const pick = (json, index) => {
    if (!json.length) {
        console.log(styles.error('😱 No releases available!'));
        process.exit(0);
    }
    if ((index < 0) || (index > (json.length - 1))) {
        console.log(styles.error(`😱 No release at index ${index}!`));
        process.exit(0);
    }
    return json[index];
};

const installZip = () => {
    // if (paths.exists(INSTALL_PATH)) {
    //     paths.clear(INSTALL_PATH);
    // }

    console.log(styles.info(`🌟 Extracting to ${INSTALL_DIR}`));
    execSync(`unzip ${DOWNLOAD_PATH} -d ${INSTALL_DIR}`);
    // execSync(`cd ${INSTALL_DIR} && mv "$(ls | head -1)"/* .`, (e, stdout, stderr) => {
    //     console.log('e', e);
    //     console.log('stdout', stdout);
    //     console.log('stderr', stderr);
    // });
    // execSync(`rm -rf ${INSTALL_DIR}`)

    execSync(`
        #!/bin/bash
        cd ${INSTALL_DIR}
        PDIR=$(ls | head -1)
        mv $PDIR/* .
        rm $PDIR
    `, (e, stdout, stderr) => {
        console.log('e', e);
        console.log('stdout', stdout);
        console.log('stderr', stderr);
    });
};

// mv "$(DIR)"/* .

const streamToTemp = res => {
    if (!paths.exists(DOWNLOAD_DIR)) {
        paths.make(DOWNLOAD_DIR);
    }
    const dest = fs.createWriteStream(DOWNLOAD_PATH, { encoding: 'binary' });
    res.pipe(dest);
    res.on('end', installZip);
};

const download = ({ name, zipball_url }) => {
    console.log(styles.info(`⬇️ Downloading release tagged ${name}...`));
    try {
        const params = makeReqParams(zipball_url);
        https.get(params, handleRedirect(streamToTemp));
    } catch (e) {
        console.log(styles.error('😱 Download of Elementor failed!'));
        console.error(Error(e));
    }
};

/**
 * 
 */
module.exports.getLatest = async () => {
    console.log(styles.info('📡 Getting the latest release of elementor...'));
    try {
        const params = makeReqParams(`https://api.github.com/repos/${OWNER}/${REPO}/tags`);
        https.get(params, res => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', data => body += data);
            res.on('end', () => {
                const release = pick(JSON.parse(body), 0);
                download(release);
            });
        });
    } catch (e) {
        console.log(styles.error('😱 Unable to get latest Elementor release!'));
        console.error(Error(e));
    }
};
