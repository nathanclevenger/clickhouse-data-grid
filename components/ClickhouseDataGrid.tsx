'use client'

import React, { useEffect } from 'react'
import DataEditor, {
  GridCellKind,
  GridColumn,
} from '@glideapps/glide-data-grid'
import { createClient, ResponseJSON } from '@clickhouse/client-web'
import '@glideapps/glide-data-grid/dist/index.css'
import { useHash } from 'react-use'
import { sql } from './sql'

export default async function ClickhouseDataGrid() {
  const [hash] = useHash()
  const table = hash.slice(1)
  const [results, setResults] = React.useState<ResponseJSON>()
  useEffect(() => {
    sql` SELECT * FROM ${table} LIMIT 10000 `.then(setResults)
  }, [table])
  // const results = await sql` SELECT * FROM ${table} LIMIT 1000 `
  const data = results?.data as any[][] || []
  console.log(results)
  const columns: GridColumn[] = results?.meta?.map((column: any) => ({
    title: column.name,
    grow: 500,
    // width: 200,
    // hasMenu: true,
    
  }) as GridColumn) || []
  // const columns: GridColumn[] = [
  //   { title: 'First Name', width: 200, hasMenu: true },
  //   { title: 'Last Name', width: 100 },
  // ]
  const kind = GridCellKind.Text
  const allowOverlay = true
  return (
    <>
      <DataEditor
        columns={columns}
        rows={results?.rows || data.length || 0}
        maxColumnAutoWidth={1000}
        maxColumnWidth={1000}
        width='100%'
        height='100vh'
        smoothScrollX={true}
        smoothScrollY={true}
        rowMarkers='clickable-number'
        trailingRowOptions={{ addIcon: 'plus' }}
        onRowAppended={async () => 1}
        // showSearch={true}
        // theme={{ ''}}
        getCellContent={([col, row]) => {
          // console.log(item)
          return {
            data: data[row][col],
            displayData: `${data[row][col]}`,
            kind,
            allowOverlay,
          }
        }}
      />
      <div id='portal' />
    </>
  )
}
