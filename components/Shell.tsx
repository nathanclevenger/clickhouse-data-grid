import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable'
// import ClickhouseDataGrid from './ClickhouseDataGrid'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import Link from 'next/link'
import DatabaseSwitcher from './DatabaseSwitcher'
import { Dialog, DialogTrigger } from './ui/dialog'
import { GearIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import { createClient } from '@clickhouse/client-web'
import type { ClickHouseClientConfigOptions } from '@clickhouse/client-web'
import { sql } from './sql'


const ClickhouseDataGrid = dynamic(
  () => {
    return import('../components/ClickhouseDataGrid')
  },
  { ssr: false },
)

export default async function Shell() {
  const result = await sql` SELECT database, groupArray(table) as tables FROM system.tables GROUP BY database ORDER BY database `
  console.log(result)
  return (
    <Dialog>
      <Sheet>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={150}>
            {/* <DatabaseSwitcher/> */}
            <Command className='max-h-screen'>
              <CommandInput className='h-9' />
              <CommandList className='max-h-full'>
                {result.data.map(([database, tables]: any) => (
                  <CommandGroup key={database} heading={database}>
                    {tables.map((table: string) => (
                      <Link href={`#${database}.${table}`} key={`#${database}.${table}`}>
                        <CommandItem key={table}>
                          <span>{table}</span>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                ))}
                {/* <CommandGroup heading='Data'>
                  {/* <SheetTrigger> 
                   <Link href='#'>
                     <CommandItem>
                       <span>Ideas</span>
                     </CommandItem>
                   </Link>
                   {/* </SheetTrigger> 
                 </CommandGroup> */}
              </CommandList>
            </Command>
            <DialogTrigger className='absolute bottom-2 left-2'>
              <GearIcon className='w-5 h-5 text-gray-400' />
            </DialogTrigger>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={800}>
            <ClickhouseDataGrid />
          </ResizablePanel>
        </ResizablePanelGroup>
        <SheetContent>
          <SheetTitle>Shell</SheetTitle>
          <SheetDescription>Shell</SheetDescription>
        </SheetContent>
      </Sheet>
    </Dialog>
  )
}
