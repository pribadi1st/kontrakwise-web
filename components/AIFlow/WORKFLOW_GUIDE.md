# AI Flow Workflow Guide

This guide explains how to build complete contract analysis workflows using the AI Decision and Action nodes.

## Complete Workflow Example

### Basic Contract Triage Workflow

```
Document → AI Analyze → AI Decision → [True Path: Action] → [False Path: Action]
```

#### Step 1: Document Selection
- **Node**: Document Node
- **Purpose**: Select the contract document to analyze
- **Output**: Document object

#### Step 2: AI Analysis
- **Node**: AI Analyze Node
- **Purpose**: Analyze the contract using AI
- **Configuration**: Choose analysis type and rules
- **Output**: AI Analysis Result with risk score and findings

#### Step 3: AI Decision
- **Node**: AI Decision Node
- **Purpose**: Make decision based on analysis results
- **Configuration Examples:
  - **Risk Score**: `overall_risk_score > 5`
  - **High Risk Alert**: `Has High Risk findings`
  - **Too Many Issues**: `Finding count > 3`
  - **Compliance Check**: `Rule "compliance" with risk > 1`

#### Step 4: Action Nodes (True/False Paths)

**True Path Actions** (High Risk):
- **Manual Review**: Flag for manual review
- **Request Changes**: Send change requests
- **Reject**: Reject the contract
- **Create Task**: Create follow-up tasks

**False Path Actions** (Low Risk):
- **Approve**: Auto-approve contract
- **Archive**: Archive approved document
- **Send Notification**: Send approval notification

## Action Node Types

### 1. Approve
- **Purpose**: Automatically approve contracts
- **Use Case**: Low-risk contracts that meet criteria
- **Configuration**: Notes for approval record

### 2. Reject
- **Purpose**: Reject high-risk contracts
- **Use Case**: Contracts with critical issues
- **Configuration**: Rejection reason and notes

### 3. Manual Review
- **Purpose**: Flag for human review
- **Use Case**: Medium-risk or ambiguous cases
- **Configuration**: Priority level and review notes

### 4. Request Changes
- **Purpose**: Request specific changes
- **Use Case**: Contracts with fixable issues
- **Configuration**: 
  - Change request message
  - Priority level
  - Due date

### 5. Send Notification
- **Purpose**: Notify stakeholders
- **Use Case**: Keep teams informed
- **Configuration**:
  - Recipient emails
  - Message content
  - Priority

### 6. Create Task
- **Purpose**: Create follow-up tasks
- **Use Case**: Assign work to team members
- **Configuration**:
  - Assignee email
  - Task description
  - Due date
  - Priority

### 7. Flag for Follow-up
- **Purpose**: Mark for future attention
- **Use Case**: Long-term monitoring
- **Configuration**:
  - Follow-up date
  - Notes
  - Tags

### 8. Archive
- **Purpose**: Store completed documents
- **Use Case**: Clean up processed contracts
- **Configuration**: Archive notes

## Workflow Examples

### Example 1: Simple Risk-Based Triage

1. **AI Decision**: Risk Score > 6
2. **True Path**: Manual Review (High Priority)
3. **False Path**: Approve

### Example 2: Compliance-Focused Workflow

1. **AI Decision**: Has "compliance" rule findings
2. **True Path**: Request Changes + Create Task
3. **False Path**: Send Notification (Approved)

### Example 3: Multi-Condition Workflow

1. **AI Decision 1**: Risk Score > 7
   - True: Reject
   - False: Continue to Decision 2
2. **AI Decision 2**: Finding count > 5
   - True: Manual Review
   - False: Approve

### Example 4: Department-Based Routing

1. **AI Decision**: Rule "ambiguous_wording" with High risk
2. **True Path**: Create Task (Contract Team)
3. **False Path**: AI Decision 2: Risk Score > 4
   - True: Manual Review (Business Team)
   - False: Approve

## Best Practices

### 1. Decision Logic
- Start with broad conditions (risk score)
- Add specific conditions for edge cases
- Use multiple decision nodes for complex logic

### 2. Action Configuration
- Always provide clear messages and notes
- Set appropriate priority levels
- Include due dates for time-sensitive actions

### 3. Error Handling
- Monitor failed executions
- Set up fallback actions
- Log all actions for audit trails

### 4. Performance
- Limit the number of decision nodes in sequence
- Use efficient conditions
- Test with sample data first

## Input/Output Flow

### AI Decision Node Input
```typescript
{
  "executive_summary": "string",
  "findings": [
    {
      "rule_name": "string",
      "evidence": "string", 
      "risk_level": "Low|Medium|High",
      "explanation": "string",
      "mitigation": "string"
    }
  ],
  "overall_risk_score": number
}
```

### AI Decision Node Output
```typescript
{
  // Original analysis data...
  decision: boolean,
  decisionPath: "true" | "false"
}
```

### Action Node Input
Same as AI Decision output (includes analysis + decision)

### Action Node Output
```typescript
{
  // Original analysis + decision data...
  actionExecuted: ActionType,
  actionResult: "success",
  timestamp: "ISO string"
}
```

## Testing Your Workflow

1. **Test Data**: Use sample contracts with known risk profiles
2. **Edge Cases**: Test boundary conditions (score = 5, empty findings, etc.)
3. **Action Validation**: Ensure all actions have proper configuration
4. **End-to-End**: Run complete workflow and verify each step

## Troubleshooting

### Common Issues
- **Decision Not Firing**: Check condition configuration and input data
- **Action Not Executing**: Verify action configuration and required fields
- **Wrong Path Taken**: Double-check decision logic and operators
- **Missing Data**: Ensure proper data flow between nodes

### Debug Tips
- Check node status indicators
- Review console logs for execution details
- Verify input/output data structure
- Test individual nodes before connecting
