declare module '@ioc:Adonis/Core/Chain' {
  interface Chain {
    handle: (...args: any[]) => any
    next: (...args: any[]) => void
  }
}
