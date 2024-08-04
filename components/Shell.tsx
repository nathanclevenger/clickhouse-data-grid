import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable'
import ClickhouseDataGrid from './ClickhouseDataGrid'
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

export default function Shell() {
  return (
    <Sheet>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={150}>
          <DatabaseSwitcher/>
          <Command>
            <CommandInput />
            <CommandList>
              <CommandGroup heading='Data'>
                {/* <SheetTrigger> */}
                <Link href='#'>
                  <CommandItem>
                    <span>Ideas</span>
                  </CommandItem>
                </Link>
                {/* </SheetTrigger> */}
              </CommandGroup>
            </CommandList>
          </Command>
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
  )
}
