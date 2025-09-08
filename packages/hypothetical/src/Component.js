import Mustache from 'mustache';

export class Component {
  constructor(options) {
    this.options = options;
    this.model = options.model || {};
    this.template = options.template || '';
    this.element = options.element;

    // Two-way data binding simulation
    this.model = new Proxy(this.model, {
      set: (target, property, value) => {
        target[property] = value;
        this.render();
        return true;
      },
    });
  }

  render() {
    if (this.element) {
      this.element.innerHTML = Mustache.render(this.template, this.model);
    }
  }

  // Controller logic would go in methods on the component class
}
