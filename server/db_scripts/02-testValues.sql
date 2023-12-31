insert into users (firstName, lastName, createdAt) values ('Colan', 'Thompson', '2023-07-11 17:40:44');
insert into users (firstName, lastName, createdAt) values ('Sayres', 'Pipe', '2022-08-12 22:01:10');
insert into users (firstName, lastName, createdAt) values ('Niall', 'Kitchenman', '2023-05-01 23:15:53');
insert into users (firstName, lastName, createdAt) values ('Elsinore', 'McGuinness', '2023-03-18 22:55:50');
insert into users (firstName, lastName, createdAt) values ('Reg', 'Loosely', '2022-09-08 03:24:18');
insert into users (firstName, lastName, createdAt) values ('Lancelot', 'Baguley', '2023-06-07 23:26:11');
insert into users (firstName, lastName, createdAt) values ('Quinton', 'Barrim', '2023-06-27 16:21:42');
insert into users (firstName, lastName, createdAt) values ('Valaria', 'Bliven', '2022-09-19 17:08:37');
insert into users (firstName, lastName, createdAt) values ('Beale', 'Scaddon', '2023-01-06 22:50:04');
insert into users (firstName, lastName, createdAt) values ('Gerardo', 'Pawelke', '2023-02-09 12:55:39');

/*
// IdCard-PIN
// 1-8165
// 2-7369
// 3-2455
// 4-9266
// 5-1701
// 6-5180
// 7-1396
// 8-3980
// 9-6283
// 10-3696
*/

insert into cards (user_id, cardNumber, pin, balance, createdAt) values (1, '5602222606041232', '$2a$10$7LzGFJzUqhmRch5/yjlNNOeQD5y8B8tnOUv5te4FVpheGAfDulap2', 15275.68, '2022-08-16 08:02:30');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (2, '6763011587048061', '$2a$10$kxbZDyLVvVcTTNSmpp8Zue1.45xuWBzDaodDF321mp.OK3BXoyz6e', 86376.9, '2023-04-20 01:54:21');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (3, '3587835697820854', '$2a$10$taoQVkUkRogZUcuDknbyR.DH6A.VwVDmvZf/ofv8Pe/mNNSNxnMFm', 93349.86, '2023-02-12 02:11:14');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (4, '3565599497918997', '$2a$10$c3mtu8I2Y0VqBJ1sNOTr3O4/Ge40vPXc/QHEiTxdN8WqKeQxewZyG', 45286.25, '2022-11-07 17:40:36');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (5, '4844993913059323', '$2a$10$piSSbdCyPnqeOUbea9i3pOQ9eINWWESEvfZG6kUVGhbV43wWCaLw6', 86379.15, '2022-12-25 09:06:42');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (6, '3550857680891349', '$2a$10$wwlD7XBu/d/bk9Vdxp8Ii.aaGViPLZ/23fxnMLkJbbacmC5Wkaw3C', 98926.53, '2023-01-20 06:58:50');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (7, '6381860832336146', '$2a$10$.TfDFC3/goZJps/UZMBjOOFb0MqPR9o26Ztg.mWM3eEP/AeIEUOY.', 50964.38, '2022-12-10 08:37:34');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (8, '3561751773494359', '$2a$10$WiZjIexeYuK.UjvVApiqieLZfFaPH53pyuBKaO/sDRWzsv2MN9hKm', 83809.06, '2023-01-21 05:05:44');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (9, '3567064710924445', '$2a$10$qdnt4K/c5CtL3DKeERWwD.g034ovdxNQaRjIclM6.TxreHs3/dxMO', 19240.42, '2022-09-29 12:52:56');
insert into cards (user_id, cardNumber, pin, balance, createdAt) values (10, '2018852493466945', '$2a$10$7nzQ6U4afk7/L7sWlbRI3OvjiyQqH2rPYNDdICHMlbDnsIqZ/rsk2', 45299.91, '2023-01-25 16:29:09');

insert into transactions (sender_id, recipient_id, amount, transaction_date) values (1, 2, 3718.11, '2022-12-25 08:02:30');
insert into transactions (sender_id, recipient_id, amount, transaction_date) values (2, 3, 5565.0, '2023-02-12 00:02:30');
insert into transactions (sender_id, recipient_id, amount, transaction_date) values (3, 4, 3360.03, '2022-11-10 01:02:30');
insert into transactions (sender_id, recipient_id, amount, transaction_date) values (4, 5, 3749.26, '2023-05-17 02:02:30');
insert into transactions (sender_id, recipient_id, amount, transaction_date) values (5, 6, 3150.85, '2022-09-15 05:02:30');
insert into transactions (sender_id, recipient_id, amount, transaction_date) values (6, 7, 4336.13, '2023-01-11 00:00:30');
insert into transactions (sender_id, recipient_id, amount, transaction_date) values (7, 8, 8938.42, '2023-11-10 06:02:30');
insert into transactions (sender_id, recipient_id, amount, transaction_date) values (8, 9, 3562.09, '2022-12-30 02:02:30');