import { connect as _connect } from 'mongoose';


export async function connect() {
    const url = process.env.DB_URL;
    await _connect(url);
}

