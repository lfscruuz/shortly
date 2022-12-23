--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (5, 1, '63ab1356-4ad2-4245-8d91-4c2c22e5375f');
INSERT INTO public.sessions VALUES (6, 2, '72b6d8f3-61c3-4003-8a9d-3592a4eebf75');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (19, 1, 'jIwPBEz_Tn9FT8A2ne5vZ', 'http://efg.com', 0);
INSERT INTO public.urls VALUES (20, 1, 's_ZpUJNsB4BlUOAe3zO1-', 'http://efg.com', 0);
INSERT INTO public.urls VALUES (22, 1, 'kex1IrzT5qs3RKJ0xRzFi', 'http://abcd.com', 0);
INSERT INTO public.urls VALUES (23, 1, 'ilE3lMQBzeiFwsy6zwL0f', 'http://abcd.com', 0);
INSERT INTO public.urls VALUES (26, 2, 'Jxaa1lHys_yvMoWSBvhsv', 'http://abcd.com', 0);
INSERT INTO public.urls VALUES (27, 2, '-0w-Uf4cd6n62N3hXN5nV', 'http://abcd.com', 0);
INSERT INTO public.urls VALUES (28, 2, 'KzzqTpMUZsyK1ws30I241', 'http://efg.com', 0);
INSERT INTO public.urls VALUES (29, 2, 'ok_TH8Ury3_I9q56JYm2q', 'http://efg.com', 0);
INSERT INTO public.urls VALUES (30, 2, '_SLFr7wcJxDYb8yNZCxYD', 'http://efg.com', 0);
INSERT INTO public.urls VALUES (18, 1, 'UjbHDFGMRA7NxQpP37SJP', 'http://efg.com', 4);
INSERT INTO public.urls VALUES (21, 1, 'CZFfFtsPxFoj8Y_GzxptC', 'http://efg.com', 2);
INSERT INTO public.urls VALUES (25, 2, 'tsbUGIS7t-fu9qvBV9dVT', 'http://abcd.com', 2);
INSERT INTO public.urls VALUES (24, 2, 'yCiGQAx-qJUHyKwz8RJY8', 'http://abcd.com', 3);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'luis', 'luis@email.com', '$2b$10$HkX8MXhHvOu9uRMXBZwhp.bCGTmDy0jf0WMbGlxy/WWWggLveakaG');
INSERT INTO public.users VALUES (2, 'felipe', 'felipe@email.com', '$2b$10$ED0yj2D4kkUt8VK.L5hs/uUf5lroBxDubXqvVPATtxbN5GI3xvzum');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 6, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 30, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

