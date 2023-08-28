---
title: "🪴 SQL (Databases)"
date: 2021-11-05T19:59:10.23220098Z
updated: 2023-08-28T21:42:38.771506Z
weight: 2
extra:
  note_type: 🪴
---

# SQL Cheatsheet

> This cheatsheet comes from information from the Data School (Book)

### SELECT

```sql
select 5 + 2;

select 10 - 3;

select 100 / 5;

select 9 * 9;
```

```sql
select 'Dave' || 'Andrews;' # String concatenation
```

```sql
select date "Feb 09, 1996"; # Date and Time are special data types
```

---

### FROM

```sql
select [columns you want] from [the table they are in];
```

```sql
select title, id from albums; # Select a subset of the columns from the albums talbe in the order you specify
```

```sql
select * from artists; # The `*` symbols is called the "Splat" and it selects all the columns from a table
```

---

### ORDER BY

```sql
select * from albums order by song_name;

# We can determine the order of rows returned to us with the `ORDER BY` keyword

# Multiple colums are supported

select * from albums order by artist_name, miliseconds;
# ^ Sort rows by artist_name (alphabetically) then duration (numeric)
```

---

### ASC and DESC

```sql
# By default all `ORDER BY` queries are ordered as `ASC` (ascending)

select * from tracks order by song_name DESC;
# ^ However we can re-order as descending using `DESC`
```

---

### LIMIT and OFFSET

```sql
# Reduce the number of rows with `LIMIT` to speed up queries

select * from artists limit 6;

# Use offset to [skip n rows]

select * from artists limit 5 offset 3; # Rows 3 -> 8
```

---

### SCHEMA

#### SQL Queries

```sql
# psql maintains a special database called `information_schema`
# which holds information about the schema

select * from information_schema.tables; # all tables from all schemas

select * from information_schema.tables where table_schema = "public"; # The schema named "public" is the default

select * from information_schema.columns where table_schema = "public" and table_name = "my_table";
# ^ Get info about columns in a table like: datat_type, default_value, and precision
```

#### psql Interface

| Shortcut                            | Description                                           |
| ----------------------------------- | ----------------------------------------------------- |
| `\d` (describe)                     | list of all tables                                    |
| `\d+` (describe extra)              | list of all relations                                 |
| `\d [table_name]` (describe table)  | list of cols, indexes, and relations for [table_name] |
| `\dn` (describe namespaces/schemas) | list of all schemas (namespaces)                      |
| `\l` (list)                         | list of all databases                                 |
| `\z` (list)                         | list of tables with access privileges                 |

---

### BASIC OPERATORS

| Operator  | Description              |
| --------- | ------------------------ |
| `#ERROR!` | Equal to (exact match)   |
| `<`       | Less than (not equal)    |
| `>`       | Greater than (not equal) |
| `<=`      | Less than or equal       |
| `>=`      | Greater than or equal    |
| `!=`      | Not equal                |
| `<>`      | Not equal (same)         |

### LIKE

| Symbol | Description                                      |
| ------ | ------------------------------------------------ |
| `_`    | Matches (any) single character                   |
| `%`    | Matches (any) number of characters (0, infinity) |

```sql
select * from tacks where composer like '%Radiohead%;
```

### ILIKE

```sql
# i(nsensitive) like is case insensitive
select * from tracks where composer ilike '%radioheead%';
```

### SIMILAR TO

```sql
select * from tracks where composer similar to '(Radio|Metal)head%';

# SIMILAR TO is uses RegEx to find strings
# See: https://dataschool.com/how-to-teach-people-sql/how-regex-works-in-sql/
```

### NULL

```sql
select * from tracks where composer is not null;

select * from tracks where composer is null;
# Use the `IS` operator to check null-ability
```

---

### BASIC FUNCTIONS

| **Function**     | **Description**                                               |
| ---------------- | ------------------------------------------------------------- |
| `MAX`            | returns the largest (maximum) number in a sets                |
| `MIN`            | described                                                     |
| `COUNT`          | returns a count of the # of values in a set                   |
| `COUNT DISTINCT` | returns a count of the # of unique (distinct) values in a set |
| `EVERY`          | returns true if all data inside is true (same as bool_and)    |
| `AVG`            | returns the average (mean) of the set of numbers              |
| `SUM`            | returns the sum of all the values in the set                  |

### COUNT

```sql
select count(artist) from tracks; # count non-null rows in "artist" column

select count(*) from tracks; # count all rows (including null) in "tracks" table

select count(distinct artist) from tracks;
# ^ count all unique, non-null, values in "artist" column
```

---

### AS (ALIASES)

```sql
select count(*) as "All tracks",
		count(artist) as "Non-Empty artists",
		counter(*) - count(artist) as "Empty artists"
from tracks;
# ^ use (") around alias names to create column titles
```

---

### GROUP BY

```sql
# If we want the number of tracks per genre, this is BAD

select count(*) from tacks where genre_id = 1;
.
.
.
select count(*) from tracks where genre_id = n;

# We can instead GROUP BY the genre_id

select count(*) from tracks group by genre_id;
```

