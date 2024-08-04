import Image from 'next/image'
import dynamic from 'next/dynamic'
import Shell from '@/components/Shell'
// import ClickhouseDataGridRSC from '@/package/ClickhouseDataGridRSC'

const ClickhouseDataGrid = dynamic(
  () => {
    return import('../components/ClickhouseDataGrid')
  },
  { ssr: false },
)

export default function Home() {
  return <Shell />
}
