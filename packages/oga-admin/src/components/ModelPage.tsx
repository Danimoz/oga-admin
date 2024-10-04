import { ModelMetadata } from "../types"
import CreateForm from "./createForm"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

interface CRUDProps {
  modelMetadata: ModelMetadata
}

export default function ModelPage({ modelMetadata }: CRUDProps) {
  return (
    <div>
      <h1>{modelMetadata.name}</h1>
      <div className="flex justify-end items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add {modelMetadata.name}</Button>
          </DialogTrigger>
          <DialogContent>
            <CreateForm modelMetadata={modelMetadata} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}