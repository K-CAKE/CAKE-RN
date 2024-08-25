create table "public"."Foreigner_NOTME" (
    "ForeignerId" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "UserName" character varying not null,
    "Region" bigint not null,
    "UserEmail" character varying not null,
    "Password" character varying not null,
    "Point" bigint not null
);


alter table "public"."Foreigner_NOTME" enable row level security;

create table "public"."chat" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "chatting" text,
    "chat_room" smallint not null,
    "is_user1" boolean default true
);


alter table "public"."chat" enable row level security;

create table "public"."chat_room" (
    "id" smallint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user1" smallint,
    "user2" smallint
);


alter table "public"."chat_room" enable row level security;

create table "public"."food_receipt_file" (
    "food_file_id" bigint generated by default as identity not null,
    "foreigner_id" bigint generated by default as identity not null,
    "food_request_id" bigint generated by default as identity not null,
    "food_receipt_serial" character varying not null,
    "food_store_name" character varying not null
);


alter table "public"."food_receipt_file" enable row level security;

create table "public"."food_request_history" (
    "food_request_id" bigint generated by default as identity not null,
    "request_state" text not null,
    "request_price" bigint not null,
    "food_payment" bigint not null,
    "processing_date" date not null,
    "serial_number" character varying not null,
    "korean_fee" bigint not null,
    "food_request_name" character varying not null,
    "foreigner_id" bigint generated by default as identity not null,
    "korean_id" bigint generated by default as identity not null
);


alter table "public"."food_request_history" enable row level security;

create table "public"."foreigner" (
    "foreigner_id" bigint generated by default as identity not null,
    "user_name" character varying not null,
    "user_email" character varying not null,
    "user_password" character varying not null,
    "region" bigint not null,
    "history_id" bigint,
    "point_id" bigint generated by default as identity not null
);


alter table "public"."foreigner" enable row level security;

create table "public"."korean" (
    "korean_id" bigint generated by default as identity not null,
    "user_name" character varying not null,
    "user_email" character varying not null,
    "user_password" character varying not null,
    "region" bigint not null,
    "history_id" bigint,
    "point_id" bigint generated by default as identity not null
);


alter table "public"."korean" enable row level security;

create table "public"."point" (
    "point_id" bigint generated by default as identity not null,
    "current_point" bigint
);


alter table "public"."point" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "username" text,
    "avatar_url" text
);


alter table "public"."profiles" enable row level security;

create table "public"."taxi_capture_file" (
    "taxi_file_id" bigint generated by default as identity not null,
    "taxi_license_plate" character varying not null,
    "taxi_serial" character varying not null,
    "foreigner_id" bigint generated by default as identity not null,
    "taxi_request_id" bigint generated by default as identity not null
);


alter table "public"."taxi_capture_file" enable row level security;

create table "public"."taxi_request_history" (
    "taxi_request_id" bigint generated by default as identity not null,
    "korean_id" bigint generated by default as identity not null,
    "foreigner_id" bigint generated by default as identity not null,
    "request_state" bigint not null,
    "request_price" bigint not null,
    "taxi_payment" bigint not null,
    "korean_fee" bigint not null,
    "processing_date" date not null,
    "starting_point" character varying not null,
    "arrival_point" character varying not null,
    "estimated_arrival_time" time without time zone not null,
    "serial_number" character varying not null,
    "taxi_request_name" character varying not null
);


alter table "public"."taxi_request_history" enable row level security;

create table "public"."usage_history" (
    "usage_id" bigint generated by default as identity not null,
    "point_id" bigint generated by default as identity not null,
    "file_id" bigint generated by default as identity not null,
    "payment" bigint not null,
    "payment_processor" character varying not null
);


alter table "public"."usage_history" enable row level security;

CREATE UNIQUE INDEX "Foreigner_pkey" ON public."Foreigner_NOTME" USING btree ("ForeignerId", "UserName", "Region", "UserEmail", "Password", "Point");

CREATE UNIQUE INDEX chat_pkey ON public.chat USING btree (id);

CREATE UNIQUE INDEX chat_room_pkey ON public.chat_room USING btree (id);

CREATE UNIQUE INDEX food_receipt_file_food_receipt_serial_key ON public.food_receipt_file USING btree (food_receipt_serial);

