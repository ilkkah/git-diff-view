import { Component } from '../Component';
import { getSplitContentLines, getPlainLineTemplate, getPlainDiffTemplate } from '@git-diff-view/core';
import template from './DiffSplitView.html';

export class DiffSplitView extends Component {
  constructor(options) {
    super({ ...options, template });

    // Controller logic
    this.generateLines();
  }

  generateLines() {
    const diffFile = this.options.diffFile;
    diffFile.initRaw();
    diffFile.buildSplitDiffLines();

    const splitLines = getSplitContentLines(diffFile);

    const oldLines = [];
    const newLines = [];

    for (const item of splitLines) {
      const { left, right } = item.splitLine;

      if (left.type === 'empty') {
        oldLines.push({ lineNumber: '', content: '' });
      } else {
        const template = left.isChanged ? getPlainDiffTemplate({ diffLine: left, rawLine: left.content, operator: 'del' }) : getPlainLineTemplate(left.content);
        oldLines.push({ lineNumber: left.lineNumber, content: template || getPlainLineTemplate(left.content) });
      }

      if (right.type === 'empty') {
        newLines.push({ lineNumber: '', content: '' });
      } else {
        const template = right.isChanged ? getPlainDiffTemplate({ diffLine: right, rawLine: right.content, operator: 'add' }) : getPlainLineTemplate(right.content);
        newLines.push({ lineNumber: right.lineNumber, content: template || getPlainLineTemplate(right.content) });
      }
    }

    this.model.oldLines = oldLines;
    this.model.newLines = newLines;
  }
}
