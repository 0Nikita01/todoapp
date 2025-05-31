CREATE DATABASE todoapp;

CREATE TABLE users (
	id UUID PRIMARY KEY,
	user_name TEXT NOT NULL,
	created_time TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sections (
	id UUID PRIMARY KEY,
	user_id UUID REFERENCES users(id) ON DELETE CASCADE,
	title TEXT NOT NULL
);

CREATE TABLE tasks (
	id UUID PRIMARY KEY,
	section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
	title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users(id, user_name) VALUES
('0196d859-cdba-73da-b8f6-8d1bf38a2657', 'Гончар Илья');

INSERT INTO sections(id, user_id, title) VALUES
('019720a3-433e-7b15-95f2-16814c930cbb', '0196d859-cdba-73da-b8f6-8d1bf38a2657', 'Первая секция');

