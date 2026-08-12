create table public.custom_missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  task text not null check (char_length(task) between 1 and 200),
  created_at timestamptz not null default now()
);

alter table public.custom_missions enable row level security;

create policy "read own custom missions"
  on public.custom_missions for select
  using (auth.uid() = user_id);

create policy "insert own custom missions"
  on public.custom_missions for insert
  with check (auth.uid() = user_id);

create policy "delete own custom missions"
  on public.custom_missions for delete
  using (auth.uid() = user_id);
