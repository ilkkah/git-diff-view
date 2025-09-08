import { Component } from '../Component';
import { getUnifiedContentLine, getPlainLineTemplate, getPlainDiffTemplate } from '@git-diff-view/core';
import template from './DiffUnifiedView.html';

export class DiffUnifiedView extends Component {
  constructor(options) {
    super({ ...options, template });

    // Controller logic
    this.generateLines();
  }

  generateLines() {
    const diffFile = this.options.diffFile;
    diffFile.initRaw();
    diffFile.buildUnifiedDiffLines();

    const unifiedLines = getUnifiedContentLine(diffFile);

    const lines = [];

    for (const item of unifiedLines) {
      const { unifiedLine } = item;
      const template = unifiedLine.isChanged ? getPlainDiffTemplate({ diffLine: unifiedLine, rawLine: unifiedLine.content, operator: unifiedLine.type === 'add' ? 'add' : 'del' }) : getPlainLineTemplate(unifiedLine.content);
      lines.push({
        oldLineNumber: unifiedLine.oldLineNumber,
        newLineNumber: unifiedLine.newLineNumber,
        content: template || getPlainLineTemplate(unifiedLine.content),
      });
    }

    this.model.lines = lines;
  }
}
