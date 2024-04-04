export const defer = (fn: Function) => setTimeout(fn, 0)

type ThrottledFunction<F extends (...args: any[]) => void> = (
  ...args: Parameters<F>
) => void

export function throttle<F extends (...args: any[]) => void>(
  fn: F,
  delay: number = 500
): ThrottledFunction<F> {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<F>): void => {
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}
