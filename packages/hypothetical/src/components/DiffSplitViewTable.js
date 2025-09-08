import { Component } from '../Component';
import { getSplitContentLines, SplitSide } from '@git-diff-view/core';
import { DiffSplitHunkLine } from './DiffSplitHunkLineNormal';
import { DiffSplitContentLine } from './DiffSplitContentLineNormal';
import { DiffSplitWidgetLine } from './DiffSplitWidgetLineNormal';
import { DiffSplitExtendLine } from './DiffSplitExtendLineNormal';
import template from './DiffSplitViewTable.html';

export class DiffSplitViewTable extends Component {
  constructor(options) {
    super({ ...options, template });

    this.diffFile = this.options.diffFile;
    this.side = this.options.side;
    this.onSelect = this.options.onSelect;
    this.selectState = this.options.selectState;

    this.model.className = this.side === SplitSide.new ? 'new-diff-table' : 'old-diff-table';
    this.model.sideName = this.side === SplitSide.new ? 'new' : 'old';

    this.on('mousedown', '.diff-table-body', this.handleMouseDown);

    this.initLines();
  }

  initLines() {
    const lines = getSplitContentLines(this.diffFile);
    this.model.lines = lines.map(item => ({
      hunkLine: new DiffSplitHunkLine({ ...this.options, ...item }).render(),
      contentLine: new DiffSplitContentLine({ ...this.options, ...item }).render(),
      widgetLine: new DiffSplitWidgetLine({ ...this.options, ...item }).render(),
      extendLine: new DiffSplitExtendLine({ ...this.options, ...item }).render(),
    }));

    this.model.finalHunkLine = new DiffSplitHunkLine({
      ...this.options,
      index: this.diffFile.splitLineLength,
      lineNumber: this.diffFile.splitLineLength,
    }).render();

    this.diffFile.subscribe(() => this.initLines());
  }

  handleMouseDown(e) {
    let ele = e.target;
    if (ele && ele.nodeName === 'BUTTON') {
      // removeAllSelection();
      return;
    }
    while (ele) {
      const state = ele.getAttribute('data-state');
      if (state) {
        if (state === 'extend' || state === 'hunk' || state === 'widget') {
          if (this.selectState.current !== undefined) {
            this.selectState.current = undefined;
            this.onSelect?.(undefined);
            // removeAllSelection();
          }
        } else {
          if (this.selectState.current !== this.side) {
            this.selectState.current = this.side;
            this.onSelect?.(this.side);
            // removeAllSelection();
          }
        }
        return;
      }
      ele = ele.parentElement;
    }
  }
}
