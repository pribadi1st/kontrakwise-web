"use client"

import { useState } from 'react'
import { Play, Save } from 'lucide-react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ActionNodeData, ActionType } from '../Nodes/actionNode'

interface ActionDrawerProps {
    isOpen: boolean
    onClose: () => void
    nodeData: ActionNodeData
    nodeId: string
    onSave: (nodeId: string, data: Partial<ActionNodeData>) => void
}

const actionTypes: { value: ActionType; label: string; description: string }[] = [
    { value: 'approve', label: 'Approve', description: 'Approve contract or document automatically' },
    { value: 'reject', label: 'Reject', description: 'Reject contract due to issues found' },
    { value: 'manual_review', label: 'Manual Review', description: 'Flag for manual review by team member' },
    { value: 'request_changes', label: 'Request Changes', description: 'Request changes to contract terms' },
    { value: 'send_notification', label: 'Send Notification', description: 'Send notification to stakeholders' },
    { value: 'create_task', label: 'Create Task', description: 'Create follow-up task for team' },
    { value: 'flag_for_followup', label: 'Flag for Follow-up', description: 'Flag document for future attention' },
    { value: 'archive', label: 'Archive', description: 'Archive the document' }
];

export function ActionDrawer({ isOpen, onClose, nodeData, nodeId, onSave }: ActionDrawerProps) {
    const [formData, setFormData] = useState({
        actionType: nodeData.actionType || 'manual_review',
        description: nodeData.description || '',
        message: nodeData.actionConfig?.message || '',
        recipients: nodeData.actionConfig?.recipients?.join(', ') || '',
        priority: nodeData.actionConfig?.priority || 'medium',
        assignee: nodeData.actionConfig?.assignee || '',
        dueDate: nodeData.actionConfig?.dueDate || '',
        tags: nodeData.actionConfig?.tags?.join(', ') || ''
    });

    const handleSubmit = () => {
        const updatedData: Partial<ActionNodeData> = {
            actionType: formData.actionType,
            description: formData.description,
            actionConfig: {
                message: formData.message || undefined,
                recipients: formData.recipients ? formData.recipients.split(',').map(r => r.trim()).filter(r => r) : undefined,
                priority: formData.priority as any,
                assignee: formData.assignee || undefined,
                dueDate: formData.dueDate || undefined,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : undefined
            }
        };

        onSave(nodeId, updatedData);
        onClose();
    };

    const selectedAction = actionTypes.find(action => action.value === formData.actionType);

    const getRelevantFields = () => {
        switch (formData.actionType) {
            case 'request_changes':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="message">Change Request Message</Label>
                            <Input
                                id="message"
                                placeholder="Describe the changes needed in the contract..."
                                value={formData.message}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(value: "low" | "medium" | "high") => setFormData(prev => ({ ...prev, priority: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className='bg-white'>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );

            case 'send_notification':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="recipients">Recipients</Label>
                            <Input
                                id="recipients"
                                placeholder="email1@example.com, email2@example.com"
                                value={formData.recipients}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, recipients: e.target.value }))}
                            />
                            <div className="text-xs text-gray-500">Separate multiple recipients with commas</div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Input
                                id="message"
                                placeholder="Notification message..."
                                value={formData.message}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            />
                        </div>
                    </div>
                );

            case 'create_task':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="assignee">Assignee</Label>
                            <Input
                                id="assignee"
                                placeholder="person@example.com"
                                value={formData.assignee}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(value: "low" | "medium" | "high") => setFormData(prev => ({ ...prev, priority: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className='bg-white'>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Task Description</Label>
                            <Input
                                id="message"
                                placeholder="Describe the task..."
                                value={formData.message}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            />
                        </div>
                    </div>
                );

            case 'flag_for_followup':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Follow-up Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Follow-up Notes</Label>
                            <Input
                                id="message"
                                placeholder="Notes for follow-up..."
                                value={formData.message}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                placeholder="urgent, contract, compliance"
                                value={formData.tags}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                            />
                            <div className="text-xs text-gray-500">Separate tags with commas</div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="message">Notes</Label>
                            <Input
                                id="message"
                                placeholder="Additional notes for this action..."
                                value={formData.message}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
            <DrawerContent className="h-full w-[500px] max-w-none rounded-none bg-white">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-2">
                        <Play className="w-5 h-5 text-primary" />
                        Action Configuration
                    </DrawerTitle>
                    <DrawerDescription>
                        Configure the action to be executed when this node is reached
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 px-4 pb-4 overflow-y-auto space-y-6">
                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Describe what this action does"
                            value={formData.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    {/* Action Type */}
                    <div className="space-y-2">
                        <Label>Action Type</Label>
                        <Select
                            value={formData.actionType}
                            onValueChange={(value: ActionType) => setFormData(prev => ({ ...prev, actionType: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                {actionTypes.map((action) => (
                                    <SelectItem key={action.value} value={action.value}>
                                        <div>
                                            <div className="font-medium">{action.label}</div>
                                            <div className="text-xs text-gray-500">{action.description}</div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selectedAction && (
                            <div className="text-xs text-gray-600 mt-1">
                                {selectedAction.description}
                            </div>
                        )}
                    </div>

                    {/* Action-specific fields */}
                    {getRelevantFields()}
                </div>

                <DrawerFooter className="border-t">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="flex-1 text-white"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Configuration
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
