# IQ Mentor — единый баланс

Сайт-презентация из 10 слайдов по PRD «Проработка тарификации».

Статический сайт: откройте `dist/index.html` или запустите HTTP-сервер в `dist`. Внешние запросы для работы не нужны: шрифты и иллюстрация включены.

Навигация: стрелки, Page Up / Page Down, пробел, Home / End и экранные кнопки. Слайды переключаются плавным затемнением без горизонтального движения и свайпов. Прямые ссылки: `#slide-1` … `#slide-10`. Есть полноэкранный режим, режим уменьшенной анимации и стили печати. В длинных слайдах доступна вертикальная прокрутка.

Два интерактивных примера: независимые переключатели продуктов и раскрытие детализации списания. Они демонстрационные и не меняют реальный кабинет.

## Источники и редакторские решения

- Требования: предоставленный PRD «Проработка тарификации (3).docx».
- Визуальный референс: https://github.com/elitrao/global-dent-presentation — графитовый фон #191919, Manrope, акцент #d4b896, лёгкая крупная типографика. Иллюстрация обложки заменена по запросу пользователя на новый предметный образ единого баланса (unified-balance.png, встроенный ImageGen).
- Шрифты Manrope: @fontsource-variable/manrope 5.2.8 (SIL Open Font License).
- Логотип IQ Group предоставлен пользователем (logo_itr6kzqv8g.png), установлен в верхнем левом углу на всех слайдах.
- Промпт новой иллюстрации (встроенный ImageGen): Premium editorial 3D product-mockup hero for Russian IQ Mentor billing; one shared balance used by two products. One wide matte graphite tray/wallet-like vessel with a few brushed champagne-metal discs. Exactly two upright smoked-glass product slabs behind it, one with subtle engraved analytical bars, the other an audio-wave mark. Landscape 3:2; arrangement concentrated in right 60%, left 40% empty for heading. Deep charcoal #191919 seamless backdrop, satin champagne gold #d4b896 accents. Physically plausible grounded arrangement, soft large studio light, readable silhouettes, quiet premium product photography. No text, numbers, logos, watermark, glowing cubes, loops, neon, science-fiction, or floating clutter.
- Минимальное пополнение взято из конкретных требований: 25 000 ₽; ранняя общая формулировка «с комфортной суммы» не трактуется как отсутствие минимума.
- Резерв Тренера: явное правило 20 × 12 = 240 ₽. Примеры PRD с 180 ₽ противоречат этому правилу. Презентация использует 240 ₽: 3 сессии резервируют 720 ₽, при 1 000 ₽ остаётся 280 ₽. После сессии на 10 минут списывается 120 ₽, освобождается 120 ₽.
- Примеры операций и использования иллюстративные, не клиентская статистика. В примере истории бонусы могли быть израсходованы до показанного дневного списания.
- Миграция учитывает меньшую из новой и исторической цены минуты, а также оплаченный объём будущих месяцев.
- Механика продления резерва после 20 минут и правила округления в PRD не конкретизированы. Презентация не придумывает эти правила.
