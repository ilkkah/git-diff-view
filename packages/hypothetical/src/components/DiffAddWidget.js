import { Component } from '../Component';
import template from './DiffAddWidget.html';

export class DiffAddWidget extends Component {
  constructor(options) {
    super({ ...options, template });

    this.side = this.options.side;
    this.lineNumber = this.options.lineNumber;
    this.onWidgetClick = this.options.onWidgetClick;
    this.onOpenAddWidget = this.options.onOpenAddWidget;

    this.model.className = this.options.className || '';

    this.on('click', '.diff-add-widget', this.handleClick);
  }

  handleClick() {
    this.onOpenAddWidget(this.lineNumber, this.side);
    this.onWidgetClick?.(this.lineNumber, this.side);
  }
}
