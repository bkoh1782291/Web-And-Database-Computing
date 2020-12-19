SELECT first_name, last_name, COUNT(film_id) AS number_films FROM actor
INNER JOIN film_actor ON actor.actor_id = film_actor.actor_id GROUP BY actor.actor_id;