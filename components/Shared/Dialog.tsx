import React, { ReactNode, memo } from "react";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { DialogBody } from "@material-tailwind/react";


interface Props {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  headerTitle: string
  children: ReactNode
}
 
const DialogDefault = memo(({headerTitle, children, isOpen, setOpen} : Props) => {
 
  const handleOpen = () => setOpen(!isOpen);
 
  return (
    <Dialog open={isOpen} onClose={handleOpen} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center backdrop-blur-sm">
        <DialogPanel className="max-w-lg border parchment-bg">
          <DialogTitle className="font-bold darkwood text-center rounded-t-md items-center py-2 text-2xl">{headerTitle}</DialogTitle>
          <DialogBody className="py-2">
            {children}
          </DialogBody>
        </DialogPanel>
      </div>
    </Dialog>
    // <Dialog className="relative z-50 parchment-bg h-auto border rounded-md border-black backdrop-blur-sm max-w-80 my-auto mx-auto" open={isOpen} onClose={handleOpen}>
    //   <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
    //     <DialogTitle className="darkwood text-center rounded-t-md items-center py-1 text-2xl"><h2 className="mx-auto">{headerTitle}</h2></DialogTitle>
    //     <DialogPanel className="py-2 px-auto">
    //       {children}
    //     </DialogPanel>
    //   </div>
    // </Dialog>
  );
})

DialogDefault.displayName = 'DialogDefault'

export default DialogDefault