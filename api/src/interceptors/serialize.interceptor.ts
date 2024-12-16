import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToInstance } from 'class-transformer'

interface ClassConstructor {
  new (...args: any[]): {}
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((response: { data: any }) => {
        if (Array.isArray(response.data)) {
          return {
            ...response,
            data: response.data.map(data => {
              return plainToInstance(this.dto, data, {
                excludeExtraneousValues: true,
              })
            }),
          }
        }

        return {
          ...response,
          data: plainToInstance(this.dto, response.data, {
            excludeExtraneousValues: true,
          }),
        }
      }),
    )
  }
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
