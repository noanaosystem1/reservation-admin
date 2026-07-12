/**
 * Experience System API Client
 */

const API_BASE = process.env.EXPERIENCE_API_URL || 'http://localhost:3001';
const API_PASSWORD = process.env.EXPERIENCE_API_PASSWORD || 'secret';

export async function createExperienceRoom(name: string): Promise<string | null> {
    try {
        const res = await fetch(`${API_BASE}/api/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Password': API_PASSWORD
            },
            body: JSON.stringify({ name })
        });

        if (!res.ok) {
            console.error('Failed to create experience room:', await res.text());
            return null;
        }

        const data = await res.json();
        return data.id; // Returns Room UUID
    } catch (err) {
        console.error('Experience API Error (createRoom):', err);
        return null;
    }
}

export async function createExperienceGuest(name: string, roomId: string): Promise<{ guestUrl: string } | null> {
    try {
        const res = await fetch(`${API_BASE}/api/guests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Password': API_PASSWORD
            },
            body: JSON.stringify({ name, roomId, isActive: true })
        });

        if (!res.ok) {
            console.error('Failed to create experience guest:', await res.text());
            return null;
        }

        const data = await res.json();
        return { guestUrl: data.guestUrl };
    } catch (err) {
        console.error('Experience API Error (createGuest):', err);
        return null;
    }
}
