import React from 'react'

type Fallback = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback: Fallback }>,
  { error: Error | null }
> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallback, children } = this.props
    if (error) {
      return fallback({ error })
    }
    return children
  }
}
