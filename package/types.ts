import type { ResponseJSON, ClickHouseClientConfigOptions, ClickHouseClient } from '@clickhouse/client-web'

export type ClickhouseDataGridConfig = ClickHouseClientConfigOptions & ({
  table: string
} | {
  query: string
})