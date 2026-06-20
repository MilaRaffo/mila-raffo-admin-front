import React, { useState } from 'react';
import { apiRequest } from '@/lib/http-client';

export function NotificationCreate() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        setStatus('loading');
        setErrorMsg('');

        try {
            await apiRequest('/notifications/broadcast', {
                method: 'POST',
                body: JSON.stringify({ title: title.trim(), body: body.trim() }),
            });
            setStatus('success');
            setTitle('');
            setBody('');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Error al enviar la notificación');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Enviar Notificación</h2>
            <p style={styles.description}>
                Envía un mensaje push a todos los usuarios con notificaciones de ofertas activadas.
            </p>

            <form onSubmit={(e) => void handleSubmit(e)} style={styles.form}>
                <label style={styles.label}>
                    Título
                    <input
                        style={styles.input}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="ej: ¡Nueva oferta!"
                        maxLength={100}
                        required
                        disabled={status === 'loading'}
                    />
                </label>

                <label style={styles.label}>
                    Mensaje
                    <textarea
                        style={{ ...styles.input, ...styles.textarea }}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="ej: Descuentos de hasta 40% en toda la colección."
                        maxLength={300}
                        required
                        disabled={status === 'loading'}
                    />
                    <span style={styles.counter}>{body.length}/300</span>
                </label>

                {status === 'success' && (
                    <div style={styles.successBanner}>
                        ✓ Notificación enviada exitosamente.
                    </div>
                )}

                {status === 'error' && (
                    <div style={styles.errorBanner}>
                        ✕ {errorMsg}
                    </div>
                )}

                <button
                    type="submit"
                    style={styles.button}
                    disabled={status === 'loading' || !title.trim() || !body.trim()}
                >
                    {status === 'loading' ? 'Enviando...' : 'Enviar a todos'}
                </button>
            </form>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: 560,
        margin: '32px auto',
        padding: '32px',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    },
    heading: {
        fontFamily: 'inherit',
        fontSize: 22,
        fontWeight: 700,
        marginBottom: 8,
        color: '#111827',
    },
    description: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 24,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        fontSize: 14,
        fontWeight: 600,
        color: '#374151',
    },
    input: {
        padding: '10px 12px',
        border: '1px solid #d1d5db',
        borderRadius: 6,
        fontSize: 14,
        color: '#111827',
        fontFamily: 'inherit',
        outline: 'none',
        resize: 'none',
    },
    textarea: {
        minHeight: 100,
    },
    counter: {
        alignSelf: 'flex-end',
        fontSize: 12,
        color: '#9ca3af',
        marginTop: -4,
    },
    successBanner: {
        padding: '12px 16px',
        background: '#d1fae5',
        color: '#065f46',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 500,
    },
    errorBanner: {
        padding: '12px 16px',
        background: '#fee2e2',
        color: '#991b1b',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 500,
    },
    button: {
        padding: '12px 24px',
        background: '#EC7C43',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        opacity: 1,
    },
};
