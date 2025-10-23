import { NodeSDK } from '@opentelemetry/sdk-node';

import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import { resourceFromAttributes } from '@opentelemetry/resources';

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';

import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-proto';

import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';

import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';

import {
  diag,
  DiagConsoleLogger,
  DiagLogLevel,
  metrics,
} from '@opentelemetry/api';

import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: 'observability-fundamentals-2',
  [ATTR_SERVICE_VERSION]: '2.0.0',
});

const mergedResource = resource;

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const traceExporter = new OTLPTraceExporter();

const logExporter = new OTLPLogExporter();

const metricExporter = new OTLPMetricExporter({
  url: 'http://127.0.0.1:4317',
});

const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 10000,
});

export const meterProvider = new MeterProvider({
  resource: mergedResource,
  readers: [metricReader],
});

metrics.setGlobalMeterProvider(meterProvider);

export const sdk = new NodeSDK({
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  logRecordProcessors: [new BatchLogRecordProcessor(logExporter)],
  instrumentations: [getNodeAutoInstrumentations(), new PinoInstrumentation()],
  resource: mergedResource,
});
