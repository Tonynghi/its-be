import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException): Observable<any> {
    const errorResponse = {
      status: 'error',
      message: exception.getError(),
    };

    return throwError(() => errorResponse);
  }
}