```sql
# Group tracks by artist and order by number of tracks
select artist, count*(*) as "count"
from tracks
group by artist
order by "count" desc;
```

```sql
# Rules
# - All columns that are not in the GROUP BY need an aggregaion function

select genre_id, unit_price form tracks group by genre_id;
# ^ Invalid, don't know what to do with `n` unit_price values for `1` group by genre_id row
# Need a way to shorten down `n` to `1` = aggregation functions 

# ERROR: column "tracks.unit_price" must appear in the GROUP BY clause
# or be used in an aggregate function LINE 1:
# SELECT genre_id, unit_price FROM tracks GROUP BY genre_id;

# SOLUTION: Either add that column to the GROUP BY
# or apply an aggregation function to it so the database knows what to do.
```

---

### JOIN and JOINing Tables

![Image](Image.bin)

> A database **relation** is a connection between tables where one table has a `forgein key` pointing at another table's `primary key`

> A **primary key** is a column (or set a column) which is a unique identifier for a row. Traditionally this column is referred to as an `id` but it can be any column value we know to be unique.

> A **foreign key**  is a column whose values are **primary keys** of another table. The convention is to name the foreign key column `other_table_name_id`

```sql
select * from [table1] join [table2] on [table1.primary_key] = [table2.foreign_key];
# ^ Note that the order of table1 and table2 and the keys really doesn't matter.
```

```sql
select * from tracks
join albums on tracks.album_id = albums.id
join artists on albums.artist_id = artist.id;
```

![Image](Image%20(2).bin)

- > **FULL OUTER join:** How many friends and connections do my Facebook friends or LinkedIn connections have?
- > **LEFT join:** How many friends and connections do my Facebook friends have? (Regardless of if they are on LinkedIn)
- > **RIGHT join:** How many friends and connections do my LinkedIn connections have? (Regardless of if they are on facebook)
- > **INNER join:** How many friends and connections do my friends who are on both on Facebook and LinkedIn have?

### INNER JOIN

- > **INNER join:** How many friends and connections do my friends who are on both on Facebook and LinkedIn have?

![Image](Image%20(3).bin)

```sql
select *
from facebook
join linkedin
on facebook.name = linkedin.name;
```

> `INNER JOIN` is the **default type of join when writing `JOIN`**.

1. > SQL will setup a table with all the columns from `table 1` and `table 2`
2. > SQL will then go through `table 1` looking at the column from `ON t1.col_name t2.col_name` and look for matching values from `t2.col_name`
3. > Since this is an `INNER JOIN` only rows where all the columns have values will be added to the results table

[inner_join.mp4](%F0%9F%AA%B4%20SQL%20(Databases).assets/inner_join.mp4)

> IMPORTANT: If the values in the `col_name` we are joining `ON` are non-unique, we will get duplicate rows in our output table (see video above)

### FULL OUTER JOIN

- > **FULL OUTER join:** How many friends and connections do my Facebook friends or LinkedIn connections have?

![Image](Image%20(4).bin)

```sql
select *
from facebook
full outer join linkedin
on facebook.name = linkedin.name;
```

> `FULL OUTER JOIN`  combines the columns from all tables, and when possible, includes combines columns which match.

1. > SQL will perform a `LEFT` join first
- All the rows from `table 1` and their columns
- If a row from `table 1` matches `table 2` `ON` the shared column, add the values from `table 2` columns
2. > SQL will then perform a `RIGHT` join
- Go through the rows of `table 2` - If a row in `table 2` is not in the results table, add it and its columns (which will be `null` )

[full_outer_join.mp4](%F0%9F%AA%B4%20SQL%20(Databases).assets/full_outer_join.mp4)

### LEFT JOIN

- > **LEFT join:** How many friends and connections do my Facebook friends have? (Regardless of if they are on LinkedIn)

![Image](Image%20(6).bin)

```sql
select *
from facebook
left join linkedin
on facebook.name = linkedin.name;
```

> `LEFT JOIN` will add **all of the rows** from `table 1` and if it can match a row `ON` the shared column to `table 2` then it will add those column values as well. If not, the `table 2` columns will remain `null`.

[left_join.mp4](%F0%9F%AA%B4%20SQL%20(Databases).assets/left_join.mp4)

### RIGHT JOIN

- > **RIGHT join:** How many friends and connections do my LinkedIn connections have? (Regardless of if they are on facebook)
- > IMPORTANT: Right JOINs are rare because they can be expressed equivalently as a LEFT JOIN or just a regular JOIN

![Image](Image%20(6).bin)

```sql
select * 
from facebook
right join linkedin
on facebook.name = linkedin.name;
```

[right-join.mp4](%F0%9F%AA%B4%20SQL%20(Databases).assets/right-join.mp4)

---

### DATE & TIME Types

- Date
- Time
- Timestamp (date + time; no timezone)
- Interval (duration)

> We interface with timestamps through a string-format interface (even though they are not stored as strings)

> `YYYY-MM-DD HH:MM:SS`

