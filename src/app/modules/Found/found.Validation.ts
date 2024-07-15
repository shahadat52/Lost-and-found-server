import z from 'zod'
const createFoundCategorySchema = z.object({
    name: z.string({ required_error: 'Category is Required' })
});

const createFoundItemSchema = z.object({
    categoryId: z.string({ required_error: 'CategoryId is Required' }),
    foundItemName: z.string({ required_error: 'FoundItemName is Required' }),
    description: z.string({ required_error: 'Description is Required' }),
    location: z.string({ required_error: 'Location is Required' })
})

export const foundValidations = {
    createFoundCategorySchema,
    createFoundItemSchema
}