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
import { Dialog, DialogTrigger } from './ui/dialog'
import { GearIcon } from '@radix-ui/react-icons'

export default function Shell() {
  return (
    <Dialog>
      <Sheet>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={150}>
            {/* <DatabaseSwitcher/> */}
            <Command>
              <CommandInput className='h-9' />
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
