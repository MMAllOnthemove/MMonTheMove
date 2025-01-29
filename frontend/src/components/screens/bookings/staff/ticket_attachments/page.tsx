"use client"
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile';
import useFetchHHPTaskByTicket from '@/hooks/useFetchHHPTaskByTicket';
import useUserLoggedIn from '@/hooks/useGetUser';
import { datetimestamp } from '@/lib/date_formats';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoadingScreen = dynamic(() =>
  import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
  import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
  import('@/components/PageTitle/page')
)
const Sidebar = dynamic(() =>
  import('@/components/sidebar/page')
)
const FilesToTicketScreen = () => {
  const { addRepairTicketFile } = useRepairshoprFile()
  const [hhpFiles, setHHPFiles] = useState([]);
  const [hhpFilesUploading, setHHPFilesUploading] = useState(false);
  const { user, isLoggedIn, loading } = useUserLoggedIn()
  const [search, setSearch] = useState("")
  const { hhpTask, refetch, hhpTaskLoading } = useFetchHHPTaskByTicket(search)
  const [ticket, setTicket] = useState<string | undefined>("")

  // submit hhp files to backend and repairshopr
  const submitHHPFiles = async () => {
    setHHPFilesUploading(true);
    try {
      const formData = new FormData();
      const ticket_number: any = hhpTask?.ticket_number;
      const task_id: any = hhpTask?.id;
      const created_at = datetimestamp;
      Array.from(hhpFiles).forEach((file) => {
        formData.append('files', file);
      });
      // Append ticket_number once
      formData.append('ticket_number', ticket_number);
      formData.append('task_id', task_id);
      formData.append('created_at', created_at);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/files`, formData, {
        withCredentials: true,
      })

      if (data) {
        toast.success(`${data?.message}`)
        const repairshopr_payload = {
          files: data.fileUrls.map((url: any) => ({
            url: url,
            filename: url?.split('/')?.pop(), // Extract filename from URL
          })),
        };
        await addRepairTicketFile(hhpTask?.repairshopr_job_id, repairshopr_payload)
        setHHPFiles([])
      }
      // setQCFilesUrls(data?.fileUrls)
      setHHPFilesUploading(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      setHHPFilesUploading(false)
      if (process.env.NODE_ENV !== "production") {
        console.error("Error uploading hhp files:", error);
      }
    }
  }
  const handleHHPFiles = (event: any) => {
    setHHPFiles(event.target.files);
  };
  const getResult = () => {
    if (search?.trim()) {
      refetch(); // Trigger the fetch manually
    }
    setTicket(hhpTask?.ticket_number)
  }
  return (
    <>
      {
        loading ? (<LoadingScreen />) : isLoggedIn ? (
          <>
            <Sidebar />
            {/* Search Input */}
            <main className="flex justify-center items-center h-screen bg-grey-100">
              <Card className="max-w-md mx-auto p-1">
                <CardHeader>
                  <CardTitle className="text-center text-xl font-bold">
                    Add attachments
                  </CardTitle>
                  <CardDescription className='text-center'>
                    Please search tickets created with this system. Thanks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="text"
                    className="border rounded-md p-2 w-full"
                    placeholder="Enter ticket number"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={getResult}
                    disabled={hhpTaskLoading}
                  >
                    {hhpTaskLoading ? "Searching..." : "Search"}
                  </Button>
                  {!hhpTaskLoading && hhpTask && (
                    <div className="flex items-center">
                      <Input type="file" accept="image/*,video/*, application/pdf" multiple className="my-3" onChange={handleHHPFiles} />
                      <Button className="ml-3" disabled={hhpFilesUploading} onClick={submitHHPFiles}>{hhpFilesUploading ? 'Uploading' : 'Attach'}</Button>
                    </div>

                  )}
                </CardContent>
              </Card>

            </main>
          </>

        ) : <NotLoggedInScreen />
      }
    </>
  )
}

export default FilesToTicketScreen