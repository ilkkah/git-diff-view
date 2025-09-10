const { Component } = require('../Component');
const { useEnableWrap } = require('../hooks/useEnableWrap');
const { DiffSplitViewNormal } = require('./DiffSplitViewNormal');
const { DiffSplitViewWrap } = require('./DiffSplitViewWrap');
const template = require('./DiffSplitView.html');

class DiffSplitView extends Component {
  constructor(options) {
    super({ ...options, template });

    // In Solid, this would be a hook that gets the value from context.
    // In our hypothetical framework, we will simulate this by passing the value in the options.
    this.enableWrap = useEnableWrap(this.options);

    this.render();
  }

  render() {
    if (this.enableWrap) {
      this.model.view = new DiffSplitViewWrap(this.options).render();
    } else {
      this.model.view = new DiffSplitViewNormal(this.options).render();
    }
    super.render();
  }
}
module.exports = { DiffSplitView };
