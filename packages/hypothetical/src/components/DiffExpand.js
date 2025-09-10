
import { Component } from '../Component';
import template from './DiffExpand.html';

export class DiffExpand extends Component {
  constructor(options) {
    super({ ...options, template });
    this.model.text = '...';
    this.on('click', '.diff-line-expand-button', this.handleClick);
  }

  handleClick() {
    console.log('Expand button clicked');
  }
}
