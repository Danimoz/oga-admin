'use client'

import { toast } from "sonner"
import { getEditableFields, mapPrismaTypeToFieldType } from "../lib/prismaUtils"
import { ModelMetadata } from "../types"
import SubmitButton from "./SubmitButton"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useAdapter } from "../context/adapterContext"


interface CreateFormProps {
  modelMetadata: ModelMetadata
}

export default function CreateForm({ modelMetadata }: CreateFormProps) {

  const { adapter } = useAdapter();

  async function handleCreate(formData: FormData) {
    const data = Object.fromEntries(formData.entries())
    await adapter.create(modelMetadata.name, data)
    toast.success(`Created ${modelMetadata.name}`)
  }

  return (
    <div>
      <form className="space-y-4" action={handleCreate}>
        {getEditableFields(modelMetadata.fields).map((field) => (
          <div key={field.name} className="space-y-1">
            <Label htmlFor={field.name} className="capitalize inline-flex gap-x-1">
              {field.name}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input 
              type={mapPrismaTypeToFieldType(field.type, field.name)} 
              id={field.name} 
              name={field.name}
              required={field.required}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <SubmitButton buttonText={`Create ${modelMetadata.name}`} />
        </div>
      </form>
    </div>
  )
}