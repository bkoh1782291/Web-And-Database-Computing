SELECT customer.first_name, customer.last_name, MIN(rental.rental_date)
FROM customer
INNER JOIN rental
ON rental.customer_id = customer.customer_id
WHERE rental.return_date IS NULL;