CREATE UNIQUE INDEX food_receipt_file_food_request_id_key ON public.food_receipt_file USING btree (food_request_id);

CREATE UNIQUE INDEX food_receipt_file_fooda_key ON public.food_receipt_file USING btree (food_file_id);

CREATE UNIQUE INDEX food_receipt_file_foreigner_id_key ON public.food_receipt_file USING btree (foreigner_id);

CREATE UNIQUE INDEX food_receipt_file_pkey ON public.food_receipt_file USING btree (food_file_id);

CREATE UNIQUE INDEX food_request_history_id_key ON public.food_request_history USING btree (food_request_id);

CREATE UNIQUE INDEX food_request_history_pkey ON public.food_request_history USING btree (food_request_id);

CREATE UNIQUE INDEX food_request_history_serial_number_key ON public.food_request_history USING btree (serial_number);

CREATE UNIQUE INDEX foreigner_foreigner_id_key ON public.foreigner USING btree (foreigner_id);

CREATE UNIQUE INDEX foreigner_pkey ON public.foreigner USING btree (foreigner_id);

CREATE UNIQUE INDEX foreigner_point_id_key ON public.foreigner USING btree (point_id);

CREATE UNIQUE INDEX foreigner_user_email_key ON public.foreigner USING btree (user_email);

CREATE UNIQUE INDEX foreigner_user_name_key ON public.foreigner USING btree (user_name);

CREATE UNIQUE INDEX korean_korean_id_key ON public.korean USING btree (korean_id);

CREATE UNIQUE INDEX korean_pkey ON public.korean USING btree (korean_id);

CREATE UNIQUE INDEX korean_point_id_key ON public.korean USING btree (point_id);

CREATE UNIQUE INDEX korean_user_email_key ON public.korean USING btree (user_email);

CREATE UNIQUE INDEX korean_user_name_key ON public.korean USING btree (user_name);

CREATE UNIQUE INDEX point_pkey ON public.point USING btree (point_id);

