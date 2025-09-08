import derby from 'derby';
import { getUnifiedContentLine } from '@git-diff-view/core';
import { DiffUnifiedContentLine } from './DiffUnifiedContentLine';
import { DiffUnifiedExtendLine } from './DiffUnifiedExtendLine';
import { DiffUnifiedHunkLine } from './DiffUnifiedHunkLine';
import { DiffUnifiedWidgetLine } from './DiffUnifiedWidgetLine';

// This is a best-effort translation of the SolidJS component to a DerbyJS component.
// It is not functional.

export class DiffUnifiedView extends derby.Component {
  init(model) {
    this.model = model;
    this.diffFile = model.get('diffFile');
    this.enableWrap = model.get('enableWrap');
  }

  create() {
    // Component creation logic would go here.
  }

  static render(diffFile) {
    const lines = getUnifiedContentLine(diffFile);
    let linesHtml = '';

    for (const item of lines) {
      linesHtml += DiffUnifiedHunkLine.render(item);
      linesHtml += DiffUnifiedContentLine.render(item);
      linesHtml += DiffUnifiedWidgetLine.render(item);
      linesHtml += DiffUnifiedExtendLine.render(item);
    }

    return `
      <div class="unified-diff-view">
        <div class="unified-diff-table-wrapper">
          <table>
            <tbody>
              ${linesHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
