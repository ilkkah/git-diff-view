const { Component } = require('../Component');
const { _cacheMap, DiffFile, SplitSide, DiffModeEnum } = require('@git-diff-view/core');
const { DiffSplitView } = require('./DiffSplitView');
const { DiffUnifiedView } = require('./DiffUnifiedView');
// In a real framework, you would have a way to load templates.
// For this hypothetical framework, we'll just import the string.
const template = require('./DiffView.html');

_cacheMap.name = "@git-diff-view/hypothetical";

class DiffView extends Component {
  constructor(options) {
    // The template would be loaded here in a real framework
    super({ ...options, template });

    // Props from the Solid component are mapped to options
    const {
      data,
      extendData,
      initialWidgetState,
      diffFile,
      class: className,
      style,
      registerHighlighter,
      diffViewMode,
      diffViewWrap,
      diffViewTheme,
      diffViewFontSize,
      diffViewHighlight,
      diffViewAddWidget,
      renderWidgetLine,
      renderExtendLine,
      onAddWidgetClick,
    } = options;

    // State from the Solid component is mapped to the model
    this.model.theme = diffViewTheme || 'light';
    this.model.fontSize = diffViewFontSize || 14;
    this.model.class = className || '';
    this.model.style = style || '';
    this.model.isSplitView = (diffViewMode || DiffModeEnum.Split) & DiffModeEnum.Split;
    this.model.version = '0.0.1'; // or some other version
    this.model.highlighter = '';
    this.model.diffFileId = '';

    // This simulates the reactive nature of Solid's `createMemo`
    this.diffFile = this.createMemo(() => this.getInstance(diffFile, data));
    this.model.diffFileId = this.diffFile ? this.diffFile.getId() : '';

    // This simulates Solid's `createSignal`
    this.isMounted = false;
    this.widgetState = initialWidgetState || {};

    // This simulates the reactive store from the Solid component
    this.reactiveHook = this.createDiffConfigStore(options);

    // Lifecycle methods
    this.onMount = this.onMount.bind(this);
    this.onDestroy = this.onDestroy.bind(this);

    // Call onMount when the component is added to the DOM
    // In a real framework, this would be handled automatically.
    setTimeout(this.onMount, 0);
  }

  getInstance(diffFile, data) {
    if (diffFile) {
      const newDiffFile = DiffFile.createInstance({});
      newDiffFile._mergeFullBundle(diffFile._getFullBundle());
      return newDiffFile;
    }
    if (data) {
      return new DiffFile(
        data.oldFile?.fileName || '',
        data.oldFile?.content || '',
        data.newFile?.fileName || '',
        data.newFile?.content || '',
        data.hunks || [],
        data.oldFile?.fileLang || '',
        data.newFile?.fileLang || ''
      );
    }
    return null;
  }

  createMemo(fn) {
    // This is a simplified simulation of a memoization function.
    // In a real framework, this would be much more complex.
    return fn();
  }

  createDiffConfigStore(props) {
    // This is a more detailed placeholder for the reactive store.
    // It simulates the setters from the Solid component's `reactiveHook`.
    const store = {
      _id: '',
      _dom: null,
      _mode: DiffModeEnum.Split,
      _isMounted: false,
      _enableWrap: false,
      _enableAddWidget: false,
      _enableHighlight: false,
      _fontSize: 14,
      _extendData: null,
      _renderWidgetLine: null,
      _renderExtendLine: null,
      _onAddWidgetClick: null,
      setId: (id) => { store._id = id; },
      setDom: (dom) => { store._dom = dom; },
      setMode: (mode) => { store._mode = mode; },
      setIsIsMounted: (isMounted) => { store._isMounted = isMounted; },
      setEnableWrap: (enableWrap) => { store._enableWrap = enableWrap; },
      setEnableAddWidget: (enableAddWidget) => { store._enableAddWidget = enableAddWidget; },
      setEnableHighlight: (enableHighlight) => { store._enableHighlight = enableHighlight; },
      setFontSize: (fontSize) => { store._fontSize = fontSize; },
      setExtendData: (extendData) => { store._extendData = extendData; },
      setRenderWidgetLine: (renderWidgetLine) => { store._renderWidgetLine = renderWidgetLine; },
      setRenderExtendLine: (renderExtendLine) => { store._renderExtendLine = renderExtendLine; },
      setOnAddWidgetClick: (onAddWidgetClick) => { store._onAddWidgetClick = onAddWidgetClick; },
    };
    return {
      getReadonlyState: () => store,
      clear: () => {},
    };
  }

  onMount() {
    this.isMounted = true;

    const {
      setId,
      setDom,
      setEnableAddWidget,
      setEnableHighlight,
      setEnableWrap,
      setExtendData,
      setFontSize,
      setIsIsMounted,
      setMode,
      setOnAddWidgetClick,
      setRenderExtendLine,
      setRenderWidgetLine,
    } = this.reactiveHook.getReadonlyState();

    setId(this.diffFile?.getId() || '');
    setDom(this.element);
    setEnableAddWidget(!!this.options.diffViewAddWidget);
    setEnableHighlight(!!this.options.diffViewHighlight);
    setEnableWrap(!!this.options.diffViewWrap);
    setExtendData(this.options.extendData);
    setFontSize(this.options.diffViewFontSize || 14);
    setIsIsMounted(this.isMounted);
    setMode(this.options.diffViewMode || DiffModeEnum.Split);
    setOnAddWidgetClick({ current: this.options.onAddWidgetClick });
    setRenderExtendLine(this.options.renderExtendLine);
    setRenderWidgetLine(this.options.renderWidgetLine);

    this.initSubscribe();
    this.initDiff();
    this.initSyntax();
    this.initAttribute();

    this.render();
  }

  onDestroy() {
    this.isMounted = false;
    this.diffFile?.clear?.();
    this.reactiveHook.clear();
  }

  initSubscribe() {
    if (this.isMounted && this.options.diffFile && this.diffFile) {
      this.options.diffFile._addClonedInstance(this.diffFile);
    }
  }

  initDiff() {
    if (this.isMounted && this.diffFile) {
      this.diffFile.initTheme(this.model.theme);
      this.diffFile.initRaw();
      this.diffFile.buildSplitDiffLines();
      this.diffFile.buildUnifiedDiffLines();
      this.diffFile.notifyAll();
    }
  }

  initSyntax() {
    if (this.isMounted && this.diffFile && this.options.diffViewHighlight) {
      this.diffFile.initSyntax({ registerHighlighter: this.options.registerHighlighter });
      this.diffFile.notifyAll();
    }
  }

  initAttribute() {
    if (this.isMounted && this.diffFile) {
      this.model.highlighter = this.diffFile._getHighlighterName();
      this.diffFile.subscribe(() => {
        this.model.theme = this.diffFile._getTheme() || 'light';
        this.model.highlighter = this.diffFile._getHighlighterName();
      });
    }
  }

  render() {
    if (this.diffFile) {
        if (this.model.isSplitView) {
            this.model.view = new DiffSplitView({ diffFile: this.diffFile }).render();
        } else {
            this.model.view = new DiffUnifiedView({ diffFile: this.diffFile }).render();
        }
    }
    super.render();
  }
}
module.exports = { DiffView };
