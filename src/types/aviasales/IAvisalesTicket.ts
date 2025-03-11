import { z } from 'zod';

const segmentSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  date: z.string(),
  stops: z.array(z.string()),
  duration: z.number(),
});

const aviasalesTicketSchema = z.object({
  // id: z.string(),
  price: z.number(),
  carrier: z.string(),
  segments: z.array(segmentSchema).length(2),
});

export const aviasalesTicketResponseSchema = z.object({
  tickets: z.array(aviasalesTicketSchema),
  stop: z.boolean(),
});

export type TAviasalesTicketResponse = z.infer<
  typeof aviasalesTicketResponseSchema
>;
export type TAviasalesTicket = z.infer<typeof aviasalesTicketSchema>;

export type TAviasalesTicketWithId = TAviasalesTicket & {
  id: string;
};
