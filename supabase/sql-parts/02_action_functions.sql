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

grant execute on function public.save_member_action(text, text, text, text) to authenticated;
grant execute on function public.delete_member_action(text) to authenticated;
