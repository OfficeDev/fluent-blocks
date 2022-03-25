import { BaseResource } from './BaseResource'

export class AsyncResource<D extends {}> extends BaseResource<D> {
  constructor(promise: Promise<D>) {
    super()
    this.promise = promise
      .then((data) => {
        this.status = 'success'
        this.data = data
        return data
      })
      .catch((error) => {
        this.status = 'error'
        this.error = error
        return error
      })
  }
}
