import derby from 'derby';
import { DiffSplitViewNormal } from './DiffSplitViewNormal';
import { DiffSplitViewWrap } from './DiffSplitViewWrap';

// This is a best-effort translation of the SolidJS component to a DerbyJS component.
// It is not functional.

export class DiffSplitView extends derby.Component {
  init(model) {
    this.model = model;
    this.diffFile = model.get('diffFile');
    this.enableWrap = model.get('enableWrap'); // This would come from a hook in Solid
  }

  create() {
    // This component would choose between the normal and wrapped view
    // based on the `enableWrap` property.
  }

  // Add a static render method for placeholder rendering
  static render(diffFile) {
    // In a real app, you'd have a more sophisticated way to handle this.
    // For now, we'll just choose one.
    return DiffSplitViewNormal.render(diffFile);
  }
}
