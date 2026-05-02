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

drop function if exists public.save_member_action(text, text, text, text);
create function public.save_member_action(
  p_local_id text,
  p_book text,
  p_text text,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

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
$function$;

drop function if exists public.delete_member_action(text);
create function public.delete_member_action(
  p_local_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  delete from public.saved_actions
  where user_id = current_user_id
    and local_id = p_local_id;
end;
$function$;

drop function if exists public.save_member_reflection(text, text, text, text);
create function public.save_member_reflection(
  p_local_id text,
  p_book text,
  p_question text,
  p_answer text
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.saved_reflections (user_id, local_id, book, question, answer)
  values (current_user_id, p_local_id, p_book, p_question, p_answer)
  on conflict (user_id, local_id)
  do update set
    book = excluded.book,
    question = excluded.question,
    answer = excluded.answer;
end;
$function$;

drop function if exists public.update_member_reflection(text, text);
create function public.update_member_reflection(
  p_local_id text,
  p_answer text
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  update public.saved_reflections
  set answer = p_answer
  where user_id = current_user_id
    and local_id = p_local_id;
end;
$function$;

drop function if exists public.delete_member_reflection(text);
create function public.delete_member_reflection(
  p_local_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  delete from public.saved_reflections
  where user_id = current_user_id
    and local_id = p_local_id;
end;
$function$;

drop function if exists public.delete_saved_fragment(text);
create function public.delete_saved_fragment(
  p_fragment_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  delete from public.saved_fragments
  where user_id = current_user_id
    and fragment_id = p_fragment_id;
end;
$function$;

drop function if exists public.save_cart_item(text, text, text, text, text);
create function public.save_cart_item(
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
as $function$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

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
$function$;

drop function if exists public.delete_cart_item(text, text);
create function public.delete_cart_item(
  p_item_id text,
  p_category text
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  delete from public.cart_items
  where user_id = current_user_id
    and item_id = p_item_id
    and category = p_category;
end;
$function$;

grant execute on function public.save_member_action(text, text, text, text) to authenticated;
grant execute on function public.delete_member_action(text) to authenticated;
grant execute on function public.save_member_reflection(text, text, text, text) to authenticated;
grant execute on function public.update_member_reflection(text, text) to authenticated;
grant execute on function public.delete_member_reflection(text) to authenticated;
grant execute on function public.delete_saved_fragment(text) to authenticated;
grant execute on function public.save_cart_item(text, text, text, text, text) to authenticated;
grant execute on function public.delete_cart_item(text, text) to authenticated;

notify pgrst, 'reload schema';
