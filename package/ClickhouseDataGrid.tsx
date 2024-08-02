'use client'

import React from 'react'
import DataEditor, { GridCellKind, GridColumn } from '@glideapps/glide-data-grid'
import { createClient } from '@clickhouse/client-web'
import '@glideapps/glide-data-grid/dist/index.css'



export default function ClickhouseDataGrid() {
  const columns: GridColumn[] = [
    { title: 'First Name', width: 200 },
    { title: 'Last Name', width: 100 },
]
  const kind = GridCellKind.Text
  const allowOverlay = true
  return (
  <>
  <DataEditor 
    columns={columns} 
    rows={100} 
    width='100%' 
    height='100vh' 
    smoothScrollX={true}
    smoothScrollY={true}
    // theme={{ ''}}
    getCellContent={(item) => {
    // console.log(item)
    return { data: `${item[1]}`, displayData: `${item[1]}`, kind, allowOverlay }
    }}
  />
  <div id='portal' />
  </>
  )
}