CREATE UNIQUE INDEX point_point_id_key ON public.point USING btree (point_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX taxi_capture_file_file_id_key ON public.taxi_capture_file USING btree (taxi_file_id);

CREATE UNIQUE INDEX taxi_capture_file_foreigner_id_key ON public.taxi_capture_file USING btree (foreigner_id);

CREATE UNIQUE INDEX taxi_capture_file_pkey ON public.taxi_capture_file USING btree (taxi_file_id);

CREATE UNIQUE INDEX taxi_capture_file_taxi_license_plate_key ON public.taxi_capture_file USING btree (taxi_license_plate);

CREATE UNIQUE INDEX taxi_capture_file_taxi_request_id_key ON public.taxi_capture_file USING btree (taxi_request_id);

CREATE UNIQUE INDEX taxi_capture_file_taxi_serial_key ON public.taxi_capture_file USING btree (taxi_serial);

CREATE UNIQUE INDEX taxi_request_history_foreigner_id_key ON public.taxi_request_history USING btree (foreigner_id);

CREATE UNIQUE INDEX taxi_request_history_korean_id_key ON public.taxi_request_history USING btree (korean_id);

CREATE UNIQUE INDEX taxi_request_history_pkey ON public.taxi_request_history USING btree (taxi_request_id);

CREATE UNIQUE INDEX taxi_request_history_serial_number_key ON public.taxi_request_history USING btree (serial_number);

CREATE UNIQUE INDEX taxi_request_history_taxi_request_id_key ON public.taxi_request_history USING btree (taxi_request_id);

CREATE UNIQUE INDEX usage_history_file_id_key ON public.usage_history USING btree (file_id);

CREATE UNIQUE INDEX usage_history_pkey ON public.usage_history USING btree (usage_id);

CREATE UNIQUE INDEX usage_history_point_id_key ON public.usage_history USING btree (point_id);

CREATE UNIQUE INDEX usage_history_usage_id_key ON public.usage_history USING btree (usage_id);

alter table "public"."Foreigner_NOTME" add constraint "Foreigner_pkey" PRIMARY KEY using index "Foreigner_pkey";

alter table "public"."chat" add constraint "chat_pkey" PRIMARY KEY using index "chat_pkey";

alter table "public"."chat_room" add constraint "chat_room_pkey" PRIMARY KEY using index "chat_room_pkey";

alter table "public"."food_receipt_file" add constraint "food_receipt_file_pkey" PRIMARY KEY using index "food_receipt_file_pkey";

alter table "public"."food_request_history" add constraint "food_request_history_pkey" PRIMARY KEY using index "food_request_history_pkey";

alter table "public"."foreigner" add constraint "foreigner_pkey" PRIMARY KEY using index "foreigner_pkey";

alter table "public"."korean" add constraint "korean_pkey" PRIMARY KEY using index "korean_pkey";

alter table "public"."point" add constraint "point_pkey" PRIMARY KEY using index "point_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."taxi_capture_file" add constraint "taxi_capture_file_pkey" PRIMARY KEY using index "taxi_capture_file_pkey";

alter table "public"."taxi_request_history" add constraint "taxi_request_history_pkey" PRIMARY KEY using index "taxi_request_history_pkey";

alter table "public"."usage_history" add constraint "usage_history_pkey" PRIMARY KEY using index "usage_history_pkey";

alter table "public"."chat" add constraint "chat_chat_room_fkey" FOREIGN KEY (chat_room) REFERENCES chat_room(id) not valid;

alter table "public"."chat" validate constraint "chat_chat_room_fkey";

alter table "public"."food_receipt_file" add constraint "food_receipt_file_food_receipt_serial_key" UNIQUE using index "food_receipt_file_food_receipt_serial_key";

alter table "public"."food_receipt_file" add constraint "food_receipt_file_food_request_id_fkey" FOREIGN KEY (food_request_id) REFERENCES food_request_history(food_request_id) not valid;

alter table "public"."food_receipt_file" validate constraint "food_receipt_file_food_request_id_fkey";

alter table "public"."food_receipt_file" add constraint "food_receipt_file_food_request_id_key" UNIQUE using index "food_receipt_file_food_request_id_key";

alter table "public"."food_receipt_file" add constraint "food_receipt_file_fooda_key" UNIQUE using index "food_receipt_file_fooda_key";

alter table "public"."food_receipt_file" add constraint "food_receipt_file_foreigner_id_fkey" FOREIGN KEY (foreigner_id) REFERENCES foreigner(foreigner_id) not valid;

alter table "public"."food_receipt_file" validate constraint "food_receipt_file_foreigner_id_fkey";

alter table "public"."food_receipt_file" add constraint "food_receipt_file_foreigner_id_key" UNIQUE using index "food_receipt_file_foreigner_id_key";

alter table "public"."food_request_history" add constraint "food_request_history_foreigner_id_fkey" FOREIGN KEY (foreigner_id) REFERENCES foreigner(foreigner_id) not valid;

alter table "public"."food_request_history" validate constraint "food_request_history_foreigner_id_fkey";

alter table "public"."food_request_history" add constraint "food_request_history_id_key" UNIQUE using index "food_request_history_id_key";

alter table "public"."food_request_history" add constraint "food_request_history_korean_id_fkey" FOREIGN KEY (korean_id) REFERENCES korean(korean_id) not valid;

alter table "public"."food_request_history" validate constraint "food_request_history_korean_id_fkey";

alter table "public"."food_request_history" add constraint "food_request_history_serial_number_key" UNIQUE using index "food_request_history_serial_number_key";

alter table "public"."foreigner" add constraint "foreigner_foreigner_id_key" UNIQUE using index "foreigner_foreigner_id_key";

alter table "public"."foreigner" add constraint "foreigner_point_id_fkey" FOREIGN KEY (point_id) REFERENCES point(point_id) not valid;

alter table "public"."foreigner" validate constraint "foreigner_point_id_fkey";

alter table "public"."foreigner" add constraint "foreigner_point_id_key" UNIQUE using index "foreigner_point_id_key";

alter table "public"."foreigner" add constraint "foreigner_user_email_key" UNIQUE using index "foreigner_user_email_key";

alter table "public"."foreigner" add constraint "foreigner_user_name_key" UNIQUE using index "foreigner_user_name_key";

alter table "public"."korean" add constraint "korean_korean_id_key" UNIQUE using index "korean_korean_id_key";

alter table "public"."korean" add constraint "korean_point_id_fkey" FOREIGN KEY (point_id) REFERENCES point(point_id) not valid;

alter table "public"."korean" validate constraint "korean_point_id_fkey";

alter table "public"."korean" add constraint "korean_point_id_key" UNIQUE using index "korean_point_id_key";

alter table "public"."korean" add constraint "korean_user_email_key" UNIQUE using index "korean_user_email_key";

alter table "public"."korean" add constraint "korean_user_name_key" UNIQUE using index "korean_user_name_key";

alter table "public"."point" add constraint "point_point_id_key" UNIQUE using index "point_point_id_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."taxi_capture_file" add constraint "taxi_capture_file_file_id_key" UNIQUE using index "taxi_capture_file_file_id_key";

alter table "public"."taxi_capture_file" add constraint "taxi_capture_file_foreigner_id_fkey" FOREIGN KEY (foreigner_id) REFERENCES foreigner(foreigner_id) not valid;

alter table "public"."taxi_capture_file" validate constraint "taxi_capture_file_foreigner_id_fkey";

alter table "public"."taxi_capture_file" add constraint "taxi_capture_file_foreigner_id_key" UNIQUE using index "taxi_capture_file_foreigner_id_key";

alter table "public"."taxi_capture_file" add constraint "taxi_capture_file_taxi_license_plate_key" UNIQUE using index "taxi_capture_file_taxi_license_plate_key";

alter table "public"."taxi_capture_file" add constraint "taxi_capture_file_taxi_request_id_fkey" FOREIGN KEY (taxi_request_id) REFERENCES taxi_request_history(taxi_request_id) not valid;

alter table "public"."taxi_capture_file" validate constraint "taxi_capture_file_taxi_request_id_fkey";

alter table "public"."taxi_capture_file" add constraint "taxi_capture_file_taxi_request_id_key" UNIQUE using index "taxi_capture_file_taxi_request_id_key";

alter table "public"."taxi_capture_file" add constraint "taxi_capture_file_taxi_serial_key" UNIQUE using index "taxi_capture_file_taxi_serial_key";

alter table "public"."taxi_request_history" add constraint "taxi_request_history_foreigner_id_fkey" FOREIGN KEY (foreigner_id) REFERENCES foreigner(foreigner_id) not valid;

alter table "public"."taxi_request_history" validate constraint "taxi_request_history_foreigner_id_fkey";

alter table "public"."taxi_request_history" add constraint "taxi_request_history_foreigner_id_key" UNIQUE using index "taxi_request_history_foreigner_id_key";

alter table "public"."taxi_request_history" add constraint "taxi_request_history_korean_id_fkey" FOREIGN KEY (korean_id) REFERENCES korean(korean_id) not valid;

alter table "public"."taxi_request_history" validate constraint "taxi_request_history_korean_id_fkey";

alter table "public"."taxi_request_history" add constraint "taxi_request_history_korean_id_key" UNIQUE using index "taxi_request_history_korean_id_key";

alter table "public"."taxi_request_history" add constraint "taxi_request_history_serial_number_key" UNIQUE using index "taxi_request_history_serial_number_key";

alter table "public"."taxi_request_history" add constraint "taxi_request_history_taxi_request_id_key" UNIQUE using index "taxi_request_history_taxi_request_id_key";

alter table "public"."usage_history" add constraint "usage_history_file_id_fkey" FOREIGN KEY (file_id) REFERENCES taxi_capture_file(taxi_file_id) not valid;

alter table "public"."usage_history" validate constraint "usage_history_file_id_fkey";

alter table "public"."usage_history" add constraint "usage_history_file_id_key" UNIQUE using index "usage_history_file_id_key";

alter table "public"."usage_history" add constraint "usage_history_point_id_fkey" FOREIGN KEY (point_id) REFERENCES point(point_id) not valid;

alter table "public"."usage_history" validate constraint "usage_history_point_id_fkey";

alter table "public"."usage_history" add constraint "usage_history_point_id_key" UNIQUE using index "usage_history_point_id_key";

alter table "public"."usage_history" add constraint "usage_history_usage_id_key" UNIQUE using index "usage_history_usage_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;

grant delete on table "public"."Foreigner_NOTME" to "anon";

grant insert on table "public"."Foreigner_NOTME" to "anon";

grant references on table "public"."Foreigner_NOTME" to "anon";

grant select on table "public"."Foreigner_NOTME" to "anon";

grant trigger on table "public"."Foreigner_NOTME" to "anon";

grant truncate on table "public"."Foreigner_NOTME" to "anon";

grant update on table "public"."Foreigner_NOTME" to "anon";

grant delete on table "public"."Foreigner_NOTME" to "authenticated";

grant insert on table "public"."Foreigner_NOTME" to "authenticated";

grant references on table "public"."Foreigner_NOTME" to "authenticated";

grant select on table "public"."Foreigner_NOTME" to "authenticated";

grant trigger on table "public"."Foreigner_NOTME" to "authenticated";

grant truncate on table "public"."Foreigner_NOTME" to "authenticated";

grant update on table "public"."Foreigner_NOTME" to "authenticated";

grant delete on table "public"."Foreigner_NOTME" to "service_role";

grant insert on table "public"."Foreigner_NOTME" to "service_role";

grant references on table "public"."Foreigner_NOTME" to "service_role";

grant select on table "public"."Foreigner_NOTME" to "service_role";

grant trigger on table "public"."Foreigner_NOTME" to "service_role";

grant truncate on table "public"."Foreigner_NOTME" to "service_role";

grant update on table "public"."Foreigner_NOTME" to "service_role";

grant delete on table "public"."chat" to "anon";

grant insert on table "public"."chat" to "anon";

grant references on table "public"."chat" to "anon";

grant select on table "public"."chat" to "anon";

grant trigger on table "public"."chat" to "anon";

grant truncate on table "public"."chat" to "anon";

grant update on table "public"."chat" to "anon";

grant delete on table "public"."chat" to "authenticated";

grant insert on table "public"."chat" to "authenticated";

grant references on table "public"."chat" to "authenticated";

grant select on table "public"."chat" to "authenticated";

grant trigger on table "public"."chat" to "authenticated";

grant truncate on table "public"."chat" to "authenticated";

grant update on table "public"."chat" to "authenticated";

grant delete on table "public"."chat" to "service_role";

grant insert on table "public"."chat" to "service_role";

grant references on table "public"."chat" to "service_role";

grant select on table "public"."chat" to "service_role";

grant trigger on table "public"."chat" to "service_role";

grant truncate on table "public"."chat" to "service_role";

grant update on table "public"."chat" to "service_role";

grant delete on table "public"."chat_room" to "anon";

grant insert on table "public"."chat_room" to "anon";

grant references on table "public"."chat_room" to "anon";

grant select on table "public"."chat_room" to "anon";

grant trigger on table "public"."chat_room" to "anon";

grant truncate on table "public"."chat_room" to "anon";

grant update on table "public"."chat_room" to "anon";

grant delete on table "public"."chat_room" to "authenticated";

grant insert on table "public"."chat_room" to "authenticated";

grant references on table "public"."chat_room" to "authenticated";

grant select on table "public"."chat_room" to "authenticated";

grant trigger on table "public"."chat_room" to "authenticated";

grant truncate on table "public"."chat_room" to "authenticated";

grant update on table "public"."chat_room" to "authenticated";

grant delete on table "public"."chat_room" to "service_role";

grant insert on table "public"."chat_room" to "service_role";

grant references on table "public"."chat_room" to "service_role";

grant select on table "public"."chat_room" to "service_role";

grant trigger on table "public"."chat_room" to "service_role";

grant truncate on table "public"."chat_room" to "service_role";

grant update on table "public"."chat_room" to "service_role";

grant delete on table "public"."food_receipt_file" to "anon";

grant insert on table "public"."food_receipt_file" to "anon";

grant references on table "public"."food_receipt_file" to "anon";

grant select on table "public"."food_receipt_file" to "anon";

grant trigger on table "public"."food_receipt_file" to "anon";

grant truncate on table "public"."food_receipt_file" to "anon";

grant update on table "public"."food_receipt_file" to "anon";

grant delete on table "public"."food_receipt_file" to "authenticated";

grant insert on table "public"."food_receipt_file" to "authenticated";

grant references on table "public"."food_receipt_file" to "authenticated";

grant select on table "public"."food_receipt_file" to "authenticated";

grant trigger on table "public"."food_receipt_file" to "authenticated";

grant truncate on table "public"."food_receipt_file" to "authenticated";

grant update on table "public"."food_receipt_file" to "authenticated";

grant delete on table "public"."food_receipt_file" to "service_role";

grant insert on table "public"."food_receipt_file" to "service_role";

grant references on table "public"."food_receipt_file" to "service_role";

grant select on table "public"."food_receipt_file" to "service_role";

grant trigger on table "public"."food_receipt_file" to "service_role";

grant truncate on table "public"."food_receipt_file" to "service_role";

grant update on table "public"."food_receipt_file" to "service_role";

grant delete on table "public"."food_request_history" to "anon";

grant insert on table "public"."food_request_history" to "anon";

grant references on table "public"."food_request_history" to "anon";

grant select on table "public"."food_request_history" to "anon";

grant trigger on table "public"."food_request_history" to "anon";

grant truncate on table "public"."food_request_history" to "anon";

grant update on table "public"."food_request_history" to "anon";

grant delete on table "public"."food_request_history" to "authenticated";

grant insert on table "public"."food_request_history" to "authenticated";

grant references on table "public"."food_request_history" to "authenticated";

grant select on table "public"."food_request_history" to "authenticated";

grant trigger on table "public"."food_request_history" to "authenticated";

grant truncate on table "public"."food_request_history" to "authenticated";

grant update on table "public"."food_request_history" to "authenticated";

grant delete on table "public"."food_request_history" to "service_role";

grant insert on table "public"."food_request_history" to "service_role";

grant references on table "public"."food_request_history" to "service_role";

grant select on table "public"."food_request_history" to "service_role";

grant trigger on table "public"."food_request_history" to "service_role";

grant truncate on table "public"."food_request_history" to "service_role";

grant update on table "public"."food_request_history" to "service_role";

grant delete on table "public"."foreigner" to "anon";

grant insert on table "public"."foreigner" to "anon";

grant references on table "public"."foreigner" to "anon";

grant select on table "public"."foreigner" to "anon";

grant trigger on table "public"."foreigner" to "anon";

grant truncate on table "public"."foreigner" to "anon";

grant update on table "public"."foreigner" to "anon";

grant delete on table "public"."foreigner" to "authenticated";

grant insert on table "public"."foreigner" to "authenticated";

grant references on table "public"."foreigner" to "authenticated";

grant select on table "public"."foreigner" to "authenticated";

grant trigger on table "public"."foreigner" to "authenticated";

grant truncate on table "public"."foreigner" to "authenticated";

grant update on table "public"."foreigner" to "authenticated";

grant delete on table "public"."foreigner" to "service_role";

grant insert on table "public"."foreigner" to "service_role";

grant references on table "public"."foreigner" to "service_role";

grant select on table "public"."foreigner" to "service_role";

grant trigger on table "public"."foreigner" to "service_role";

grant truncate on table "public"."foreigner" to "service_role";

grant update on table "public"."foreigner" to "service_role";

grant delete on table "public"."korean" to "anon";

grant insert on table "public"."korean" to "anon";

grant references on table "public"."korean" to "anon";

grant select on table "public"."korean" to "anon";

grant trigger on table "public"."korean" to "anon";

grant truncate on table "public"."korean" to "anon";

grant update on table "public"."korean" to "anon";

grant delete on table "public"."korean" to "authenticated";

grant insert on table "public"."korean" to "authenticated";

grant references on table "public"."korean" to "authenticated";

grant select on table "public"."korean" to "authenticated";

grant trigger on table "public"."korean" to "authenticated";

grant truncate on table "public"."korean" to "authenticated";

grant update on table "public"."korean" to "authenticated";

grant delete on table "public"."korean" to "service_role";

grant insert on table "public"."korean" to "service_role";

grant references on table "public"."korean" to "service_role";

grant select on table "public"."korean" to "service_role";

grant trigger on table "public"."korean" to "service_role";

grant truncate on table "public"."korean" to "service_role";

grant update on table "public"."korean" to "service_role";

grant delete on table "public"."point" to "anon";

grant insert on table "public"."point" to "anon";

grant references on table "public"."point" to "anon";

grant select on table "public"."point" to "anon";

grant trigger on table "public"."point" to "anon";

grant truncate on table "public"."point" to "anon";

grant update on table "public"."point" to "anon";

grant delete on table "public"."point" to "authenticated";

grant insert on table "public"."point" to "authenticated";

grant references on table "public"."point" to "authenticated";

grant select on table "public"."point" to "authenticated";

grant trigger on table "public"."point" to "authenticated";

grant truncate on table "public"."point" to "authenticated";

grant update on table "public"."point" to "authenticated";

grant delete on table "public"."point" to "service_role";

grant insert on table "public"."point" to "service_role";

grant references on table "public"."point" to "service_role";

grant select on table "public"."point" to "service_role";

grant trigger on table "public"."point" to "service_role";

grant truncate on table "public"."point" to "service_role";

grant update on table "public"."point" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."taxi_capture_file" to "anon";

grant insert on table "public"."taxi_capture_file" to "anon";

grant references on table "public"."taxi_capture_file" to "anon";

grant select on table "public"."taxi_capture_file" to "anon";

grant trigger on table "public"."taxi_capture_file" to "anon";

grant truncate on table "public"."taxi_capture_file" to "anon";

grant update on table "public"."taxi_capture_file" to "anon";

grant delete on table "public"."taxi_capture_file" to "authenticated";

grant insert on table "public"."taxi_capture_file" to "authenticated";

grant references on table "public"."taxi_capture_file" to "authenticated";

grant select on table "public"."taxi_capture_file" to "authenticated";

grant trigger on table "public"."taxi_capture_file" to "authenticated";

grant truncate on table "public"."taxi_capture_file" to "authenticated";

grant update on table "public"."taxi_capture_file" to "authenticated";

grant delete on table "public"."taxi_capture_file" to "service_role";

grant insert on table "public"."taxi_capture_file" to "service_role";

grant references on table "public"."taxi_capture_file" to "service_role";

grant select on table "public"."taxi_capture_file" to "service_role";

grant trigger on table "public"."taxi_capture_file" to "service_role";

grant truncate on table "public"."taxi_capture_file" to "service_role";

grant update on table "public"."taxi_capture_file" to "service_role";

grant delete on table "public"."taxi_request_history" to "anon";

grant insert on table "public"."taxi_request_history" to "anon";

grant references on table "public"."taxi_request_history" to "anon";

grant select on table "public"."taxi_request_history" to "anon";

grant trigger on table "public"."taxi_request_history" to "anon";

grant truncate on table "public"."taxi_request_history" to "anon";

grant update on table "public"."taxi_request_history" to "anon";

grant delete on table "public"."taxi_request_history" to "authenticated";

grant insert on table "public"."taxi_request_history" to "authenticated";

grant references on table "public"."taxi_request_history" to "authenticated";

grant select on table "public"."taxi_request_history" to "authenticated";

grant trigger on table "public"."taxi_request_history" to "authenticated";

grant truncate on table "public"."taxi_request_history" to "authenticated";

grant update on table "public"."taxi_request_history" to "authenticated";

grant delete on table "public"."taxi_request_history" to "service_role";

grant insert on table "public"."taxi_request_history" to "service_role";

grant references on table "public"."taxi_request_history" to "service_role";

grant select on table "public"."taxi_request_history" to "service_role";

grant trigger on table "public"."taxi_request_history" to "service_role";

grant truncate on table "public"."taxi_request_history" to "service_role";

grant update on table "public"."taxi_request_history" to "service_role";

grant delete on table "public"."usage_history" to "anon";

grant insert on table "public"."usage_history" to "anon";

grant references on table "public"."usage_history" to "anon";

grant select on table "public"."usage_history" to "anon";

grant trigger on table "public"."usage_history" to "anon";

grant truncate on table "public"."usage_history" to "anon";

grant update on table "public"."usage_history" to "anon";

grant delete on table "public"."usage_history" to "authenticated";

grant insert on table "public"."usage_history" to "authenticated";

grant references on table "public"."usage_history" to "authenticated";

grant select on table "public"."usage_history" to "authenticated";

grant trigger on table "public"."usage_history" to "authenticated";

grant truncate on table "public"."usage_history" to "authenticated";

grant update on table "public"."usage_history" to "authenticated";

grant delete on table "public"."usage_history" to "service_role";

grant insert on table "public"."usage_history" to "service_role";

grant references on table "public"."usage_history" to "service_role";

grant select on table "public"."usage_history" to "service_role";

grant trigger on table "public"."usage_history" to "service_role";

grant truncate on table "public"."usage_history" to "service_role";

grant update on table "public"."usage_history" to "service_role";

create policy "Policy with security definer functions"
on "public"."chat"
as permissive
for all
to public
using (true);


create policy "all"
on "public"."chat_room"
as permissive
for all
to public
using (true);


create policy "Allow all users to delete"
on "public"."food_receipt_file"
as permissive
for delete
to public
using (true);


create policy "Allow all users to insert"
on "public"."food_receipt_file"
as permissive
for insert
to public
with check (true);


create policy "Allow all users to read"
on "public"."food_receipt_file"
as permissive
for select
to public
using (true);


create policy "Allow all users to update"
on "public"."food_receipt_file"
as permissive
for update
to public
using (true);


create policy "Allow all users to delete"
on "public"."food_request_history"
as permissive
for delete
to public
using (true);


create policy "Allow all users to insert"
on "public"."food_request_history"
as permissive
for insert
to public
with check (true);


create policy "Allow all users to read"
on "public"."food_request_history"
as permissive
for select
to public
using (true);


create policy "Allow all users to update"
on "public"."food_request_history"
as permissive
for update
to public
using (true);


create policy "Allow all users to delete"
on "public"."foreigner"
as permissive
for delete
to public
using (true);


create policy "Allow all users to insert"
on "public"."foreigner"
as permissive
for insert
to public
with check (true);


create policy "Allow all users to read"
on "public"."foreigner"
as permissive
for select
to public
using (true);


create policy "Allow all users to update"
on "public"."foreigner"
as permissive
for update
to public
using (true);


create policy "Allow all users to delete"
on "public"."korean"
as permissive
for delete
to public
using (true);


create policy "Allow all users to insert"
on "public"."korean"
as permissive
for insert
to public
with check (true);


create policy "Allow all users to read"
on "public"."korean"
as permissive
for select
to public
using (true);


create policy "Allow all users to update"
on "public"."korean"
as permissive
for update
to public
using (true);


create policy "Allow all users to delete"
on "public"."point"
as permissive
for delete
to public
using (true);


create policy "Allow all users to insert"
on "public"."point"
as permissive
for insert
to public
with check (true);


create policy "Allow all users to read"
on "public"."point"
as permissive
for select
to public
using (true);


create policy "Allow all users to update"
on "public"."point"
as permissive
for update
to public
using (true);


create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


create policy "Allow all users to delete"
on "public"."taxi_capture_file"
as permissive
for delete
to public
using (true);


create policy "Allow all users to insert"
on "public"."taxi_capture_file"
as permissive
for insert
to public
with check (true);


create policy "Allow all users to read"
on "public"."taxi_capture_file"
as permissive
for select
to public
using (true);


create policy "Allow all users to update"
on "public"."taxi_capture_file"
as permissive
for update
to public
using (true);


create policy "Allow all users to delete"
on "public"."taxi_request_history"
as permissive
for delete
to public
using (true);


create policy "Allow all users to insert"
on "public"."taxi_request_history"
as permissive
for insert
to public
with check (true);


create policy "Allow all users to read"
on "public"."taxi_request_history"
as permissive
for select
to public
using (true);


create policy "Allow all users to update"
on "public"."taxi_request_history"
as permissive
for update
to public
using (true);


create policy "Allow all users to delete"
on "public"."usage_history"
as permissive
for delete
to public
using (true);


create policy "Allow all users to insert"
on "public"."usage_history"
as permissive
for insert
to public
with check (true);


create policy "Allow all users to read"
on "public"."usage_history"
as permissive
for select
to public
using (true);


create policy "Allow all users to update"
on "public"."usage_history"
as permissive
for update
to public
using (true);



