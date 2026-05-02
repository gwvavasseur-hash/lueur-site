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

grant execute on function public.save_cart_item(text, text, text, text, text) to authenticated;
grant execute on function public.delete_cart_item(text, text) to authenticated;

notify pgrst, 'reload schema';
