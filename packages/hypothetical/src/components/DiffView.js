import { Component } from '../Component';
import { DiffFile, DiffModeEnum } from '@git-diff-view/core';
import { DiffSplitView } from './DiffSplitView';
import { DiffUnifiedView } from './DiffUnifiedView';
import template from './DiffView.html';

export class DiffView extends Component {
  constructor(options) {
    super({ ...options, template });

    // Model initialization
    this.model.theme = this.options.diffViewTheme || 'light';
    this.model.fontSize = this.options.diffViewFontSize || 14;
    this.model.class = this.options.class || '';
    this.model.style = this.options.style || '';
    this.model.isSplitView = (this.options.diffViewMode || DiffModeEnum.Split) & DiffModeEnum.Split;

    // Controller logic
    this.initDiff();
  }

  initDiff() {
    const diffFile = this.options.diffFile || new DiffFile(
      this.options.data.oldFile?.fileName || '',
      this.options.data.oldFile?.content || '',
      this.options.data.newFile?.fileName || '',
      this.options.data.newFile?.content || '',
      this.options.data.hunks || [],
      this.options.data.oldFile?.fileLang || '',
      this.options.data.newFile?.fileLang || ''
    );

    if (this.model.isSplitView) {
      this.model.splitView = new DiffSplitView({ diffFile }).render();
    } else {
      this.model.unifiedView = new DiffUnifiedView({ diffFile }).render();
    }
  }
}
