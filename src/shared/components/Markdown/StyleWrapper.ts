import styled from '@emotion/styled'

export const StyleWrapper = styled.div`
  .reacr-mark-down {
    > * {
      line-height: 2;
      margin-bottom: 23px;
    }

    h1 {
      font-size: 30px;
    }

    p {
      white-space: pre-line;
    }
    ol,
    ul {
      list-style-type: none;
    }
    li {
      &.count {
        .serial-number {
          margin-left: 15px;
          margin-right: 10px;
        }
      }
      &.no-count::before {
        content: '•';
        margin-left: 15px;
        margin-right: 15px;
        font-weight: bold;
        color: var(--primary-blue-4);
      }
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
      border-left: 6px solid #f7da85;
      line-height: 1.6;
      position: relative;
      background: #fffbee;
      border-radius: 8px;
    }
    a {
      color: #0050b3;
      margin: 0 5px;
      word-break: break-all;
      &:hover {
        text-decoration: underline;
      }
    }
    em {
      font-style: normal;
      background-color: var(--primary-blue-1);
      padding: 3px 5px;
      margin: 0 3px;
      border-radius: 5px;
    }
  }
`