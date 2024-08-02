import Image from 'next/image'
import dynamic from 'next/dynamic'
// import ClickhouseDataGridRSC from '@/package/ClickhouseDataGridRSC'

const ClickhouseDataGrid = dynamic(
    () => {
        return import('../package/ClickhouseDataGrid')
    },
    { ssr: false }
)

export default function Home() {
  return (
    <ClickhouseDataGrid />
  )
}
