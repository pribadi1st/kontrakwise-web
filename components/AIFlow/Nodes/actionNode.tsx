import { Handle, Position, useReactFlow } from "@xyflow/react"
import type { NodeProps, Node } from "@xyflow/react";
import { Play, Settings, CheckCircle, AlertTriangle, Clock, FileText, Send } from "lucide-react";
import React, { useCallback, useState } from 'react';
import { BaseNodeData } from "./index";
import { getNodeBorderColor } from "@/utils/reactNode/progressState";
import { AIAnalysisResult } from "./aiDecisionNode";
import { ActionDrawer } from "../Drawer/ActionDrawer";

export type ActionType =
  | 'approve'
  | 'reject'
  | 'manual_review'
  | 'request_changes'
  | 'send_notification'
  | 'create_task'
  | 'flag_for_followup'
  | 'archive';

export type ActionNodeData = BaseNodeData & {
  description?: string;
  actionType: ActionType;
  actionConfig: {
    message?: string;
    recipients?: string[];
    priority?: 'low' | 'medium' | 'high';
    assignee?: string;
    dueDate?: string;
    tags?: string[];
  };
  input: AIAnalysisResult;
}

export type ActionNode = Node<ActionNodeData>

const actionConfig = {
  approve: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    label: 'Approve',
    description: 'Approve contract or document'
  },
  reject: {
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: 'Reject',
    description: 'Reject contract or document'
  },
  manual_review: {
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: 'Manual Review',
    description: 'Flag for manual review'
  },
  request_changes: {
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: 'Request Changes',
    description: 'Request changes to contract'
  },
  send_notification: {
    icon: Send,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    label: 'Send Notification',
    description: 'Send notification to stakeholders'
  },
  create_task: {
    icon: CheckCircle,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    label: 'Create Task',
    description: 'Create follow-up task'
  },
  flag_for_followup: {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    label: 'Flag for Follow-up',
    description: 'Flag for future follow-up'
  },
  archive: {
    icon: FileText,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    label: 'Archive',
    description: 'Archive the document'
  }
};

export function ActionNodeComponent({ id, data, isConnectable }: NodeProps<ActionNode>) {
  const { updateNodeData, getNode } = useReactFlow();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSettingsClick = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  // Execute method for this node
  const execute = async (): Promise<null | Error> => {
    // Get current node data to avoid closure issues
    const currentNode = getNode(id);
    if (!currentNode) {
      return new Error('Node not found');
    }

    const currentData = currentNode.data as ActionNodeData;

    // Set loading status in node data
    updateNodeData(id, { status: 'loading' });

    if (!currentData.input) {
      updateNodeData(id, { status: 'failed' });
      return new Error('No analysis input for action');
    }

    try {
      const { actionType, actionConfig } = currentData;
      const analysis = currentData.input;

      // Execute the action based on type
      console.log(`Executing action: ${actionType}`);
      console.log('Analysis data:', analysis);
      console.log('Action config:', actionConfig);

      // Here you would implement the actual action logic
      // For now, we'll just log and simulate the action
      switch (actionType) {
        case 'approve':
          console.log(`✅ APPROVED: Contract approved automatically`);
          break;
        case 'reject':
          console.log(`❌ REJECTED: Contract rejected due to issues`);
          break;
        case 'manual_review':
          console.log(`👥 MANUAL REVIEW: Flagged for manual review`);
          break;
        case 'request_changes':
          console.log(`📝 CHANGES REQUESTED: Changes requested with message: ${actionConfig.message}`);
          break;
        case 'send_notification':
          console.log(`📧 NOTIFICATION: Notification sent to ${actionConfig.recipients?.join(', ')}`);
          break;
        case 'create_task':
          console.log(`📋 TASK CREATED: Task created for ${actionConfig.assignee}`);
          break;
        case 'flag_for_followup':
          console.log(`🏁 FLAGGED: Flagged for follow-up on ${actionConfig.dueDate}`);
          break;
        case 'archive':
          console.log(`📦 ARCHIVED: Document archived`);
          break;
      }

      // Pass through the analysis result
      updateNodeData(id, {
        output: {
          ...analysis,
          actionExecuted: actionType,
          actionResult: 'success',
          timestamp: new Date().toISOString()
        },
        status: 'success'
      });

      return null;
    } catch (error) {
      console.error('Action execution failed:', error);
      updateNodeData(id, { status: 'failed' });
      return error as Error;
    }
  };

  // Initialize execute method in node data
  React.useEffect(() => {
    if (!data.execute) {
      updateNodeData(id, { execute });
    }
  }, [id, data.execute, updateNodeData]);

  const handleSave = (nodeId: string, newData: Partial<ActionNodeData>) => {
    updateNodeData(nodeId, newData);
    setIsDrawerOpen(false);
  };

  const executeAction = async () => {
    await execute();
  };

  const currentAction = actionConfig[data.actionType] || actionConfig.manual_review;
  const ActionIcon = currentAction.icon;

  return (
    <div className={`flex flex-col border ${getNodeBorderColor(data.status)} rounded`}>
      <div className="flex-between items-center bg-primary-surface p-4">
        <div className="flex-center gap-2">
          <div className={`p-1 rounded ${currentAction.bgColor}`}>
            <ActionIcon className={`w-4 h-4 ${currentAction.color}`} />
          </div>
          <div className="font-medium text-sm">{currentAction.label}</div>
        </div>
        <div className="flex-center gap-2">
          <Play size={16} className="cursor-pointer text-warning" fill="#FAAD14" onClick={executeAction} />
          <Settings className="text-primary cursor-pointer" size={16} onClick={handleSettingsClick} />
        </div>
      </div>
      <div className="flex p-4 flex-col bg-white gap-2">
        <div className="font-medium text-sm">Action</div>
        <div className="text-xs text-neutral-70">{currentAction.description}</div>

        {data.actionConfig?.message && (
          <>
            <div className="font-medium text-sm mt-2">Message</div>
            <div className="text-xs text-neutral-70 truncate">{data.actionConfig.message}</div>
          </>
        )}

        {data.input && (
          <>
            <div className="font-medium text-sm mt-2">Input Analysis</div>
            <div className="text-xs text-neutral-70">
              Risk Score: {data.input.overall_risk_score}/10 | {data.input.findings.length} findings
            </div>
          </>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        id="action-input"
        isConnectable={isConnectable}
        style={{ background: '#169ad9', border: '2px solid #169ad9' }}
        className="w-5 h-5"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="action-output"
        isConnectable={isConnectable}
        style={{ background: '#169ad9', border: '2px solid #169ad9' }}
        className="w-5 h-5"
      />

      {/* Action Drawer */}

      <ActionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        nodeData={data}
        nodeId={id}
        onSave={handleSave}
      />
    </div>
  );
}
