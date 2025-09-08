import derby from 'derby';
import { DiffFile, getSplitContentLines, getPlainLineTemplate, getPlainDiffTemplate, SplitSide } from '@git-diff-view/core';

const app = derby.createApp('git-diff-view-derby', __filename);

app.loadViews(__dirname);

app.component('GitDiffView', class extends derby.Component {
  create() {
    const oldFile = {
      fileName: 'a.txt',
      content: 'hello world\n',
      fileLang: 'text',
    };
    const newFile = {
      fileName: 'b.txt',
      content: 'hello derby!\n',
      fileLang: 'text',
    };
    const hunks = ['@@ -1 +1 @@\n-hello world\n+hello derby!'];

    const diffFile = new DiffFile(
      oldFile.fileName,
      oldFile.content,
      newFile.fileName,
      newFile.content,
      hunks,
      oldFile.fileLang,
      newFile.fileLang
    );

    diffFile.initRaw();
    diffFile.buildSplitDiffLines();
    diffFile.buildUnifiedDiffLines();

    const splitLines = getSplitContentLines(diffFile);

    let oldLinesHtml = '';
    let newLinesHtml = '';

    for (const item of splitLines) {
      const { left, right } = item.splitLine;

      if (left.type === 'empty') {
        oldLinesHtml += '<tr><td></td><td></td></tr>';
      } else {
        const template = left.isChanged ? getPlainDiffTemplate({ diffLine: left, rawLine: left.content, operator: 'del' }) : getPlainLineTemplate(left.content);
        oldLinesHtml += `<tr><td>${left.lineNumber}</td><td>${template || getPlainLineTemplate(left.content)}</td></tr>`;
      }

      if (right.type === 'empty') {
        newLinesHtml += '<tr><td></td><td></td></tr>';
      } else {
        const template = right.isChanged ? getPlainDiffTemplate({ diffLine: right, rawLine: right.content, operator: 'add' }) : getPlainLineTemplate(right.content);
        newLinesHtml += `<tr><td>${right.lineNumber}</td><td>${template || getPlainLineTemplate(right.content)}</td></tr>`;
      }
    }

    const target = document.getElementById('diff-view-container');
    target.innerHTML = `
      <div class="split-diff-view">
        <div class="old-diff-table-wrapper">
          <table>
            <tbody>${oldLinesHtml}</tbody>
          </table>
        </div>
        <div class="new-diff-table-wrapper">
          <table>
            <tbody>${newLinesHtml}</tbody>
          </table>
        </div>
      </div>
    `;
  }
});

app.page('home', (page, model, params, next) => {
  page.render('home');
});

derby.ready(() => {
  const app = derby.createApp();
  const page = app.createPage();
  const component = page.get('home');
  page.render(document.body, component);
});
