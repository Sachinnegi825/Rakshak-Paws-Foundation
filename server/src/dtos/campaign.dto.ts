import { z } from 'zod';

export const createCampaignSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description is required'),
  longDescription: z.string().min(20, 'Long description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  goalAmount: z.number().positive('Goal must be positive'),
  category: z.string().optional(),
});

export type CreateCampaignDTO = z.infer<typeof createCampaignSchema>;

export const updateCampaignSchema = createCampaignSchema.partial().extend({
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});
export type UpdateCampaignDTO = z.infer<typeof updateCampaignSchema>;
