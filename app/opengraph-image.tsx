import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI Agents — внедрение AI-агентов для бизнеса';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at top left, rgba(0,209,255,0.25), transparent 35%), radial-gradient(circle at bottom right, rgba(0,255,148,0.18), transparent 30%), linear-gradient(135deg, #08111f 0%, #0b0f19 50%, #10182a 100%)',
          color: 'white',
          fontFamily: 'Arial',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 32,
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(255,255,255,0.04)',
            display: 'flex',
          }}
        />

        <div
          style={{
            zIndex: 1,
            display: 'flex',
            width: '100%',
            padding: '64px 72px',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '68%',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: '#00D1FF',
                  boxShadow: '0 0 24px rgba(0, 209, 255, 0.8)',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  fontSize: 28,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#9ddff0',
                }}
              >
                AI Agents
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 66,
                  lineHeight: 1.05,
                  fontWeight: 700,
                  maxWidth: 720,
                }}
              >
                AI-агенты для продаж, поддержки и процессов бизнеса
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: '#cad6e2',
                  maxWidth: 760,
                }}
              >
                Интеграция с CRM, мессенджерами, базами знаний и API. Пилотный сценарий за 2-6 недель.
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
              }}
            >
              {['Продажи', 'Поддержка', 'Операции', 'CRM + API'].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    padding: '12px 18px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.14)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#eef7ff',
                    fontSize: 22,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              zIndex: 1,
              width: 280,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'stretch',
              gap: 18,
            }}
          >
            {[
              'Быстрый аудит процессов',
              'Сценарии с понятным ROI',
              'Запуск без лишней сложности',
            ].map((item, index) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 22px',
                  borderRadius: 24,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: index === 2 ? 'rgba(0,255,148,0.12)' : 'rgba(255,255,255,0.05)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontSize: 22,
                    color: '#eaf7ff',
                    lineHeight: 1.3,
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
