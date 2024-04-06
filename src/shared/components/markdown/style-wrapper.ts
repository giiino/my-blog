import styled from '@emotion/styled'

export const StyleWrapper = styled.div`
  line-height: 2;
  .reacr-mark-down {
    > * {
      margin-bottom: 23px;
    }
    .paragraph {
      figure {
        margin: 23px 0;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 10px;
    }
    h1 {
      font-size: 30px;
    }
    h2,
    h3 {
      scroll-margin-top: 70px;
    }
    /* Safari-only */
    @supports (-webkit-hyphens: none) {
      h2,
      h3 {
        padding-top: 70px;
        margin-top: -70px;
      }
    }
    p {
      white-space: pre-line;
    }
    ol,
    ul {
      list-style-type: none;
    }
    hr {
      height: 1px;
      background-color: #ccc;
      border: none;
      margin: 20px 0;
    }
    pre {
      margin: 20px 0;
    }
    blockquote {
      width: 100%;
      margin: 25px auto;
      padding: 1.2em 30px 1.2em 30px;
      line-height: 1.6;
      position: relative;
      border-left: 6px solid var(--primary-gray-400);
      background-color: var(--color-markdown-blockquote-bg);
      color: var(--color-text);
      border-radius: 8px;
    }
    figcaption {
      text-align: center;
      font-size: 0.5em;
      color: var(--primary-gray-200);
    }
    a {
      color: var(--primary-link);
      word-break: break-all;
      &:hover {
        text-decoration: underline;
      }
    }
    em {
      font-style: normal;
      background-color: var(--color-markdown-highlight-bg);
      color: var(--color-text);
      border: 1px solid var(--color-markdown-highlight-border);
      word-break: break-all;
      padding: 2px 4px 3px;
      border-radius: 5px;
    }
  }
`