| **Data Type** | **Description**                 | **Example**                           | **Output**          |
| ------------- | ------------------------------- | ------------------------------------- | ------------------- |
| TIMESTAMP     | date and time                   | `TIMESTAMP '2021-08-09 13:57:40'`     | 2021-08-09T13:57:40 |
| DATE          | date (no time)                  | `DATE '2021-08-09 13:57:40'`          | 2021-08-09          |
| TIME          | time (no day)                   | `TIME '2021-08-09 13:57:40'`          | 13:57:40            |
| INTERVAL      | interval between two date/times | `INTERVAL '1 day 2 hours 10 seconds'` | 1 day, 2:00:10      |

### Formatting DATE & TIME types

> Often we want to get a single piece of information about a timestamp, instead of the whole thing. PostgresQL provides us with a function to convert `DATE/TIME` types into strings.

> `TO_CHAR([date], [pattern])` allows us to do this

| **Pattern** | **Description**                           | **Example**                           | **Output** |
| ----------- | ----------------------------------------- | ------------------------------------- | ---------- |
| `HH`        | **H**our (01-12)                          | `TO_CHAR(TIME '4:15 pm', 'HH')`       | 04         |
| `HH24`      | **H**our (01-24)                          | `TO_CHAR(TIME '4:15 pm', 'HH24')`     | 16         |
| `MI`        | **M**inute                                | `TO_CHAR(TIME '4:15 pm', 'MI')`       | 15         |
| `SS`        | **S**econds                               | `TO_CHAR(TIME '4:15:23 pm', 'SS')`    | 23         |
| `am`        | displays whether time is **am** or pm     | `TO_CHAR(TIME '4:15 pm', 'am')`       | am         |
| `YY`        | last 2 digits of the **Y**ear             | `TO_CHAR(DATE '2021-08-09', 'YY')`    | 21         |
| ,,,         | 4 digits of the **Y**ear                  | `TO_CHAR(DATE '2021-08-09', 'YY')`    | 2021       |
| `MM`        | **M**onth # of the year.                  | `TO_CHAR(DATE '2021-08-09', 'MM')`    | 08         |
| `Month`     | written **Month** of the year capitalized | `TO_CHAR(DATE '2021-08-09', 'Month')` | August     |
| `Mon`       | abbreviated of **Mon**th of year          | `TO_CHAR(DATE '2021-08-09', 'Mon')`   | Aug        |
| `DD`        | Day # of the month                        | `TO_CHAR(DATE '2021-08-09', 'DD')`    | 09         |
| `Day`       | written **Day** of the week               | `TO_CHAR(DATE '2021-08-09', 'Day')`   | Monday     |
| `Dy`        | abbreviated **D**ay of the week           | `TO_CHAR(DATE '2021-08-09', 'Dy')`    | Mon        |
| `WW`        | **W**eek # of the year                    | `TO_CHAR(DATE '2021-08-09', 'WW')`    | 32         |
| `Q`         | **Q**uarter of the year                   | `TO_CHAR(DATE '2021-08-09', 'Q')`     | 3          |
| `TZ`        | **T**ime**Z**one                          | `TO_CHAR(DATE '2021-08-09', 'TZ')`    | UTC        |

### Current DATE and TIME Functions

```sql
CURRENT_DATE;
CURRENT_TIME;
CURRENT_TIMESTAMP;

select current_date, current_time, current_timestamp;
```

### GROUP BY DATE

> Often we want to know some analytical information about time, *how many things happened in an hour*, or *how much money was sent this month.* To answer these questions we can `GROUP BY [date]`

> We should always group by the string (`TO_CHAR`) representation of a date, otherwise we are grouping down to the millisecond level.

```sql
select to_char(hire_date, 'YYYY') as "hired_year",
count(*) from employees,
group by "hired_year";
```

---

# Extras

### UNION

### VIEW

### IN

```sql
select *
	from cd.facilities 
	where 
		facid in (1,5);
```

```sql
# The IN operator is a good early demonstrator of the elegance of the relational model.
# The argument it takes is not just a list of values - it's actually a table with a single column. 
# Since queries also return tables, if you create a query that returns a single column,
# you can feed those results into an IN operator. To give a toy example:

select * 
	from cd.facilities
	where
		facid in (
			select facid from cd.facilities
			);
```

### DISTINCT

```sql
select distinct name, age from members order by name limit 10;
# ^ DISTINCT returns unique rows.
# However if two rows have the name but different ages then they are different

# TIP: try not to use DISTINCT willy-nilly, there is a performance cost in removing
# duplicate rows
```

#### References

[Part I. Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

[Don't Do This - PostgreSQL wiki](https://wiki.postgresql.org/wiki/Don't_Do_This)

[PostgreSQL Exercises](https://www.pgexercises.com/)

[PostgreSQL Tutorial - Learn PostgreSQL from Scratch](https://www.postgresqltutorial.com/)

[The Data School by Chartio](https://dataschool.com/)

[Learn SQL: Interactive SQL Book](https://dataschool.com/learn-sql/)

[Learn Introductory SQL Concepts](https://dataschool.com/learn-sql/introduction/)

[SQL Join Types Explained in Visuals](https://dataschool.com/how-to-teach-people-sql/sql-join-types-explained-visually/)

[Database.Guide](https://database.guide/)

