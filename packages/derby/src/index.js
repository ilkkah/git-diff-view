import derby from 'derby';
import { GitDiffView } from './components/DiffView';

const app = derby.createApp('git-diff-view-derby', __filename);

app.loadViews(__dirname);
app.loadStyles(__dirname);

app.component('GitDiffView', GitDiffView);

app.page('home', (page, model) => {
  const data = {
    oldFile: {
      fileName: 'a.txt',
      content: 'hello world\n',
      fileLang: 'text',
    },
    newFile: {
      fileName: 'b.txt',
      content: 'hello derby!\n',
      fileLang: 'text',
    },
    hunks: ['@@ -1 +1 @@\n-hello world\n+hello derby!'],
  };

  model.set('diffData', data);
  page.render({
    data: '{{diffData}}'
  });
});

derby.ready(() => {
  const app = derby.createApp();
  const page = app.createPage();
  page.get('home');
});
