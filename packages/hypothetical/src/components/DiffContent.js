
import { Component } from '../Component';
import { getPlainLineTemplate, getSyntaxLineTemplate } from '@git-diff-view/core';
import template from './DiffContent.html';

export class DiffContent extends Component {
  constructor(options) {
    super({ ...options, template });

    this.model.enableHighlight = this.options.enableHighlight;

    if (this.options.enableHighlight && this.options.syntaxLine) {
      this.model.syntaxHtml = getSyntaxLineTemplate(this.options.syntaxLine);
    } else if (this.options.rawLine) {
      this.model.plainHtml = getPlainLineTemplate(this.options.rawLine);
    }
  }
}
