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

grant execute on function public.save_member_reflection(text, text, text, text) to authenticated;
grant execute on function public.update_member_reflection(text, text) to authenticated;
