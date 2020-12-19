SELECT DISTINCT address
FROM (((film
INNER JOIN inventory ON film.film_id = inventory.film_id)
INNER JOIN store ON inventory.store_id = store.store_id)
INNER JOIN address ON store.address_id = address.address_id)
WHERE film.title = 'TWISTED PIRATES';