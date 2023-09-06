import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    bgColor: string
    color: string
    header: {
      tabHoverColor: string
    }
    section: {
      titleColor: string
    }
    footer: {
      bgColor: string
      linkColor: string
      borderTop: string
    }
    menu: {
      color: string
      hoverColor: string
      selectedColor: string
    }
    card: {
      titleColor: string
      summaryColor: string
      summaryHoverColor: string
      timeColor: string
    }
  }
}
