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
