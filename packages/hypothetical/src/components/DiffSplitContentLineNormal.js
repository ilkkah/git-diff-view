import { Component } from '../Component';
import { checkDiffLineIncludeChange, DiffLineType, SplitSide } from '@git-diff-view/core';
import {
  emptyBGName,
  expandLineNumberColorName,
  getContentBG,
  getLineNumberBG,
  plainLineNumberColorName,
} from '@git-diff-view/utils';
import { useEnableAddWidget, useEnableHighlight, useOnAddWidgetClick } from '../hooks';
import { DiffSplitAddWidget } from './DiffAddWidget';
import { DiffContent } from './DiffContent';
import template from './DiffSplitContentLineNormal.html';

export class DiffSplitContentLineNormal extends Component {
  constructor(options) {
    super({ ...options, template });

    this.index = this.options.index;
    this.side = this.options.side;
    this.diffFile = this.options.diffFile;
    this.lineNumber = this.options.lineNumber;

    this.enableAddWidget = useEnableAddWidget(this.options);
    this.enableHighlight = useEnableHighlight(this.options);
    this.onAddWidgetClick = useOnAddWidgetClick(this.options);

    this.onOpenAddWidget = this.onOpenAddWidget.bind(this);

    this.initModel();
    this.initLines();
  }

  initModel() {
    const currentLine = this.getCurrentLine();
    const hasDiff = !!currentLine?.diff;
    const hasContent = !!currentLine?.lineNumber;
    const isAdded = currentLine?.diff?.type === DiffLineType.Add;
    const isDelete = currentLine?.diff?.type === DiffLineType.Delete;

    this.model.isHidden = currentLine?.isHidden;
    this.model.lineNumber = this.lineNumber;
    this.model.hasDiff = hasDiff;
    this.model.hasContent = hasContent;
    this.model.sideName = this.side === SplitSide.new ? 'new' : 'old';
    this.model.lineNumberBg = getLineNumberBG(isAdded, isDelete, hasDiff);
    this.model.contentBg = getContentBG(isAdded, isDelete, hasDiff);
    this.model.lineNumberColorName = hasDiff ? plainLineNumberColorName : expandLineNumberColorName;
    this.model.enableAddWidget = this.enableAddWidget;
    this.model.hasChange = checkDiffLineIncludeChange(currentLine?.diff);
  }

  initLines() {
    const currentLine = this.getCurrentLine();
    const syntaxLine = this.side === SplitSide.old
      ? this.diffFile.getOldSyntaxLine(currentLine?.lineNumber || 0)
      : this.diffFile.getNewSyntaxLine(currentLine?.lineNumber || 0);
    const plainLine = this.side === SplitSide.old
      ? this.diffFile.getOldPlainLine(currentLine?.lineNumber || 0)
      : this.diffFile.getNewPlainLine(currentLine?.lineNumber || 0);

    this.model.diffContent = new DiffContent({
      enableWrap: false,
      diffFile: this.diffFile,
      rawLine: currentLine?.value || '',
      diffLine: currentLine?.diff,
      plainLine: plainLine,
      syntaxLine: syntaxLine,
      enableHighlight: this.enableHighlight,
    }).render();

    this.model.addWidget = new DiffSplitAddWidget({
      index: this.index,
      lineNumber: currentLine?.lineNumber || 0,
      side: this.side,
      diffFile: this.diffFile,
      onWidgetClick: this.onAddWidgetClick,
      className: 'absolute left-[100%] z-[1] translate-x-[-50%]',
      onOpenAddWidget: this.onOpenAddWidget,
    }).render();

    this.diffFile.subscribe(() => this.initLines());
  }

  getCurrentLine() {
    return this.side === SplitSide.old
      ? this.diffFile.getSplitLeftLine(this.index)
      : this.diffFile.getSplitRightLine(this.index);
  }

  onOpenAddWidget(lineNumber, side) {
    // In a real framework, this would probably dispatch an event
    // to a central store or context.
    console.log('onOpenAddWidget', lineNumber, side);
  }
}
