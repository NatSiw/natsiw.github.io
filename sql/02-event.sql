create table event
(
    id      integer not null
        constraint event_pk
            primary key autoincrement,
    title text not null,
    description text not null,
    place text not null,
    date text not null

);
