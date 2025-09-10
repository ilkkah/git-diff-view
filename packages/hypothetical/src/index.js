const { DiffView } = require('./components/DiffView');

const data = {
  oldFile: {
    fileName: 'a.txt',
    content: 'hello world\n',
    fileLang: 'text',
  },
  newFile: {
    fileName: 'b.txt',
    content: 'hello hypothetical!\n',
    fileLang: 'text',
  },
  hunks: ['@@ -1 +1 @@\n-hello world\n+hello hypothetical!'],
};

const diffView = new DiffView({
  data,
  element: document.getElementById('diff-view-container'),
});

diffView.render();
