alter table public.saved_actions enable row level security;
alter table public.cart_items enable row level security;

drop policy if exists "Users can read own actions" on public.saved_actions;
create policy "Users can read own actions"
on public.saved_actions for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own actions" on public.saved_actions;
create policy "Users can insert own actions"
on public.saved_actions for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own actions" on public.saved_actions;
create policy "Users can update own actions"
on public.saved_actions for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own actions" on public.saved_actions;
create policy "Users can delete own actions"
on public.saved_actions for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can read own cart" on public.cart_items;
create policy "Users can read own cart"
on public.cart_items for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own cart" on public.cart_items;
create policy "Users can insert own cart"
on public.cart_items for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own cart" on public.cart_items;
create policy "Users can update own cart"
on public.cart_items for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own cart" on public.cart_items;
create policy "Users can delete own cart"
on public.cart_items for delete
to authenticated
using (auth.uid() = user_id);

create or replace function public.save_member_action(
  p_local_id text,
  p_book text,
  p_text text,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.saved_actions (user_id, local_id, book, text, status)
  values (current_user_id, p_local_id, p_book, p_text, p_status)
  on conflict (user_id, local_id)
  do update set
    book = excluded.book,
    text = excluded.text,
    status = excluded.status;
end;
$$;

create or replace function public.save_cart_item(
  p_item_id text,
  p_category text,
  p_title text,
  p_price text,
  p_type text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.cart_items (user_id, item_id, category, title, price, type)
  values (current_user_id, p_item_id, p_category, p_title, p_price, p_type)
  on conflict (user_id, item_id, category)
  do update set
    title = excluded.title,
    price = excluded.price,
    type = excluded.type;
end;
$$;

create or replace function public.delete_cart_item(
  p_item_id text,
  p_category text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  delete from public.cart_items
  where user_id = current_user_id
    and item_id = p_item_id
    and category = p_category;
end;
$$;

grant execute on function public.save_member_action(text, text, text, text) to authenticated;
grant execute on function public.save_cart_item(text, text, text, text, text) to authenticated;
grant execute on function public.delete_cart_item(text, text) to authenticated;
