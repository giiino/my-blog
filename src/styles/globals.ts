export const scrollBarStyle = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    width: 5px;
    height: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`
