const path = require('path');
const fs = require('fs');
const http = require('http');
const { execSync } = require('child_process');
const url = require('url');
const colors = require('./colors');

const OWNER = 'pojome';
const REPO = 'elementor';
const DOWNLOAD_DIR = path.resolve(process.cwd(), './dev/temp');
const DOWNLOAD_PATH = path.resolve(DOWNLOAD_DIR, 'elementor.zip');
const INSTALL_DIR = path.resolve(process.cwd(), './dev/elementor');

process.on('unhandledRejection', () => {});

/**
 * file structure utils
 */
const paths = {
    exists: path => fs.existsSync(path),
    make: path => execSync(`mkdir ${path}`),
    clear: path => execSync(`rm -r ${path}/*`),
};

/**
 * Makes a request params object with a user-agent header for github api
 * @param {string} href
 * @return {object} 
 */
const makeReqParams = href => {
    const { host, path } = url.parse(href);
    return {
        host,
        path,
        headers: {
            'user-agent': 'elementor',
        },
    };
};

/**
 * Higher order fn that wraps a req handler and follows redirects before resolving
 * @param {function} next
 * @param {http.ClientRequest} res
 * @return {function} 
 */
const handleRedirect = next => res => {
    const { headers: { status } } = res;
    const statusCode = parseInt(status);
    if ((statusCode >= 300) && (statusCode <= 307)) {
        const { headers: { location } } = res;
        console.log(colors.info(`↩️ Following redirect to ${location}`));
        const params = makeReqParams(location);
        https.get(params, handleRedirect(next));
        return;
    }
    next(res);
};

/**
 * Pick a release object at the specefied offest
 * @param {object} json 
 * @param {number} index
 * @return {object} 
 */
const pick = (json, index) => {
    if (!json.length) {
        console.log(colors.error('😱 No releases available!'));
        process.exit(0);
    }
    if ((index < 0) || (index > (json.length - 1))) {
        console.log(colors.error(`😱 No release at index ${index}!`));
        process.exit(0);
    }
    return json[index];
};

/**
 * Unzips a release, moves it, and does a little housekeeping
 */
const installZip = () => {
    if (paths.exists(INSTALL_DIR)) {
        paths.clear(INSTALL_DIR);
    }
    console.log(colors.info(`🌟 Extracting to ${INSTALL_DIR}`));
    execSync(`unzip ${DOWNLOAD_PATH} -d ${INSTALL_DIR}`);
    execSync(`cd ${INSTALL_DIR} && PDIR=$(ls | head -1) && shopt -s dotglob && mv $PDIR/* . && rm -r $PDIR`);
};

/**
 * Stream packaged release to temp downloads dir
 * @param {http.ClientRequest} res 
 */
const streamToTemp = res => {
    if (!paths.exists(DOWNLOAD_DIR)) {
        paths.make(DOWNLOAD_DIR);
    }
    const dest = fs.createWriteStream(DOWNLOAD_PATH, { encoding: 'binary' });
    res.pipe(dest);
    res.on('end', installZip);
};

/**
 * Makes a request for the given release zip
 * @param {object} obj
 * @param {string} obj.name - name
 * @param {string} obj.zipball_url - zipball_url
 */
const download = ({ name, zipball_url }) => {
    console.log(colors.info(`⬇️ Downloading release tagged ${name}...`));
    try {
        const params = makeReqParams(zipball_url);
        https.get(params, handleRedirect(streamToTemp));
    } catch (e) {
        console.log(colors.error('😱 Download of Elementor failed!'));
        console.error(Error(e));
    }
};

/**
 * Get the latest tagged release of elementor and unzip it
 */
const getLatest = () => {
    console.log(colors.info('📡 Getting the latest release of elementor...'));
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
        console.log(colors.error('😱 Unable to get latest Elementor release!'));
        console.error(Error(e));
    }
};

module.exports = getLatest;
