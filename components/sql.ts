import { createClient, ResponseJSON } from '@clickhouse/client-web'
import { ParsedUrlQueryInput } from 'querystring'

const clickhouse = createClient({
  url: process.env.NEXT_PUBLIC_CLICKHOUSE_URL,
  username: process.env.NEXT_PUBLIC_CLICKHOUSE_USER,
  password: process.env.NEXT_PUBLIC_CLICKHOUSE_PASS,
  database: process.env.NEXT_PUBLIC_CLICKHOUSE_DB,
})

export function sql(strings: TemplateStringsArray, ...keys: string[]) {
  const query = strings.reduce((prev, curr, i) => prev + curr + (keys[i] || ''), '')
  // return (queryParams: ParsedUrlQueryInput = {}) => {
    // const params: ParsedUrlQueryInput = {
    //   query: strings[0],
    // }
    // Object.entries(queryParams).map(([key, value]) => {
    //   if (typeof value === 'string') params['param_' + key] = value.replaceAll('_', ' ')
    // })
    // return fetch('https://sql.data.mt?' + stringify(params)).then((res) => res.json()) as Promise<ResponseJSON<any>>
    return clickhouse.query({
      query,
      // query: strings[0],
      format: 'JSONCompact',
      // query_params: queryParams,
      clickhouse_settings: {
        max_estimated_execution_time: 90000,
        timeout_overflow_mode: 'break',
        http_make_head_request: false, 
        schema_inference_make_columns_nullable: 0,
      }
    }).then((res) => res.json()) //as Promise<ResponseJSON>
  // }
}
