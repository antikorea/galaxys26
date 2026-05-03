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

    // 텔레그램 알림
    try {
      const telegramToken = '8734012174:AAE8PYV7W8dzrauAzetXC3CUJmEnOKR_dkg';
      const chatId = '-1003951663293';
      const fullPhone = `${data.phone_prefix}-${data.phone_middle}-${data.phone_last}`;
      const message =
        `📱 *갤럭시 S26 신규 문의*\n` +
        `─────────────────\n` +
        `👤 고객명: ${data.name || '-'}\n` +
        `📞 연락처: ${fullPhone}\n` +
        `📦 모델: ${data.model || '-'}\n` +
        `📡 통신사: ${data.carrier || '-'}\n` +
        `💬 문의내용: ${data.inquiry || '없음'}\n` +
        `🕐 접수시간: ${new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}`;

      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
      });
    } catch (tgErr) {
      console.error('Telegram notify error:', tgErr);
    }

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
