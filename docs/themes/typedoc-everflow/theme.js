"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const events_1 = require("typedoc/dist/lib/output/events");
const theme_1 = require("typedoc-plugin-markdown/dist/theme");

const findRoot = function(outputDirectory) {
        const docsName = 'docs';
        function splitPath(dir) {
            const parts = dir.split(/(\/|\\)/);
            if (!parts.length) {
                return parts;
            }
            return !parts[0].length ? parts.slice(1) : parts;
        }
        function testDir(parts) {
            if (parts.length === 0) {
                return null;
            }
            const p = parts.join('');
            const itdoes = fs.existsSync(path.join(p, docsName));
            return itdoes ? p : testDir(parts.slice(0, -1));
        }
        return testDir(splitPath(outputDirectory));
}

class VuePressTheme extends theme_1.default {

    packageJson = {};

    constructor(renderer, basePath) {
        super(renderer, basePath);
        this.listenTo(renderer, events_1.RendererEvent.START, this.onRendererSTART, 1024);
        this.listenTo(renderer, events_1.RendererEvent.END, this.onRendererEnd, 1024);
    }

    onRendererEnd(renderer) {
        const root = findRoot(renderer.outputDirectory);
        this.packageJson = require(path.join(root, 'package.json'));
        if (root === null) {
            this.application.logger.warn(`[typedoc-markdown-plugin] sidebars.json not written as could not locate VuePress root directory. In order to to implemnent sidebars.json functionality, the output directory must be a child of a 'docs' directory.`);
            return;
        }
        this.copyReadMe(renderer, root);
        this.writeSideBar(renderer, root);
    }

    copyReadMe(renderer, root)
    {
        const readmePath = path.join(root, 'docs', 'README.md');
        const readmeDistPath = path.join(root, 'docs', 'dist', 'README.md');
        const readme = fs.readFileSync(readmePath, {encoding:'utf8', flag:'r'}); 
        let result = readme.replace(/{{version}}/g, this.packageJson.version);
        fs.writeFileSync(readmeDistPath, result);
    }

    writeSideBar(renderer, root) {
        const childDirectory = renderer.outputDirectory.split(root + 'docs/')[1];
        const docsRoot = childDirectory ? childDirectory + '/' : '';
        const vuePressRoot = root + 'docs/dist/.vuepress';
        const everflowDocs = path.join(root, 'docs');
        const everflowDocsDistAssets = path.join(root, 'docs', 'dist', 'assets');
        const everflowAssets = path.join(root, 'assets');
        const vuePressConfig = path.join(root, 'docs', '.vuepress', 'config.js');
        const vuePressConfigDist = path.join(vuePressRoot, 'config.js')
        const navObject = this.getNavObject(renderer, docsRoot);
        const sidebarPath = vuePressRoot + '/api-sidebar.json';
        const relativeNavObject = this.getNavObject(renderer);
        const relativeSidebarPath = vuePressRoot + '/api-sidebar-relative.json';
        if (!fs.existsSync(vuePressRoot)) {
            fs.mkdirSync(vuePressRoot);
        }
        if (!fs.existsSync(everflowDocsDistAssets)) {
            fs.mkdirSync(everflowDocsDistAssets);
        }
        if (fs.existsSync(vuePressConfigDist)){
            fs.unlinkSync(vuePressConfigDist);
        }
        // fs.copyFileSync(path.join(everflowAssets, 'everflow-logo.png'), path.join(everflowDocsDistAssets, 'everflow-logo.png'));
        // fs.copyFileSync(path.join(everflowAssets, 'favicon.png'), path.join(everflowDocsDistAssets, 'favicon.png'));
        fs.copyFileSync(vuePressConfig, vuePressConfigDist);
        try {
            fs.writeFileSync(sidebarPath, JSON.stringify(navObject, null, 2));
            fs.writeFileSync(relativeSidebarPath, JSON.stringify(relativeNavObject, null, 2));
            this.application.logger.write(`[typedoc-plugin-markdown] sidebars.json updated at ${sidebarPath}`);
        }
        catch (e) {
            this.application.logger.write(`[typedoc-plugin-markdown] failed to update sidebars.json at ${sidebarPath}`);
        }
    }
    getNavObject(renderer, docsRoot = '') {
        const projectUrls = [docsRoot + this.indexName.replace('.md', '')];
        if (renderer.project.url === 'globals.md') {
            projectUrls.push(docsRoot + 'globals');
        }
        const navObject = [];
        navObject.push({
            title: `version: ${this.packageJson.version}`
        })
        this.getNavigation(renderer.project).children.forEach(rootNavigation => {
            navObject.push({
                title: rootNavigation.title,
                children: rootNavigation.children.map(item => {
                    return docsRoot + item.url.replace('.md', '');
                }),
            });
        });
        return navObject;
    }
}
exports.default = VuePressTheme;
