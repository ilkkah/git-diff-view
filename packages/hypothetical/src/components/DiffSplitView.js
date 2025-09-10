import { Component } from '../Component';
import { useEnableWrap } from '../hooks/useEnableWrap';
import { DiffSplitViewNormal } from './DiffSplitViewNormal';
import { DiffSplitViewWrap } from './DiffSplitViewWrap';
import template from './DiffSplitView.html';

export class DiffSplitView extends Component {
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
