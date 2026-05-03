import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await req.json();
    const lead = await prisma.lead.create({
      data: {
        timestamp: data.timestamp,
        name: data.name,
        phone_prefix: data.phone_prefix,
        phone_middle: data.phone_middle,
        phone_last: data.phone_last,
        model: data.model,
        carrier: data.carrier,
        inquiry: data.inquiry || null,
      },
    });

    return new Response(JSON.stringify({ success: true, lead }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
