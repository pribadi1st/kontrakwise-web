"use client"

import { Plus, Trash2, Info, Lightbulb, Save, Form } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { createDocumentType } from '@/utils/queries/document/document_type'
import { DocumentType, FormDocumentType, RiskRule } from '@/types/document'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { documentTypeSchema } from '@/utils/schemas/documentType'
import { zodResolver } from '@hookform/resolvers/zod'

interface DocumentTypeEditorProps {
    documentType?: DocumentType | null
    onCancel: () => void
    mode: 'create' | 'edit'
}

type severityLevel = 'low' | 'medium' | 'high'

export default function DocumentTypeEditor({ documentType, onCancel, mode }: DocumentTypeEditorProps) {
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormDocumentType>({
        resolver: zodResolver(documentTypeSchema),
        defaultValues: {
            name: documentType?.name || '',
            description: documentType?.description || '',
            risk_rules: documentType?.risk_rules || []
        }
    })

    const riskRules = useWatch({ control, name: 'risk_rules' })

    const getRiskColor = (level: 'low' | 'medium' | 'high', currentValue = 'medium') => {
        switch (level) {
            case 'low':
                if (currentValue === 'low') {
                    return 'border-success-border bg-success-surface text-success'
                }
                return 'border-success-border text-success'
            case 'medium':
                if (currentValue === 'medium') {
                    return 'border-warning-border bg-warning-surface text-warning'
                }
                return 'border-warning-border text-warning'
            case 'high':
                if (currentValue === 'high') {
                    return 'border-danger-border bg-danger-surface text-danger'
                }
                return 'border-danger-border text-danger'
        }
    }

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'risk_rules'
    })

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createDocumentType,
        onSuccess: (data: any) => {
            toast.success('Document type created successfully')
            queryClient.invalidateQueries({ queryKey: ['document-types'] })
            onCancel()
        },
        onError: (error: any) => {
            toast.error('Failed to create document type')
            console.error(error)
        }
    })

    const addRiskRule = () => {
        const newRule: RiskRule = {
            clause: '',
            severity: 'medium',
            criteria: ''
        }
        append(newRule)
    }

    const updateRiskRule = (index: number, severity: severityLevel) => {
        const currentRule = riskRules?.[index]
        if (currentRule) {
            update(index, { ...currentRule, severity })
        }
    }

    const deleteRiskRule = (index: number) => {
        remove(index)
    }

    const submitForm = async (data: FormDocumentType) => {
        console.log(data)
        // if (mode === 'create') {
        //     createMutation.mutate(data as any)
        // } else {
        //     toast.info('Update functionality coming soon')
        // }
    }

    const isPending = createMutation.isPending

    return (
        <form className="flex flex-col h-full bg-surface-light" onSubmit={handleSubmit(submitForm)}>
            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                    {/* Left Column - Basic Details */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        {/* Basic Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-border-color p-6">
                            <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                                <Info size={20} className="text-primary" />
                                Basic Details
                            </h3>
                            <div className="space-y-5">
                                <div>
                                    <Field>
                                        <FieldLabel htmlFor="typeName">Type Name</FieldLabel>
                                        <Input
                                            type="text"
                                            placeholder="e.g. Partnership Agreement"
                                            className="bg-surface-light border-border-color"
                                            {...register('name')}
                                        />
                                        {
                                            errors.name &&
                                            <FieldDescription className="text-red-500 text-sm">
                                                {errors.name.message}
                                            </FieldDescription>
                                        }
                                    </Field>
                                </div>
                                <div>
                                    <Field>
                                        <FieldLabel htmlFor="description">Description</FieldLabel>
                                        <textarea
                                            placeholder="Brief explanation of this document category..."
                                            rows={3}
                                            {...register('description')}
                                            className="w-full bg-surface-light border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        />
                                        {
                                            errors.description &&
                                            <FieldDescription className="text-red-500 text-sm">
                                                {errors.description.message}
                                            </FieldDescription>
                                        }
                                    </Field>
                                </div>
                            </div>
                        </div>

                        {/* AI Training Info */}
                        <div className="bg-primary-light/50 border border-primary/20 rounded-xl p-6">
                            <div className="flex gap-3">
                                <Lightbulb size={20} className="text-primary" />
                                <div>
                                    <p className="text-sm font-bold text-primary-dark">AI Training Mode</p>
                                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                        Defining these rules helps our AI identify specific risks and classify documents automatically during upload.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Risk Rules */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="bg-white rounded-xl shadow-sm border border-border-color overflow-hidden">
                            {/* Risk Rules Header */}
                            <div className="p-6 border-b border-border-color flex items-center justify-between bg-white sticky top-0 z-10">
                                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <Info size={20} className="text-primary" />
                                    Risk Rules Engine <span className='text-sm font-normal'>(optional)</span>
                                </h3>
                                <Button
                                    type="button"
                                    onClick={addRiskRule}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-bold border-primary-border border"
                                >
                                    <Plus size={16} />
                                    Add New Rule
                                </Button>
                            </div>

                            {/* Risk Rules List */}
                            <div className="p-6 space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="p-4 rounded-xl border border-border-color bg-surface-light/30 space-y-4 relative group">
                                        <button
                                            onClick={() => deleteRiskRule(index)}
                                            className="absolute top-4 right-4 "
                                        >
                                            <Trash2 size={20} className='text-danger' />
                                        </button>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Field>
                                                <FieldLabel>Clause to Track</FieldLabel>
                                                <Input
                                                    type="text"
                                                    {...register(`risk_rules.${index}.clause`)}
                                                    placeholder="e.g. Liability Cap"
                                                    className="bg-white border-border-color"
                                                />
                                                {
                                                    errors.risk_rules?.[index]?.clause && (
                                                        <FieldDescription className="text-danger text-sm mt-1">
                                                            {errors.risk_rules[index].clause?.message}
                                                        </FieldDescription>
                                                    )
                                                }
                                            </Field>
                                            <Field>
                                                <FieldLabel>Severity Level</FieldLabel>
                                                <div className="flex items-center gap-2">
                                                    {(['high', 'medium', 'low'] as const).map((severity) => (
                                                        <button
                                                            key={severity}
                                                            type="button"
                                                            onClick={() => updateRiskRule(index, severity)}
                                                            className={`
                                                                flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-bold transition-colors 
                                                                ${getRiskColor(severity, field.severity)}`
                                                            }
                                                        >
                                                            {severity.charAt(0).toUpperCase() + severity.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </Field>
                                        </div>


                                        <Field>
                                            <FieldLabel>Risk Criteria</FieldLabel>
                                            <textarea
                                                {...register(`risk_rules.${index}.criteria`)}
                                                placeholder="Define what constitutes this risk..."
                                                rows={2}
                                                className="w-full bg-white border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                            />
                                            {
                                                errors.risk_rules?.[index]?.criteria && (
                                                    <FieldDescription className="text-danger text-sm mt-1">
                                                        {errors.risk_rules[index].criteria?.message}
                                                    </FieldDescription>
                                                )
                                            }
                                        </Field>
                                    </div>
                                ))}

                                {/* Add Rule Button */}
                                <Button
                                    type="button"
                                    onClick={addRiskRule}
                                    className="flex w-full py-4 border-2 border-dashed border-border-color rounded-xl text-text-muted hover:text-white hover:border-primary/40 transition-all items-center justify-center gap-2 bg-surface-light/20"
                                >
                                    <Plus size={20} />
                                    <span className="text-sm font-bold">Add another risk rule</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Footer */}
            <div className="border-t border-border-color bg-white p-6 shrink-0">
                <div className="flex items-center justify-end gap-4">
                    <Button
                        onClick={onCancel}
                        variant="outline"
                        className="px-5 py-2.5 rounded-lg text-sm font-bold border-border-color text-text-muted hover:bg-surface-light transition-all"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                    >
                        <Save size={16} />
                        {isPending ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </form>
    )
}
