alter table public.custom_missions
  add column mission_date date not null default current_date;

create index custom_missions_user_date_idx
  on public.custom_missions (user_id, mission_date);
