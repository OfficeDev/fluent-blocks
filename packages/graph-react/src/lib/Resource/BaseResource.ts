export class BaseResource<D extends {}> {
  public data: D | undefined = undefined
  public status = 'pending'
  public error = undefined
  public promise: Promise<D> | null = null
  public read() {
    switch (this.status) {
      case 'pending':
        throw this.promise
      case 'error':
        throw this.error
      default:
        return this.data
    }
  }
}
