const { Component } = require('../Component');
const { getUnifiedContentLine } = require('@git-diff-view/core');
const { useEnableWrap, useFontSize, useTextWidth } = require('../hooks');
const { DiffUnifiedContentLine } = require('./DiffUnifiedContentLine');
const { DiffUnifiedExtendLine } = require('./DiffUnifiedExtendLine');
const { DiffUnifiedHunkLine } = require('./DiffUnifiedHunkLine');
const { DiffUnifiedWidgetLine } = require('./DiffUnifiedWidgetLine');
const template = require('./DiffUnifiedView.html');

class DiffUnifiedView extends Component {
  constructor(options) {
    super({ ...options, template });

    this.diffFile = this.options.diffFile;
    this.enableWrap = useEnableWrap(this.options);
    this.fontSize = useFontSize(this.options);

    this.model.enableWrap = this.enableWrap;
    this.model.diffFileId = this.diffFile.getId();
    this.model.lines = [];
    this.model.finalHunkLine = '';
    this.model.asideWidth = 40;
    this.model.selectStyle = false;

    this.on('mousedown', '.diff-table-body', this.handleMouseDown);

    this.initLines();
    this.initAsideWidth();
  }

  initLines() {
    const lines = getUnifiedContentLine(this.diffFile);
    this.model.lines = lines.map(item => ({
      hunkLine: new DiffUnifiedHunkLine({ ...this.options, ...item }).render(),
      contentLine: new DiffUnifiedContentLine({ ...this.options, ...item }).render(),
      widgetLine: new DiffUnifiedWidgetLine({ ...this.options, ...item }).render(),
      extendLine: new DiffUnifiedExtendLine({ ...this.options, ...item }).render(),
    }));

    this.model.finalHunkLine = new DiffUnifiedHunkLine({
      ...this.options,
      index: this.diffFile.unifiedLineLength,
      lineNumber: this.diffFile.unifiedLineLength,
    }).render();

    this.diffFile.subscribe(() => this.initLines());
  }

  initAsideWidth() {
    const maxText = Math.max(this.diffFile.unifiedLineLength, this.diffFile.fileLineLength).toString();
    const font = { fontSize: this.fontSize + 'px', fontFamily: 'Menlo, Consolas, monospace' };
    const width = useTextWidth({ text: maxText, font });
    this.model.asideWidth = Math.max(40, width + 10);
  }

  handleMouseDown(e) {
    let ele = e.target;
    if (ele && ele.nodeName === 'BUTTON') {
      // removeAllSelection(); // This would be a utility function
      return;
    }
    while (ele) {
      const state = ele.getAttribute('data-state');
      if (state) {
        if (state === 'extend' || state === 'hunk' || state === 'widget') {
          this.model.selectStyle = false;
        } else {
          this.model.selectStyle = true;
        }
        // removeAllSelection();
        return;
      }
      ele = ele.parentElement;
    }
  }
}
module.exports = { DiffUnifiedView };
