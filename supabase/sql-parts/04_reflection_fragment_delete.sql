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

grant execute on function public.delete_member_reflection(text) to authenticated;
grant execute on function public.delete_saved_fragment(text) to authenticated;
