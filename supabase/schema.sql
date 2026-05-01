create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_fragments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  fragment_id text not null,
  book_id text,
  text text not null,
  mood text,
  created_at timestamptz not null default now(),
  unique (user_id, fragment_id)
);

create table if not exists public.saved_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  local_id text not null,
  book text,
  question text,
  answer text not null,
  created_at timestamptz not null default now(),
  unique (user_id, local_id)
);

create table if not exists public.saved_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  local_id text not null,
  book text,
  text text not null,
  status text,
  created_at timestamptz not null default now(),
  unique (user_id, local_id)
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  category text not null,
  title text not null,
  price text not null,
  type text,
  created_at timestamptz not null default now(),
  unique (user_id, item_id, category)
);

alter table public.profiles enable row level security;
alter table public.saved_fragments enable row level security;
alter table public.saved_reflections enable row level security;
alter table public.saved_actions enable row level security;
alter table public.cart_items enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can read own fragments" on public.saved_fragments;
create policy "Users can read own fragments"
on public.saved_fragments for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own fragments" on public.saved_fragments;
create policy "Users can insert own fragments"
on public.saved_fragments for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own fragments" on public.saved_fragments;
create policy "Users can update own fragments"
on public.saved_fragments for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own fragments" on public.saved_fragments;
create policy "Users can delete own fragments"
on public.saved_fragments for delete
using (auth.uid() = user_id);

drop policy if exists "Users can read own reflections" on public.saved_reflections;
create policy "Users can read own reflections"
on public.saved_reflections for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own reflections" on public.saved_reflections;
create policy "Users can insert own reflections"
on public.saved_reflections for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own reflections" on public.saved_reflections;
create policy "Users can update own reflections"
on public.saved_reflections for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own reflections" on public.saved_reflections;
create policy "Users can delete own reflections"
on public.saved_reflections for delete
using (auth.uid() = user_id);

drop policy if exists "Users can read own actions" on public.saved_actions;
create policy "Users can read own actions"
on public.saved_actions for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own actions" on public.saved_actions;
create policy "Users can insert own actions"
on public.saved_actions for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own actions" on public.saved_actions;
create policy "Users can update own actions"
on public.saved_actions for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own actions" on public.saved_actions;
create policy "Users can delete own actions"
on public.saved_actions for delete
using (auth.uid() = user_id);

drop policy if exists "Users can read own cart" on public.cart_items;
create policy "Users can read own cart"
on public.cart_items for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own cart" on public.cart_items;
create policy "Users can insert own cart"
on public.cart_items for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own cart" on public.cart_items;
create policy "Users can update own cart"
on public.cart_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own cart" on public.cart_items;
create policy "Users can delete own cart"
on public.cart_items for delete
using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
