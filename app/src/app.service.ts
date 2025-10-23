import { Injectable } from '@nestjs/common';
import { meterProvider } from './tracer';
import { log } from './infra/logger';

@Injectable()
export class AppService {
  private readonly meter = meterProvider.getMeter('observability-fundamentals');
  private readonly requestCounter = this.meter.createCounter(
    'http_requests_total',
  );
  private readonly requestDuration = this.meter.createHistogram(
    'http_request_duration_ms',
  );

  getHello(): string {
    this.recordMetric('success', 'GET', '/hello');
    log.info('olá');
    return 'Hello World!';
  }

  getError(): string {
    this.recordMetric('error', 'GET', '/error');
    log.info('olá');
    return 'Something went wrong';
  }

  private recordMetric(status: string, method: string, path: string) {
    const labels = { status, method, path };

    this.requestCounter.add(1, labels);
    this.requestDuration.record(1000);
  }
}
