import Mustache from 'mustache';

export class Component {
  constructor(options) {
    this.options = options;
    this.model = options.model || {};
    this.template = options.template || '';
    this.element = options.element;
    this._events = {};

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
      this.addEventListeners();
    }
    return this.element ? this.element.innerHTML : Mustache.render(this.template, this.model);
  }

  addEventListeners() {
    for (const event in this._events) {
      const { selector, handler } = this._events[event];
      const elements = this.element.querySelectorAll(selector);
      elements.forEach(el => {
        el.addEventListener(event, handler.bind(this));
      });
    }
  }

  on(event, selector, handler) {
    this._events[event] = { selector, handler };
  }

  onMount() {
    // To be implemented by child classes
  }

  onDestroy() {
    // To be implemented by child classes
  }
}
