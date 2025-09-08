import derby from 'derby';
import { DiffFile, SplitSide, DiffModeEnum } from '@git-diff-view/core';
import { DiffSplitView } from './DiffSplitView';
import { DiffUnifiedView } from './DiffUnifiedView';

// This is a best-effort translation of the SolidJS component to a DerbyJS component.
// It is not functional.

export class GitDiffView extends derby.Component {
  init(model) {
    this.model = model;

    // props mapping
    this.data = model.get('data');
    this.extendData = model.get('extendData');
    this.initialWidgetState = model.get('initialWidgetState');
    this.diffFile = model.get('diffFile');
    this.class = model.get('class');
    this.style = model.get('style');
    this.registerHighlighter = model.get('registerHighlighter');
    this.diffViewMode = model.get('diffViewMode') || DiffModeEnum.Split;
    this.diffViewWrap = model.get('diffViewWrap');
    this.diffViewTheme = model.get('diffViewTheme');
    this.diffViewFontSize = model.get('diffViewFontSize');
    this.diffViewHighlight = model.get('diffViewHighlight');
    this.diffViewAddWidget = model.get('diffViewAddWidget');
    this.renderWidgetLine = model.get('renderWidgetLine');
    this.renderExtendLine = model.get('renderExtendLine');
    this.onAddWidgetClick = model.get('onAddWidgetClick');
  }

  create() {
    // This is where the component would be rendered.
    // In Derby, this is typically done with templates.
    // Here, we are just creating an HTML string as a placeholder.

    const diffFile = this.diffFile || new DiffFile(
      this.data.oldFile?.fileName || '',
      this.data.oldFile?.content || '',
      this.data.newFile?.fileName || '',
      this.data.newFile?.content || '',
      this.data.hunks || [],
      this.data.oldFile?.fileLang || '',
      this.data.newFile?.fileLang || ''
    );

    // The reactive logic from the Solid component would go here.
    // This would involve setting up model listeners and reactive functions.
    // For example:
    // this.model.on('change', 'diffViewMode', () => { ... });

    const diffViewHtml = this.diffViewMode & DiffModeEnum.Split
      ? DiffSplitView.render(diffFile)
      : DiffUnifiedView.render(diffFile);

    this.element.innerHTML = `
      <div
        class="diff-tailwindcss-wrapper"
        data-component="git-diff-view"
        data-theme="${this.diffViewTheme || 'light'}"
      >
        <div class="diff-style-root" style="font-size: ${this.diffViewFontSize || 14}px">
          <div class="diff-view-wrapper ${this.class || ''}" style="${this.style || ''}">
            ${diffViewHtml}
          </div>
        </div>
      </div>
    `;
  }
}
