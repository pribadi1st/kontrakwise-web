import zod from "zod";


const severityLevel = zod.enum(["low", "medium", "high"])
export const documentTypeSchema = zod.object({
    name: zod.string("Name is required").min(1, "Name cannot be empty"),
    description: zod.string("Description is required").min(1, "Description cannot be empty"),
    risk_rules: zod.array(
        zod.object({
            id: zod.number().optional(),
            clause: zod.string("Clause is required").min(1, "Clause cannot be empty"),
            severity: severityLevel,
            criteria: zod.string("Criteria is required").min(1, "Criteria cannot be empty"),
        })
    ).optional(),
})
