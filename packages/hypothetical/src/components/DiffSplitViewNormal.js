import { Component } from '../Component';
import { SplitSide } from '@git-diff-view/core';
import { useFontSize, useIsMounted, useTextWidth } from '../hooks';
import { DiffSplitViewTable } from './DiffSplitViewTable';
import template from './DiffSplitViewNormal.html';

export class DiffSplitViewNormal extends Component {
  constructor(options) {
    super({ ...options, template });

    this.diffFile = this.options.diffFile;
    this.isMounted = useIsMounted();
    this.fontSize = useFontSize(this.options);

    this.model.diffFileId = this.diffFile.getId();
    this.model.asideWidth = 40;
    this.model.selectStyle = false;

    this.selectState = { current: undefined };

    this.onMount = this.onMount.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.initAsideWidth();
    this.renderTables();

    setTimeout(this.onMount, 0);
  }

  onMount() {
    this.initSyncScroll();
  }

  initSyncScroll() {
    if (!this.isMounted) return;
    const left = this.element.querySelector('.old-diff-table-wrapper');
    const right = this.element.querySelector('.new-diff-table-wrapper');
    if (left && right) {
      // syncScroll(left, right); // This would be a utility function
    }
  }

  onSelect(side) {
    this.model.selectStyle = !!side;
  }

  initAsideWidth() {
    const maxText = Math.max(this.diffFile.fileLineLength, this.diffFile.splitLineLength).toString();
    const font = { fontSize: this.fontSize + 'px', fontFamily: 'Menlo, Consolas, monospace' };
    const width = useTextWidth({ text: maxText, font });
    this.model.asideWidth = Math.max(40, width + 25);
  }

  renderTables() {
    const commonOptions = {
      ...this.options,
      onSelect: this.onSelect,
      selectState: this.selectState,
    };
    this.model.oldTableView = new DiffSplitViewTable({ ...commonOptions, side: SplitSide.old }).render();
    this.model.newTableView = new DiffSplitViewTable({ ...commonOptions, side: SplitSide.new }).render();
  }
}
