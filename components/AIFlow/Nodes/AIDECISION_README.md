# AI Decision Node

The AI Decision node allows you to create decision trees based on AI analysis results from your contract analysis.

## Features

### Condition Types

1. **Risk Score**: Evaluate based on the overall risk score (0-10)
   - Example: Risk Score > 5 (high risk alert)
   - Example: Risk Score <= 3 (acceptable risk)

2. **Risk Level**: Check if findings contain specific risk levels
   - Example: Has High Risk findings
   - Example: Has Medium Risk findings

3. **Finding Count**: Evaluate based on the number of findings
   - Example: Finding count > 5 (too many issues)
   - Example: Finding count <= 2 (clean contract)

4. **Custom Rule**: Evaluate specific rules by name
   - Example: Rule "ambiguous_wording" with risk value > 1
   - Example: Rule "compliance" with risk value = 3

## Usage Example

```
Document → AI Analyze → AI Decision → [True/False Paths]
```

### Sample Workflow

1. **Document Node**: Select a contract document
2. **AI Analyze Node**: Analyze the document with AI
3. **AI Decision Node**: 
   - Condition: Risk Score > 5
   - True Path: "High Risk - Manual Review Required"
   - False Path: "Low Risk - Auto Approve"

## Configuration

### Risk Score Example
- **Condition Type**: Risk Score
- **Operator**: Greater than (>)
- **Value**: 5
- **True Label**: "High Risk"
- **False Label**: "Low Risk"

### Risk Level Example
- **Condition Type**: Risk Level
- **Risk Level**: High
- **True Label**: "Has High Risk"
- **False Label**: "No High Risk"

### Custom Rule Example
- **Condition Type**: Custom Rule
- **Rule Name**: "compliance"
- **Operator**: Greater than (>)
- **Value**: 1 (Medium or High risk)
- **True Label**: "Compliance Issues"
- **False Label**: "Compliant"

## Input Structure

The AI Decision node expects the following input structure from AI Analyze:

```typescript
{
    "executive_summary": "Summary of the analysis",
    "findings": [
        {
            "rule_name": "ambiguous_wording",
            "evidence": "Contract text evidence",
            "risk_level": "Medium",
            "explanation": "Why this is a risk",
            "mitigation": "How to fix it"
        }
    ],
    "overall_risk_score": 7
}
```

## Output Structure

The node outputs the original analysis plus the decision result:

```typescript
{
    // Original analysis data...
    decision: true,  // or false
    decisionPath: "true"  // or "false"
}
```

## Common Use Cases

1. **Contract Triage**: Automatically route high-risk contracts for manual review
2. **Compliance Checking**: Flag contracts with compliance issues
3. **Risk Assessment**: Categorize contracts by risk level
4. **Quality Control**: Identify contracts with too many issues

## Tips

- Use multiple AI Decision nodes in sequence for complex logic
- Combine with regular Decision nodes for hybrid workflows
- Label your True/False paths clearly for better workflow understanding
- Test your conditions with sample data before deploying
