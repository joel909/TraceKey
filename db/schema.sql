--
-- PostgreSQL database dump
--

\restrict RE4j7q2LE59Gu9q6enowj3LpCGN0Rws7hz9oXELM7E7ay7DBdpbtXsOdnysDu0F

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
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
-- Name: interactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.interactions (
    api_key character(50) NOT NULL,
    ip_address character varying(40),
    user_agent character varying,
    referrer_url character varying,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    device_information jsonb,
    cookies jsonb,
    interaction_id uuid DEFAULT gen_random_uuid() NOT NULL,
    region character varying,
    device character varying,
    page_route character varying NOT NULL,
    action_name character varying NOT NULL,
    device_id character varying NOT NULL,
    additional_device_info jsonb
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    project_id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_by uuid NOT NULL,
    project_name character varying(100) NOT NULL,
    api_key character(50) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    password character varying(100) NOT NULL,
    site_url character varying(200),
    description character varying(300) DEFAULT 'No Description Provided'::character varying,
    CONSTRAINT min_password CHECK ((length((password)::text) >= 5)),
    CONSTRAINT min_project_name_length CHECK ((length((project_name)::text) >= 5))
);


--
-- Name: user_projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_projects (
    uuid uuid NOT NULL,
    project_id uuid NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(100) NOT NULL,
    name character varying(50),
    password character varying(200) NOT NULL,
    auth_key character varying(256) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT users_password_check CHECK ((length((password)::text) >= 5))
);


--
-- Name: interactions interactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT interactions_pkey PRIMARY KEY (interaction_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);


--
-- Name: user_projects user_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_projects
    ADD CONSTRAINT user_projects_pkey PRIMARY KEY (uuid, project_id);


--
-- Name: users users_auth_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_auth_key_key UNIQUE (auth_key);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);


--
-- Name: idx_project_created_by; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_project_created_by ON public.projects USING btree (created_by);


--
-- Name: projects_api_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX projects_api_key_key ON public.projects USING btree (api_key);


--
-- Name: query_indexes; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX query_indexes ON public.interactions USING btree (api_key, page_route, action_name, "timestamp", device_id);


--
-- Name: interactions api_key_foregin_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT api_key_foregin_key FOREIGN KEY (api_key) REFERENCES public.projects(api_key);


--
-- Name: projects fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(uuid);


--
-- Name: user_projects user_projects_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_projects
    ADD CONSTRAINT user_projects_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(project_id);


--
-- Name: user_projects user_projects_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_projects
    ADD CONSTRAINT user_projects_uuid_fkey FOREIGN KEY (uuid) REFERENCES public.users(uuid);


--
-- PostgreSQL database dump complete
--

\unrestrict RE4j7q2LE59Gu9q6enowj3LpCGN0Rws7hz9oXELM7E7ay7DBdpbtXsOdnysDu0F

