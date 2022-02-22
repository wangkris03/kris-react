type ZPJSX = Partial<HTMLElementTagNameMap>;

declare namespace JSX {
  interface IntrinsicElements extends ZPJSX {
    // 标准元素之外的元素
    // div: any;
  }
}
