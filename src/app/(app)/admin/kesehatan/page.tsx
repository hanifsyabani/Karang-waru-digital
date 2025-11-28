import Kesehatan from '@/components/dashboard/kesehatan/kesehatan'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kesehatan",
};


export default function page() {
  return (
    <>
        <Kesehatan />
    </>
  )
}
