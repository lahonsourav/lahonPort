import React, { useState } from 'react';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');

    const handleSendNotification = async () => {
        setLoading(true);
        setResponseMsg('');

        try {
            const res = await fetch('http://192.168.101.248:5000/api/send_notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            const data = await res.json();

            if (res.ok) {
                setResponseMsg('✅ Notification sent to all users!');
            } else {
                setResponseMsg(`❌ Failed: ${data.error}`);
            }
        } catch (err) {
            setResponseMsg(`❌ Network Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
            <h2>Admin Push Notification Panel</h2>

            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', marginBottom: 10, padding: 5 }}
                />
            </label>

            <label>
                Body:
                <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ width: '100%', marginBottom: 10, padding: 5 }}
                />
            </label>

            <button
                onClick={handleSendNotification}
                disabled={loading || !title || !body}
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                {loading ? 'Sending...' : 'Send Notification'}
            </button>

            {responseMsg && <p style={{ marginTop: 15 }}>{responseMsg}</p>}
        </div>
    );
};

export default Admin;
