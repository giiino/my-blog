import { Theme } from '@emotion/react'

import { ThemeMode } from '@/shared/types/ui'

export const styledThemeConf = (mode: ThemeMode): Partial<Theme> => {
  if (mode === 'light') {
    return {
      bgColor: '#fff',
      color: '#000',
      header: {
        tabHoverColor: 'var(--primary-blue-4)'
      },
      section: {
        titleColor: 'var(--primary-blue-4)'
      },
      footer: {
        bgColor: 'var(--primary-gray-100)',
        linkColor: 'var(--primary-gray-400)',
        borderTop: 'none'
      },
      menu: {
        color: 'var(--primary-gray-300)',
        hoverColor: 'var(--primary-gray-400)',
        selectedColor: 'var(--primary-blue-4)'
      },
      card: {
        titleColor: 'var(--primary-dark)',
        summaryColor: 'var(--primary-gray-200)',
        summaryHoverColor: 'var(--primary-blue-4)',
        timeColor: 'var(--primary-gray-400)'
      },
      sidebar: {
        dividerColor: 'rgba(0, 0, 0, 0.12)'
      },
      markdown: {
        highlightBgColor: 'var(--primary-blue-1)',
        blockquoteBgColor: '#fff0be',
        borderLeft: '6px solid #fec930'
      }
    }
  }
  if (mode === 'dark') {
    return {
      bgColor: '#121212',
      color: '#fff',
      header: {
        tabHoverColor: 'var(--primary-gray-100)'
      },
      section: {
        titleColor: 'var(--primary-gray-100)'
      },
      footer: {
        bgColor: '#121212',
        linkColor: 'var(--primary-blue-2)',
        borderTop: '1px solid var(--primary-gray-400)'
      },
      menu: {
        color: 'var(--primary-gray-100)',
        hoverColor: 'var(--primary-gray-200)',
        selectedColor: 'var(--primary-orange)'
      },
      card: {
        titleColor: 'var(--primary-gray-100)',
        summaryColor: 'var(--primary-gray-100)',
        summaryHoverColor: 'var(--primary-blue-2)',
        timeColor: 'var(--primary-gray-200)'
      },
      sidebar: {
        dividerColor: 'var(--primary-gray-400)'
      },
      markdown: {
        highlightBgColor: 'var(--primary-gray-400)',
        blockquoteBgColor: 'var(--primary-gray-500)',
        borderLeft: '2px solid transparent'
      }
    }
  }
  return {}
}
